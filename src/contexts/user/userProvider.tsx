import React, { ReactNode, useState } from 'react'
import { useRouter } from 'next/router'
import { UserContext, UserContextType } from './userContext'
import { UserEntity } from '@/entities'
import { UserRepository } from '@/repositories'

export interface ProviderProps {
  children?: ReactNode
  user: UserEntity | null
}

export const UserContextProvider = ({ children, user }: ProviderProps) => {
  const existUser = !!user
  const contentId = user?.contentId ?? null
  const [firstName, setFirstName] = useState<string>(user?.firstName ?? '')
  const [lastName, setLastName] = useState<string>(user?.lastName ?? '')
  const [gender, setGender] = useState<string>(user?.gender ?? 'male')
  const [dateOfBirth, setDateOfBirth] = useState<string>(
    user?.dateOfBirth ?? ''
  )
  const [height, setHeight] = useState<string | null>(user?.height ?? '')

  const router = useRouter()

  const createUser = async (userId: string) => {
    await UserRepository.createUser({
      userId,
      firstName,
      lastName,
      gender,
      dateOfBirth,
      height,
    })

    /** redirect TOP page */
    await router.push('/')
  }

  const updateUser = async (userId: string) => {
    await UserRepository.updateUser({
      contentId,
      userId,
      firstName,
      lastName,
      gender,
      dateOfBirth,
      height,
    })

    /** redirect TOP page */
    router.push('/')
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
    updateUser,
  }

  return (
    <UserContext.Provider value={newContext}>{children}</UserContext.Provider>
  )
}
