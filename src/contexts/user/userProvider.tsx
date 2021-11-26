import React, { ReactNode, useState } from 'react'
import { UserContext, UserContextType } from './userContext'
import { UserEntity } from '@/entities'
import { UserRepository } from '@/repositories'

export interface ProviderProps {
  children?: ReactNode
  user: UserEntity | null
}

export const UserContextProvider = ({
  children,
  user,
}: ProviderProps) => {
  const isNewUser = !user
  const [firstName, setFirstName] = useState<string>(user.firstName)
  const [lastName, setLastName] = useState<string>(user.lastName)
  const [gender, setGender] = useState<string>(user.gender)
  const [dateOfBirth, setDateOfBirth] = useState<string>(user.dateOfBirth)
  const [height, setHeight] = useState<string | number | null>(user.height)

  // const user = useContext(UserContext)
  const postUser = async () => {
    await UserRepository.postUser()
  }

  const newContext: UserContextType = {
    isNewUser,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    gender,
    setGender,
    dateOfBirth,
    setDateOfBirth,
    height,
    setHeight,
    postUser,
  }

  return (
    <UserContext.Provider value={newContext}>
      {children}
    </UserContext.Provider>
  )
}
