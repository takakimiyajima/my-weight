import * as React from 'react'
import styled from 'styled-components'

type Props = {
  className?: string;
}

const Component = ({ className }: Props) => (
  <div className={className}>
    <p className="loader">Loading.....</p>
  </div>
)

const StyledComponent = styled(Component)`
  position: relative;
  // background: ${(props) => props.theme.gray};

  > .loader,
  > .loader:before,
  > .loader:after {
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
    animation-fill-mode: both;
    animation: load7 1.8s infinite ease-in-out;
  }
  > .loader {
    color: ${(props) => props.theme.green};
    font-size: 10px;
    margin: 240px auto;
    position: relative;
    text-indent: -9999em;
    transform: translateZ(0);
    animation-delay: -0.16s;
  }
  > .loader:before,
  > .loader:after {
    content: '';
    position: absolute;
    top: 0;
  }
  > .loader:before {
    left: -3.5em;
    animation-delay: -0.32s;
  }
  > .loader:after {
    left: 3.5em;
  }

  @-webkit-keyframes load7 {
    0%,
    80%,
    100% {
      box-shadow: 0 2.5em 0 -1.3em;
    }
    40% {
      box-shadow: 0 2.5em 0 0;
    }
  }
  @keyframes load7 {
    0%,
    80%,
    100% {
      box-shadow: 0 2.5em 0 -1.3em;
    }
    40% {
      box-shadow: 0 2.5em 0 0;
    }
  }
`

export const Loading = (props: Props): JSX.Element => {
  return <StyledComponent {...props} />
}
