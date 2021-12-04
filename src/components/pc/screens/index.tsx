import React from 'react'
import styled from 'styled-components'

type Props = {
  className?: string
}

export const Component = ({ className }: Props): JSX.Element => {
  return (
    <div className={className}>
      <div className="message">
        <p>Sorry, PC mode is now under construction!!</p>
        <p>You can see this app on SP mode, Thanks!</p>
      </div>
    </div>
  )
}

const StyledComponent = styled(Component)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  height: 40em;
  color: ${(props) => props.theme.orange};

  > .message {
    font-size: 30px;
    font-weight: 700;
  }  
`

export const PcScreen = (props: Props): JSX.Element => {
  return <StyledComponent {...props} />;
};

