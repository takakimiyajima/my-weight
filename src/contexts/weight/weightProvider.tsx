import React from 'react'
import { UserWeightContext, UserWeightContextType } from './weightContext'
import { UserEntity, WeightEntity } from '@/entities'
import { getFormattedDate, getSortTheLastOneWeek } from '@/utils'

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
  const latestWeight = () => {
    return weights[0].weight || null
  }

  const getMeterHeight = (): number => {
    return user.height / 100
  }

  const weeklyWeights = () => {
    return getSortTheLastOneWeek().map((day) => {
      const hasData = weights.find(({ workOutDate }) => workOutDate === day)
      
      return {
        weight: hasData ? hasData.weight : null,
        day: getFormattedDate(day, 'MM/DD')
      }
    })
  }

  /** BMI:　体重(kg) ÷ {身長(m) Ｘ 身長(m)} */
  const bmi = () => {
    if (!latestWeight()) {
      return null
    }

    return (latestWeight() / (getMeterHeight() ** 2)).toFixed(1)
  }

  /** SBW(standard body weight): 標準体重 */
  const sbw = () => {
    return (22 * (getMeterHeight() ** 2)).toFixed(1)
  }

  const newContext: UserWeightContextType = {
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
