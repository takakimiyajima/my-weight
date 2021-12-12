import React, { useContext } from 'react'
import styled from 'styled-components'
import { UserWeightContext } from '@/contexts/weight/weightContext'
import { SubWeightParameter } from '@/components/sp/atoms'

type Props = {
  className?: string
}

const Component = ({ className }: Props): JSX.Element => {
  const {
    bmi,
    sbw
  } = useContext(UserWeightContext)

  return (
    <div className={className}>
      <SubWeightParameter
        title="BMI"
        shape="himan"
        parameter={bmi()}
      />
      <SubWeightParameter
        title="SBW"
        shape="Body shape"
        parameter={sbw()}
        unit="kg"
      />
      {/**
       * NOTE: can add SubWeightParameter component if you want
       */}
    </div>
  )
}

const StyledComponent = styled(Component)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin: auto;
`

export const SubWeightParameters = (props: Props): JSX.Element => {
  return <StyledComponent {...props} />
};

