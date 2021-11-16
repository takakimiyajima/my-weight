import { createContext } from 'react'
import { WeightEntity } from '@/entities'

export interface WeightContextType {
  weight: Array<WeightEntity>
  setWeight: (weight: Array<WeightEntity>) => void,
  bmi: () => number | null
  sbw:() => number | null
}

export const WeightContext = createContext<WeightContextType>({
  weight: [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setWeight: (weight: Array<WeightEntity>) => {},
  bmi: () => null,
  sbw: () => null
})
