import React from 'react'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/client'
import { SpScreen } from '@/components/sp/screens'
import { Loading } from '@/components/common/Loading'
import { useUserAgent } from '@/contexts/userAgent/useUserAgent'
import { UserEntity, WeightEntity } from '@/entities'
import { UserRepository, WeightRepository } from '@/repositories'
import { UserWeightContextProvider } from '@/contexts/weight/weightProvider'

type Props = {
  existUser?: boolean
  user?: UserEntity
  weights?: Array<WeightEntity>
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
    if (!user) {
      return {
        props: { existUser: true },
      }
    }

    /** TODO: when user cannot get */
    const weights = user ? await WeightRepository.fetchWeights(user.id) : []

    return {
      props: {
        user,
        weights
      }
    }
  } catch (error) {
    console.error(error)
  }
}

export default function Home(props: Props) {
  const router = useRouter()
  const userDevice = useUserAgent()
  // There's no user data
  if (props?.existUser || !props.user) {
    // TODO: Wanna fix
    router.push('/profile')

    return <Loading />
  }

  return (
    <>
      <UserWeightContextProvider user={props.user} weights={props.weights}>
        {userDevice.isMobile ? (
          <SpScreen />
        ) : (
          <p>Under Construction for PC</p>
          // <PcScreen />
        )}
      </UserWeightContextProvider>
    </>
  )
}
