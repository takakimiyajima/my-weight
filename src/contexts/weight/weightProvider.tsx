import React, { useState } from 'react'
import { UserWeightContext, UserWeightContextType } from './weightContext'
import { UserEntity, WeightEntity } from '@/entities'
import { WeightRepository } from '@/repositories'
import { getFormattedDate, getSortTheLastOneWeek } from '@/utils'
import { today } from '@/utils'

export interface ProviderProps {
  children?: React.ReactNode
  user: UserEntity
  weights: Array<WeightEntity>
}
export const UserWeightContextProvider = ({
  children,
  user,
  weights,
}: ProviderProps) => {
  /**************************************
   * Register-related
   **************************************/
  const [workOutDate, setWorkOutDate] = useState<string>(today())
  const [weight, setWeight] = useState<number | string>('')

  /** Weight that has already registered on workOutDate the user chose */
  const registeredWeight = (): WeightEntity | null => {
    return weights.find((weight) => weight.workOutDate === workOutDate) ?? null
  }

  const registerWeight = async (): Promise<null> => {
    /** Patch weight, when user have already registered workOutDate */
    if (registeredWeight()) {
      await WeightRepository.patchWeight({
        contentId: registeredWeight().contentId,
        userId: user.id,
        weight: Number(weight),
        workOutDate,
      })

      return
    }

    /** Create weight, when user haven't registered workOutDate yet */
    await WeightRepository.createWeight({
      userId: user.id,
      weight: Number(weight),
      workOutDate,
    })
  }

  /**************************************
   * Display-related
   **************************************/
  const latestWeight = () => weights[0]?.weight || null

  const getMeterHeight = (): number | null => {
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
    if (!latestWeight() || !getMeterHeight()) {
      return null
    }

    return (latestWeight() / (getMeterHeight() ** 2)).toFixed(1)
  }

  /** SBW(standard body weight): 標準体重 */
  const sbw = () => {
    return getMeterHeight()
      ? (22 * (getMeterHeight() ** 2)).toFixed(1)
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
