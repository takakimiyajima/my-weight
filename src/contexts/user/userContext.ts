import { createContext, Dispatch, SetStateAction } from 'react'

export interface UserContextType {
  isNewUser: boolean
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
  postUser: () => Promise<void>
}

export const UserContext = createContext<UserContextType>({
  isNewUser: false,
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
  postUser: async () => {}
})
