import React, { useContext } from 'react'
import { XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { UserWeightContext } from '@/contexts/weight/weightContext'
import styled from 'styled-components'
import { Header, Footer } from '@/components/sp/layouts'

type Props = {
  className?: string
}

export const Component = ({ className }: Props): JSX.Element => {
  const { latestWeight, bmi, sbw, weeklyWeights } = useContext(UserWeightContext)

  return (
    <>
      <Header />

      <div className={className}>
        <div className="weight-weekly-container">
          <div className="title">Prev Body Weight</div>
          <div className="shape">Body shape</div>
          <div className="weight">{latestWeight()}<span className="kg">kg</span></div>
          <ResponsiveContainer className="chart" width="100%" height={250} >
            <AreaChart
              data={weeklyWeights()}
              margin={{
                top: 20,
                right: 26,
                left: -26,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient id="color" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="white" stopOpacity={0.8}></stop>
                  <stop offset="75%" stopColor="#ff5655" stopOpacity={0.05}></stop>
                </linearGradient>
              </defs>
              <Area dataKey="weight" stroke="white" fill="url(#color)" />
              <XAxis dataKey="day" stroke="white" />
              <YAxis dataKey="weight" stroke="white" />
              <Tooltip content={<CustomTooltip active="" payload="" />} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="sub-parameters">
          <div className="container">
            {/** BMI: 標準体重指数 */}
            <div className="title">BMI</div>
            <div className="shape">Obesity</div>
            <div className="weight">{bmi()}<span className="kg"></span></div>
          </div>
          <div className="container">
            {/** SBW(standard body weight): 標準体重 */}
            <div className="title">SBW</div>
            <div className="shape">Body shape</div>
            <div className="weight">{sbw()}<span className="kg">kg</span></div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div className="tooltip">
        <h4>{payload[0].payload.day}</h4>
        <p>{payload[0].payload.weight}kg</p>
      </div>
    )
  }

  return null
}

// TODO: 基本的にここはレイアウト関連のみのスタイルを充てる
const StyledComponent = styled(Component)`
  padding: 74px 20px 40px;

  > .weight-weekly-container {
    padding: 12px;
    color: ${(props) => props.theme.white};
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

    > .chart {
      font-size: 12px;
      font-weight: bold;
    }
  }

  > .sub-parameters {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    margin: auto;

    > .container {
      margin-top: 20px;
      padding: 12px;
      border-radius: 10px;
      width: 48%;
      height: 160px;
      color: ${(props) => props.theme.white};
      background: ${(props) => props.theme.yellow};

      > .title {
        font-size: 14px;
        font-weight: bold;
      }

      > .shape {
        font-size: 12px;
      }

      > .weight {
        text-align: center;
        font-size: 40px;
        > .kg {
          margin-left: 10px;
          font-size: 20px;
        }
      }
    }
  }

  .tooltip {
    border-radius: 0.25rem;
    background: #26313c;
    color: ${(props) => props.theme.white};
    padding: 1rem;
    box-shadow: 15px 30px 48px 5px rgba(0, 0, 0, 0.5);
    text-align: center;
  }
`

export const SpScreen = (props: Props): JSX.Element => {
  return <StyledComponent {...props} />;
};

