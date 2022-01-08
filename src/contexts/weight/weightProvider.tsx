import React, { useState, useMemo, ReactNode } from 'react'
import { UserWeightContext, UserWeightContextType } from './weightContext'
import { UserEntity, WeightEntity } from '@/entities'
import { WeightRepository } from '@/repositories'
import {
  getFormattedDate,
  getSortTheLastOneWeek,
  yyyyMMDD,
  today,
  currentlyHour
} from '@/utils'

export interface ProviderProps {
  children?: ReactNode
  user: UserEntity
  originalWeights: Array<WeightEntity>
}
export const UserWeightContextProvider = ({
  children,
  user,
  originalWeights,
}: ProviderProps) => {
  /**************************************
   * State
   **************************************/
  const [workOutDate, setWorkOutDate] = useState<string>(today().format(yyyyMMDD))
  const [weight, setWeight] = useState<number | string>('')
  const [weights, setWeights] = useState<Array<WeightEntity>>(originalWeights)

  /**************************************
   * Mutate
   **************************************/
  const addStateWeight = (contentId: string) => {
    setWeights([
      ...weights,
      {
        contentId,
        weight: Number(weight),
        workOutDate
      }
    ])
  }

  const changeStateWeight = (contentId: string) => {
    const updateWeights = weights.map((w) => {
      if (w.contentId === contentId) {
        return {
          contentId,
          weight: Number(weight),
          workOutDate: getFormattedDate(workOutDate, yyyyMMDD)
        }
      }

      return w
    })

    setWeights(updateWeights)
  }

  /**************************************
   * API
   **************************************/
  const registerWeight = async (): Promise<void> => {
    /** Patch weight, when user have already registered workOutDate */
    registeredWeight() ? await patchWeight() : await createWeight()
  }

  /** Create new weight */
  const createWeight = async (): Promise<void> => {
    const [contentId, newWeight] = await WeightRepository.createWeight({
      userId: user.id,
      weight: Number(weight),
      workOutDate: `${workOutDate} ${currentlyHour()}:00:00.000`,
    })

    if (newWeight) {
      addStateWeight(contentId)
    }
  }

  /** Update weight by contentID */
  const patchWeight = async (): Promise<void> => {
    const [contentId, updateWeight] = await WeightRepository.patchWeight({
      contentId: registeredWeight().contentId,
      userId: user.id,
      weight: Number(weight),
      workOutDate: `${workOutDate} ${currentlyHour()}:00:00.000`,
    })

    if (updateWeight) {
      changeStateWeight(contentId)
    }
  }

  /**************************************
   * Display-related data
   **************************************/

  /** Weight that has ALREADY registered on workOutDate the user chose */
  const registeredWeight = (): WeightEntity | null =>
    weights.find((weight) => weight.workOutDate === workOutDate) ?? null

  const gwtLatestWeight = () => weights[0]?.weight || null
  const latestWeight = useMemo(gwtLatestWeight, [weights])

  const meterHeight = (): number | null => {
    return !!user ? (parseInt(user?.height, 10) / 100) : null
  }

  const weeklyWeights = () => {
    return getSortTheLastOneWeek().map((day) => {
      const date = weights?.find(({ workOutDate }) => workOutDate === day)
      
      return {
        weight: date ? date.weight : null,
        day: getFormattedDate(day, 'MM/DD')
      }
    })
  }

  /** BMI:　体重(kg) ÷ {身長(m) Ｘ 身長(m)} */
  const bmi = () => {
    if (!latestWeight || !meterHeight()) {
      return null
    }

    return (latestWeight / (meterHeight() ** 2)).toFixed(1)
  }

  /** SBW(standard body weight): 標準体重 */
  const sbw = () => {
    return meterHeight()
      ? (22 * (meterHeight() ** 2)).toFixed(1)
      : null
  }

  const newContext: UserWeightContextType = {
    workOutDate,
    setWorkOutDate,
    weight,
    setWeight,
    registerWeight,
    weeklyWeights,
    latestWeight,
    bmi,
    sbw,
  }

  return (
    <UserWeightContext.Provider value={newContext}>
      {children}
    </UserWeightContext.Provider>
  )
}
