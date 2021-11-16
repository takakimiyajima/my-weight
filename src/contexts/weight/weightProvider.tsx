import React, { useState, useContext } from 'react'
import { WeightContext, WeightContextType } from './weightContext'

export interface ProviderProps {
  children?: React.ReactNode
}
export const WeightContextProvider = ({
  children,
}: ProviderProps) => {

  /** default value */
  const context: WeightContextType = useContext(WeightContext)

  const [weight, setWeight] = useState(context.weight)

  /** BMI:　体重(kg) ÷ {身長(m) Ｘ 身長(m)} */
  const bmi = () => {
    const height = 1.78
    const lastWeight = weight[0].weight

    return lastWeight / height**2
  }

  /** BMI:　体重(kg) ÷ {身長(m) Ｘ 身長(m)} */
  const sbw = () => {
    const height = 1.78

    return 22 * height**2
  }

  const newContext: WeightContextType = {
    weight,
    setWeight,
    bmi,
    sbw,
  }

  return (
    <WeightContext.Provider value={newContext}>
      {children}
    </WeightContext.Provider>
    )
}
