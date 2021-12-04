import React from 'react'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/client'
import { PcScreen } from '@/components/pc/screens'
import { SpProfileScreen } from '@/components/sp/screens/profile'
import { useUserAgent } from '@/contexts/userAgent/useUserAgent'
import { UserContextProvider } from '@/contexts/user/userProvider'
import { UserEntity } from '@/entities'
import { UserRepository } from '@/repositories'

type Props = {
  existUser?: boolean
  user?: UserEntity | null
  error?: {
    statusCode: number
    message: string
  }
}

export const unauthorizedError = {
  props: {
    error: {
      statusCode: 401,
      message: 'unauthorized error',
    },
  },
}

export const notFoundError = {
  props: {
    error: {
      statusCode: 404,
      message: 'not found error',
    },
  },
}

export const internalServerError = {
  props: {
    error: {
      statusCode: 500,
      message: 'internal server error',
    },
  },
}

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<{ props: Props }> {
  try {
    const session = await getSession(context)
    if (!session) {
      return unauthorizedError
    }

    const userId = session.userId as number
    /** API */
    const user = await UserRepository.fetchUser(userId)

    return {
      props: {
        user
      },
    }
  } catch (error) {
    console.error(error)
  }
}

export default function Home(props: Props) {
  const userDevice = useUserAgent()

  return (
    <>
      <UserContextProvider user={props.user}>
        {userDevice.isMobile ? (
          <SpProfileScreen />
        ) : (
          <PcScreen />
        )}
      </UserContextProvider>
    </>
  )
}
