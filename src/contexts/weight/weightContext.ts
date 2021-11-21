import { createContext } from 'react'
// import { WeightEntity } from '@/entities'

export interface UserWeightContextType {
  weeklyWeights: () => Array<{
    weight: number | null,
    day: string
  }>
  latestWeight: () => number | null
  bmi: () => string | null
  sbw: () => string | null
}

export const UserWeightContext = createContext<UserWeightContextType>({
  weeklyWeights: () => [],
  latestWeight: () => null,
  bmi: () => null,
  sbw: () => null,
})
