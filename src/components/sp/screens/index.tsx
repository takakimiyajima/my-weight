import React, { useContext } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { UserWeightContext } from '@/contexts/weight/weightContext'
import styled from 'styled-components'
import { Header } from '@/components/sp/layouts/Header'

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
          <div className="title">Body weight</div>
          <div className="shape">Body shape</div>
          <div className="weight">{latestWeight()}<span className="kg">kg</span></div>
          <ResponsiveContainer className="chart" width="100%" height={250}>
            <LineChart
              cx={300}
              width={700}
              height={300}
              data={weeklyWeights()}
              margin={{
                top: 20,
                right: 40,
                left: -30,
                bottom: 5,
              }}
            >
              <defs>
                <linearGradient
                  id="gradationColor"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#fff" />
                  <stop offset="100%" stopColor="#e44c4c" />
                </linearGradient>
              </defs>
              <XAxis dataKey="day" stroke="white" />
              <YAxis stroke="white" type="number" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="weight"
                stroke="white"
                activeDot={{ r: 8 }}
              />
            </LineChart>
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

      {/* <footer className="">
        <p>Powered by Takaki Miyajima</p>
      </footer> */}
    </>
  )
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
`

// ${(props) => {
//   switch (props.pageType) {
//     case "top":
//       return `padding-top: 62px;`;
//     case "app_article":
//       return `padding-top: 0px;`;
//     case "other":
//       return `padding-top: 44px;`;
//   }
// }}

export const SpScreen = (props: Props): JSX.Element => {
  return <StyledComponent {...props} />;
};

