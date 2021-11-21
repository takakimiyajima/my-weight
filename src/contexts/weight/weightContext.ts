import { createContext } from 'react'
import { WeightEntity } from '@/entities'

export interface UserWeightContextType {
  weeklyData: Array<WeightEntity>
  latestWeight: () => number | null
  bmi: () => string | null
  sbw: () => string | null
}

export const UserWeightContext = createContext<UserWeightContextType>({
  weeklyData: [],
  latestWeight: () => null,
  bmi: () => null,
  sbw: () => null,
})
