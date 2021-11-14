import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'

type Props = {
  className?: string
}

/** Logo for SP */
const Logo = () => (
  <Link href='/' passHref>
    {/** NOTE: https://github.com/vercel/next.js/issues/7915 */}
    <>
      <Image
        src="/sp/logo.png"
        alt="logoSP"
        width="140"
        height="70"
      />
    </>
  </Link>
)

const Component = ({ className }: Props): JSX.Element => (
  <header className={className}>
    <div className="header-top">
      <Logo />
    </div>
  </header>
)

export const StyledComponent = styled(Component)`
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  overflow-y: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 50;

  > .header-top {
    position: relative;
    text-align: center;
  }
`

export const Header = (): JSX.Element => {
  return (
    <StyledComponent />
  )
}
