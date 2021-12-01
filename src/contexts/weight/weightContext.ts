import { createContext, Dispatch, SetStateAction } from 'react'


export interface UserWeightContextType {
  workOutDate: string,
  setWorkOutDate: Dispatch<SetStateAction<string>>,
  weight: number | string,
  setWeight: Dispatch<SetStateAction<number | string>>,
  registerWeight: () => Promise<void>,
  fetchWeights: () => Promise<void>,
  weeklyWeights: () => Array<{
    weight: number | null,
    day: string
  }>
  latestWeight: () => number | null
  bmi: () => string | null
  sbw: () => string | null
}

export const UserWeightContext = createContext<UserWeightContextType>({
  workOutDate: '',
  setWorkOutDate: () => {},
  weight: null,
  setWeight: () => {},
  registerWeight: async () => {},
  fetchWeights: async () => {},
  weeklyWeights: () => [],
  latestWeight: () => null,
  bmi: () => null,
  sbw: () => null,
})
