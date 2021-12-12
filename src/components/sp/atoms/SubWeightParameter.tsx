import React from 'react'
import styled from 'styled-components'

type ContainerProps = {
  title: string
  shape: string
  parameter: string
  unit?: string 
}

type Props = {
  className?: string
} & ContainerProps

const Component = ({
  className,
  title,
  shape,
  parameter,
  unit,
}: Props): JSX.Element => {
  return (
    <div className={className}>
      <div className="title">{title}</div>
      <div className="shape">{shape}</div>
      <div className="parameter">{parameter}
        {unit && <span className="unit">{unit}</span>}
      </div>
    </div>
  )
}

const StyledComponent = styled(Component)`
  position: relative;
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

  > .parameter {
    position: absolute;
    bottom: 0;
    margin-bottom: 10px;
    font-size: 46px;

    > .unit {
      margin-left: 10px;
      font-size: 20px;
    }
  }
`

export const SubWeightParameter = (props: Props): JSX.Element => {
  return <StyledComponent {...props} />;
};

