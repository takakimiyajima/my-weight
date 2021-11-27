import React, { useState, Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'
import { DrawerMenu } from '@/components/sp/layouts'

type ContainerProps = {
  isMenuOpen: boolean
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>
}

type Props = {
  className?: string
} & ContainerProps

/** Logo for SP */
const Logo = () => (
  <Link href='/' passHref>
    <a>
      <Image
        src="/sp/logo.png"
        alt="logoSP"
        width="140"
        height="70"
      />
    </a>
  </Link>
)

const Component = ({
  className,
  isMenuOpen,
  setIsMenuOpen
}: Props ): JSX.Element => (
  <header className={className}>
    <div className="header-top">
      <div className="logo">
        <Logo />
      </div>
      {/** Hamburger Menu */}
      <button
        className={`
          menu
          ${isMenuOpen ? "active" : ""}`
        }
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
      </button>
    </div>
    <CSSTransition
      in={isMenuOpen}
      timeout={300}
      classNames="header-content"
    >
      <div
        className="header-content"
        onClick={() => setIsMenuOpen(false)}
      >
        <DrawerMenu visible={isMenuOpen} />
      </div>
    </CSSTransition>
  </header>
)

export const StyledComponent = styled(Component)`
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);
  overflow-y: hidden;
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.275s ease-in-out;
  width: 100%;
  z-index: 50;

  > .header-top {
    position: relative;
    text-align: center;
    background: ${(props) => props.theme.white};

    > .logo {
      margin: -8px 0 -10px;
    }

    > .logout {
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translateY(-50%);
      -webkit-transform: translateY(-50%);
      -ms-transform: translateY(-50%);

      display: inline-block;
      padding: 4px 10px;
      font-size: 14px;
      font-weight: bold;
      color: ${(props) => props.theme.orange};
      border-radius: 25px;
      border: 1px solid ${(props) => props.theme.orange};
      cursor: pointer;
    }

    > .menu {
      position: absolute;
      top: 50%;
      right: 20px;
      transform: translateY(-44%);
      display: block;
      width: 26px;
      height: 20px;
      box-sizing: border-box;
      transition: all 0.4s;
      span {
        background: #857754;
        border-radius: 1px;
        box-sizing: border-box;
        display: inline-block;
        height: 2px;
        left: 0;
        position: absolute;
        transition: all 0.4s;
        width: 100%;
        &:nth-of-type(1) {
          top: 0;
        }
        &:nth-of-type(2) {
          top: 9px;
        }
        &:nth-of-type(3) {
          bottom: 0;
        }
      }
      &.active {
        span {
          &:nth-of-type(1) {
            transform: translateY(9px) rotate(-45deg);
          }
          &:nth-of-type(2) {
            opacity: 0;
          }
          &:nth-of-type(3) {
            transform: translateY(-9px) rotate(45deg);
          }
        }
      }
    }
  }

  > .header-content {
    background: rgba(0, 0, 0, 0.4);
    height: 100vh;
    display: none;
    position: relative;
    width: 100%;
  }
  > .header-content-enter {
    opacity: 0;
    display: block;
  }
  > .header-content-enter-active {
    opacity: 1;
    display: block;
    transition: opacity 275ms, transform 275ms, height 275ms;
  }
  > .header-content-exit {
    opacity: 1;
    display: block;
  }
  > .header-content-exit-active {
    opacity: 0;
    display: block;
    transition: opacity 275ms, transform 275ms, height 275ms;
  }

  > .header-content-exit-done {
    display: none;
  }
  > .header-content-enter-done {
    display: block;
  }
`

export const Header = (): JSX.Element => {
  /** Show drawer menu or not */
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <StyledComponent
      isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen}
    />
  )
}
