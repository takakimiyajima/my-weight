import React, { useContext } from 'react'
import styled from 'styled-components'
import { XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { UserWeightContext } from '@/contexts/weight/weightContext'

type Props = {
  className?: string
}

const Component = ({ className }: Props): JSX.Element => {
  const {
    weeklyWeights
  } = useContext(UserWeightContext)

  return (
    <div className={className}>
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
              <stop offset="0%" stopColor="white" stopOpacity={0.8} />
              <stop offset="75%" stopColor="#ff5655" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area dataKey="weight" stroke="white" fill="url(#color)" />
          <XAxis dataKey="day" stroke="white" />
          <YAxis dataKey="weight" stroke="white" />
          <Tooltip content={<CustomTooltip active="" payload="" />} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
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

const StyledComponent = styled(Component)`
  color: ${(props) => props.theme.white};
  font-size: 14px;
  font-weight: bold;

  .tooltip {
    border-radius: 0.25rem;
    background: #26313c;
    padding: 1rem;
    box-shadow: 15px 30px 48px 5px rgba(0, 0, 0, 0.5);
    text-align: center;
  }
`

export const LineChart = (props: Props): JSX.Element => {
  return <StyledComponent {...props} />;
};

