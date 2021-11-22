import * as React from "react"
import styled from "styled-components"

export type Props = {
  className?: string;
}

const Component = ({ className }: Props) => (
  <footer className={className}>
    <p>Copyright 2021 Takaki Miyajima All right reserved</p>
  </footer>
);

const StyledComponent = styled(Component)`
  padding: 20px;
  text-align: right;
  font-size: 12px;
  font-weight: 500;
  color: ${(props) => props.theme.white};
  background: ${(props) => props.theme.green};
`;

export const Footer = (props: Props): JSX.Element => {
  return <StyledComponent {...props} />;
};
