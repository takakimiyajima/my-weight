import React from 'react'
import { WeightContext, WeightContextType } from './weightContext'
import { WeightEntity } from '@/entities/Weight'

export interface ProviderProps {
  children?: React.ReactNode
  weights: Array<WeightEntity>
}
export const WeightContextProvider = ({
  children,
  weights
}: ProviderProps) => {
  const latestWeight = () => {
    return weights[0].weight || null
  }

  /** BMI:　体重(kg) ÷ {身長(m) Ｘ 身長(m)} */
  const bmi = () => {
    if (!latestWeight()) {
      return null
    }

    const height = 1.78
    return (latestWeight() / height**2).toFixed(1)
  }

  /** BMI:　体重(kg) ÷ {身長(m) Ｘ 身長(m)} */
  const sbw = () => {
    const height = 1.78

    return (22 * height**2).toFixed(1)
  }

  const newContext: WeightContextType = {
    weights,
    latestWeight,
    bmi,
    sbw,
  }

  return (
    <WeightContext.Provider value={newContext}>
      {children}
    </WeightContext.Provider>
    )
}
