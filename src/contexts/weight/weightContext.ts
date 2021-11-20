import { createContext } from 'react'
import { WeightEntity } from '@/entities'

export interface WeightContextType {
  weeklyData: Array<WeightEntity>
  latestWeight: () => number | null
  bmi: () => string | null
  sbw:() => string | null
}

export const WeightContext = createContext<WeightContextType>({
  weeklyData: [],
  latestWeight: () => null,
  bmi: () => null,
  sbw: () => null
})
