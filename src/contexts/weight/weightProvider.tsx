import React, { useState, ReactNode } from 'react'
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
   * Register-related
   **************************************/
  const [workOutDate, setWorkOutDate] = useState<string>(today().format(yyyyMMDD))
  const [weight, setWeight] = useState<number | string>('')
  const [weights, setWeights] = useState<Array<WeightEntity>>(originalWeights)

  /** Weight that has ALREADY registered on workOutDate the user chose */
  const registeredWeight = (): WeightEntity | null =>
    weights.find((weight) => weight.workOutDate === workOutDate) ?? null

  /** Create new weight */
  const createWeight = async (): Promise<void> => {
    return await WeightRepository.createWeight({
      userId: user.id,
      weight: Number(weight),
      workOutDate: `${workOutDate} ${currentlyHour()}:00:00.000`,
    })
  }

  /** Update weight by contentID */
  const patchWeight = async (): Promise<void> => {
    const updateWeight = await WeightRepository.patchWeight({
      contentId: registeredWeight().contentId,
      userId: user.id,
      weight: Number(weight),
      workOutDate: `${workOutDate} ${currentlyHour()}:00:00.000`,
    })

    if (updateWeight && updateWeight.config) {
      const { weight, workOutDate } = JSON.parse(updateWeight.config.data)
      const updateWeights = weights.map((w) => {
        if (w.contentId === registeredWeight().contentId) {
          return {
            contentId: registeredWeight().contentId,
            weight: weight,
            workOutDate: getFormattedDate(workOutDate, yyyyMMDD)
          }
        }

        return w
      })

      setWeights(updateWeights)
    }
  }

  const registerWeight = async (): Promise<void> => {
    /** Patch weight, when user have already registered workOutDate */
    registeredWeight() ? await patchWeight() : await createWeight()
  }

  /**************************************
   * Display-related
   **************************************/
  const latestWeight = () => weights[0]?.weight || null

  const meterHeight = (): number | null => {
    return !!user ? (parseInt(user?.height, 10) / 100) : null
  }

  const weeklyWeights = () => {
    return getSortTheLastOneWeek().map((day) => {
      const hasDate = weights?.find(({ workOutDate }) => workOutDate === day)
      
      return {
        weight: hasDate ? hasDate.weight : null,
        day: getFormattedDate(day, 'MM/DD')
      }
    })
  }

  /** BMI:　体重(kg) ÷ {身長(m) Ｘ 身長(m)} */
  const bmi = () => {
    if (!latestWeight() || !meterHeight()) {
      return null
    }

    return (latestWeight() / (meterHeight() ** 2)).toFixed(1)
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
