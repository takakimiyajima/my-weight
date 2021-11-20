import { createContext } from 'react'
import { WeightEntity } from '@/entities'

export interface WeightContextType {
  weights: Array<WeightEntity>
  latestWeight: () => number | null
  bmi: () => string | null
  sbw:() => string | null
}

export const WeightContext = createContext<WeightContextType>({
  weights: [],
  latestWeight: () => null,
  bmi: () => null,
  sbw: () => null
})
