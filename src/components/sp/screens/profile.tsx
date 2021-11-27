import React, { useContext } from 'react'
import styled from 'styled-components'
import { useSession } from 'next-auth/client'
import { UserContext } from '@/contexts/user/userContext'
import { Header, Footer } from '@/components/sp/layouts'

export type ContainerProps = {
}

type Props = {
  className?: string
}

export const Component = ({ className }: Props): JSX.Element => {
  const user = useContext(UserContext)
  const [session] = useSession()
  const userId = String(session.userId)

  return (
    <>
      <Header />

      <div className={className}>
        {/** First Name */}
        <div className="input-container">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            className="basic"
            type="text"
            value={user.firstName ?? ''}
            onChange={(event) => user.setFirstName(event.target.value)}
          />
        </div>
        {/** Last Name */}
        <div className="input-container">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            className="basic"
            type="text"
            value={user.lastName}
            onChange={(event) => user.setLastName(event.target.value)}
          />
        </div>
        {/** Gender */}
        <div className="input-container">
          <p>Gender</p>
          <div className="basic">
            <input
              id="male"
              name="gender"
              type="radio"
              value="male"
              checked={'male' === user.gender}
              onChange={(event) => user.setGender(event.target.value)}
            />
            <label className="radio-label" htmlFor="male">Male</label>
            <input
              id="female"
              className="female"
              name="gender"
              type="radio"
              value="female"
              checked={'female' === user.gender}
              onChange={(event) => user.setGender(event.target.value)}
            />
            <label className="radio-label female" htmlFor="female">Female</label>
          </div>
        </div>
        {/** Date Of Birth */}
        <div className="input-container">
          <label htmlFor="dateOfBirth">Date Of Birth</label>
          <input
            id="dateOfBirth"
            className="basic"
            type="date"
            value={user.dateOfBirth}
            onChange={(event) => user.setDateOfBirth(event.target.value)}
          />
        </div>
        {/** Height */}
        <div className="input-container">
          <label htmlFor="height">Height (cm)</label>
          <input
            id="height"
            className="basic"
            type="text"
            value={user.height}
            onChange={(event) => user.setHeight(event.target.value)}
          />
        </div>

        <button
          className="register"
          onClick={async () => {
            await user.createUser(userId)
          }}
        >
          Register
        </button>
      </div>

      <Footer />
    </>
  )
}

const StyledComponent = styled(Component)`
  padding: 74px 20px 40px;

  > .input-container {
    position: relative;
    margin-top: 14px;
    font-size: 16px;
    font-weight: 600;

    &:first-child {
      margin-top: 0;
    }

    > .basic {
      margin-top: 2px;
      padding: 12px;
      width: 100%;
      border-radius: 10px;
      border: 1px solid ${(props) => props.theme.darkGrey};

      // radio button - related
      > .radio-label {
        position: relative;
        padding:0 20px 0 30px;
      }

      > .radio-label:after,
        .radio-label:before {
        position: absolute;
        content: '';
        display: block;
        top: 50%;
      }

      > .radio-label:after {
        left: 12px;
        transform: translateY(-50%) translateX(-50%);
        width: 16px;
        height: 16px;
        border: 2px solid ${(props) => props.theme.gray};
        border-radius: 50%;
        opacity: 1;
        transition: opacity 0.4s ease-out;
      }

      > .radio-label:before {
        left: 7px;
        margin-top: -5px;
        width: 10px;
        height: 10px;
        background: ${(props) => props.theme.green};
        border-radius: 50%;
        opacity: 0;
      }

      input[type=radio]:checked + .radio-label:before {
        opacity: 1;
      }
      .radio-label:hover:after {
        opacity: 0.6;
        transition: opacity 0.4s ease-out;
      }
    }
  }

  > .register {
    display: inline-block;
    position: relative;
    margin-top: 40px;
    width: 100%;
    height: 56px;
    text-align: center;
    font-weight: bold;
    color: ${(props) => props.theme.white};
    background: ${(props) => props.theme.green};
    border: 1px solid ${(props) => props.theme.green};
    border-radius: 20px;
    cursor: pointer;
    opacity: 1;
    transition: opacity 0.4s ease-out;

    &:hover {
      opacity: 0.6;
      transition: opacity 0.4s ease-out;
    }

    &::before {
      content: '';
      position: absolute;
      top: -4px;
      bottom: -4px;
      left: -4px;
      right: -4px;
      border: solid 1px ${(props) => props.theme.green};
      border-radius: 22px;
      z-index: -1;
    }
  }
`

export const SpProfileScreen = (props: Props): JSX.Element => {
  return <StyledComponent {...props} />
}
