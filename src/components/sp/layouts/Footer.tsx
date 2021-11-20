import * as React from "react"
import styled from "styled-components"

export type Props = {
  className?: string;
}

const Component = ({ className }: Props) => (
  <footer className={className}>
    <p>Powered by Takaki Miyajima</p>
  </footer>
);

const StyledComponent = styled(Component)`
  padding: 40px;
`;

export const Footer = (props: Props): JSX.Element => {
  return <StyledComponent {...props} />;
};
