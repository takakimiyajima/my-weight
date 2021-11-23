import React, { ReactNode, useState } from 'react'
import { UserContext, UserContextType } from './userContext'
import { UserEntity } from '@/entities'

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
  }

  return (
    <UserContext.Provider value={newContext}>
      {children}
    </UserContext.Provider>
  )
}
