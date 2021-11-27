import React, { ReactNode, useState } from 'react'
import { UserContext, UserContextType } from './userContext'
import { UserEntity } from '@/entities'
import { UserRepository } from '@/repositories'

export interface ProviderProps {
  children?: ReactNode
  user: UserEntity | null
}

export const UserContextProvider = ({ children, user }: ProviderProps) => {
  const existUser = !!user
  console.log("user")
  console.log(user)
  const [firstName, setFirstName] = useState<string>(user?.firstName ?? '')
  const [lastName, setLastName] = useState<string>(user?.lastName ?? '')
  const [gender, setGender] = useState<string>(user?.gender[0] ?? 'male')
  const [dateOfBirth, setDateOfBirth] = useState<string>(user?.dateOfBirth ?? '')
  const [height, setHeight] = useState<string | null>(user?.height ?? '')

  const createUser = async (userId: string) => {
    await UserRepository.createUser({
      userId,
      firstName,
      lastName,
      gender,
      dateOfBirth,
      height
    })
  }

  const newContext: UserContextType = {
    existUser,
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
    createUser,
  }

  return (
    <UserContext.Provider value={newContext}>{children}</UserContext.Provider>
  )
}
