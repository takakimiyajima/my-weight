import * as React from 'react'
import styled from 'styled-components'

type Props = {
  className?: string;
}

const Component = ({ className }: Props) => (
  <p className={className}>
    Loading.....
  </p>
)

const StyledComponent = styled(Component)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  -webkit- transform: translateY(-50%) translateX(-50%);
  margin: auto;
  font-size: 20px;
  color: ${(props) => props.theme.green};
`

export const Loading = (props: Props): JSX.Element => {
  return <StyledComponent {...props} />
}
