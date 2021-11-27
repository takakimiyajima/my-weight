import { createContext, Dispatch, SetStateAction } from 'react'

export interface UserContextType {
  existUser: boolean
  firstName: string
  lastName: string
  gender: string
  dateOfBirth: string
  height: number | string | null
  setFirstName: Dispatch<SetStateAction<string>>
  setLastName: Dispatch<SetStateAction<string>>
  setGender: Dispatch<SetStateAction<string>>
  setDateOfBirth: Dispatch<SetStateAction<string>>
  setHeight: Dispatch<SetStateAction<number | string>>
  createUser: (userId: string) => Promise<void>
}

export const UserContext = createContext<UserContextType>({
  existUser: false,
  firstName: '',
  lastName: '',
  gender: 'male',
  dateOfBirth: '',
  height: null,
  setFirstName: () => {},
  setLastName: () => {},
  setGender: () => {},
  setDateOfBirth: () => {},
  setHeight: () => {},
  createUser: async () => {},
})
