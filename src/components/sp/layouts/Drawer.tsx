import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'

type ContainerProps = {
  visible: boolean
  children: ReactNode
}

type Props = {
  className?: string
} & ContainerProps

const Component = ({ className, visible, children }: Props) => (
  <div
    className={className}
    onClick={(e) => {
      e.stopPropagation();
    }}
  >
    <CSSTransition in={visible} timeout={300} classNames="drawer" unmountOnExit>
      <div className="drawer">{children}</div>
    </CSSTransition>
  </div>
);

const StyledComponent = styled(Component)`
  > .drawer {
    background: #fff;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.3), 0 1px 1px rgba(0, 0, 0, 0.3);
    height: calc(100% - 44px);
    overflow-y: scroll;
    position: absolute;
    right: 0;
    transform: translateX(100%);
    transition: transform 275ms ease-in-out;
    top: 0;
    width: 79.8%;
    z-index: 0;
  }
  > .drawer-enter-active {
    transform: translateX(0);
  }
  > .drawer-exit {
    transform: translateX(0);
  }
  > .drawer-exit-active {
    transform: translateX(100%);
  }

  > .drawer-enter-done {
    transform: translateX(0);
  }
`;

export const Drawer = (props: ContainerProps): JSX.Element => {
  return <StyledComponent {...props} />;
};
