import * as React from "react"
import styled from "styled-components"

type Props = {
  className?: string;
}

const Component = ({ className }: Props) => (
  <footer className={className}>
    <p>Copyright 2021 Takaki Miyajima All right reserved</p>
  </footer>
);

const StyledComponent = styled(Component)`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px 10px;
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  color: ${(props) => props.theme.white};
  background: ${(props) => props.theme.green};
`;

export const Footer = (props: Props): JSX.Element => {
  return <StyledComponent {...props} />;
};
