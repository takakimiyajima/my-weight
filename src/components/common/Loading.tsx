import * as React from 'react'
import styled from 'styled-components'

type Props = {
  className?: string;
}

const Component = ({ className }: Props) => (
  <div className={className}>
    <div className="spinner" />
  </div>
)

const StyledComponent = styled(Component)`
  position: fixed;
  background-color: rgba(#100d0d, 0.8);
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  transition: all 1s;
  top: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;

  > .spinner {
    width: 100px;
    height: 100px;
    margin: 200px auto;
    background-color: ${(props) => props.theme.green};
    border-radius: 100%;
    animation: sk-scaleout 1.0s infinite ease-in-out;
  }

  @keyframes sk-scaleout {
    0% {
      transform: scale(0);
    } 100% {
      transform: scale(1.0);
      opacity: 0;
    }
  }
`

export const Loading = (props: Props): JSX.Element => {
  return <StyledComponent {...props} />
}
