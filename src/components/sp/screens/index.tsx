import React, { useState ,useContext } from 'react'
import styled from 'styled-components'
import { useForm, FormProvider } from 'react-hook-form'
import { UserWeightContext } from '@/contexts/weight/weightContext'
import { Header, Footer } from '@/components/sp/layouts'
import { Loading } from '@/components/common/Loading'
import { LineChart, SubWeightParameters } from '@/components/sp/molecules'

type FormState = {
  weight: number | string
}

type Props = {
  className?: string
}

export const Component = ({ className }: Props): JSX.Element => {
  const {
    workOutDate,
    setWorkOutDate,
    weight,
    setWeight,
    registerWeight,
    latestWeight,
  } = useContext(UserWeightContext)

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const updateWeights = async (): Promise<void> => {
    setIsLoading(true)
    await registerWeight()
    setIsLoading(false)
  }

  const methods = useForm<FormState>({
    mode: 'onChange',
    defaultValues: {
      weight
    },
  })

  if (isLoading) {
    return <Loading />
  }

  return (
    <>
      <Header />

      <FormProvider {...methods}>
        <div className={className}>
          <div className="weight-input-container">
            <div className="weight-input-inner">
              <label htmlFor="workOutDate">Work Out Date</label>
              <input
                id="workOutDate"
                className="weight-input"
                type="date"
                value={workOutDate}
                onChange={(event) => setWorkOutDate(event.target.value)}
              />
            </div>
            <div className="weight-input-inner">
              <label htmlFor="weight">Weight</label>
              <input
                id="weight"
                className="weight-input"
                type="number"
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
              />
            </div>
            <button
              className={`
                register
                ${(!workOutDate || !weight) && "--disabled"}
              `}
              disabled={!workOutDate || !weight}
              onClick={async () => await updateWeights()}
            >
              Register
            </button>
          </div>
          <div className="weight-weekly-container">
            <div className="title">Prev Body Weight</div>
            <div className="shape">Body shape</div>
            <div className="weight">
              {latestWeight
                ?
                  <>
                    {latestWeight}<span className="kg">kg</span>
                  </>
                : '-'
              }
            </div>
            <LineChart />
          </div>
          <SubWeightParameters />
        </div>
      </FormProvider>

      <Footer />
    </>
  )
}

// TODO: 基本的にここはレイアウト関連のみのスタイルを充てる
const StyledComponent = styled(Component)`
  padding: 74px 20px 40px;
  color: ${(props) => props.theme.white};

  > .weight-input-container {
    position: relative;
    padding: 12px;
    background: ${(props) => props.theme.green};
    border-radius: 10px;
    font-size: 14px;
    font-weight: bold;

    > .weight-input-inner {
      margin-top: 14px;
      
      &:first-child {
        margin-top: 0;
      }

      > .weight-input {
        padding-left: 4px;
        color: ${(props) => props.theme.black};
        position: absolute;
        right: 12px;
        background: ${(props) => props.theme.white};
        border-radius: 10px;
        width: 40%;
      }
    }

    > .register {
      display: inline-block;
      position: relative;
      margin-top: 20px;
      width: 100%;
      height: 50px;
      text-align: center;
      font-weight: bold;
      color: ${(props) => props.theme.white};
      background: ${(props) => props.theme.green};
      border: 2px solid ${(props) => props.theme.white};
      border-radius: 20px;
      cursor: pointer;
      opacity: 1;
      transition: opacity 0.4s ease-out;
  
      &.--disabled {
        opacity: 0.4;
      }
  
      &:hover {
        opacity: 0.6;
        transition: opacity 0.4s ease-out;
      }
  
      &::before {
        content: '';
        position: absolute;
        top: -4px;
        bottom: -4px;
        left: -4px;
        right: -4px;
        border: solid 1px ${(props) => props.theme.green};
        border-radius: 22px;
        z-index: -1;
      }
    }
  }

  > .weight-weekly-container {
    margin-top: 20px;
    padding: 12px;
    background: ${(props) => props.theme.orange};
    width: 100%;
    height: 400px;
    border-radius: 10px;

    > .title {
      font-size: 14px;
      font-weight: bold;
    }

    > .shape {
      font-size: 12px;
    }

    > .weight {
      text-align: center;
      font-size: 56px;

      > .kg {
        margin-left: 10px;
        font-size: 20px;
      }
    }
  }
`

export const SpScreen = (props: Props): JSX.Element => {
  return <StyledComponent {...props} />;
};

