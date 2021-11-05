import React from 'react'
import { SpScreen } from "@/components/sp/screens"
import { useUserAgent } from "@/libs/useUserAgent"
import { WeightEntity } from '@/entities'
import { WeightRepository } from '@/repositories'

type Props = {
  weights: Array<WeightEntity>
}

export async function getServerSideProps() {
  try {
    const weights = await WeightRepository.fetchWeights()

    return {
      props: {
        weights
      }
    }
  } catch (error) {
    console.log(error)
  } 
}

export default function Home(props: Props) {
  // TODO: when data missing, show error page

  const userDevice = useUserAgent()
  // TODO: prepare some components
  return (
    <>
      {userDevice.isMobile ? (
        <SpScreen weights={props.weights} />
      ) : (
        <p>Under Construction for PC</p>
        // <PcContent data={props} />
      )}
    </>
  )
}
