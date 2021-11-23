import React, { useContext } from 'react'
import styled from 'styled-components'
import { UserContext } from '@/contexts/user/userContext'
import { Header, Footer } from '@/components/sp/layouts'

export type ContainerProps = {

}

type Props = {
  className?: string
}

export const Component = ({ className }: Props): JSX.Element => {
  const user = useContext(UserContext)

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
            value={user.firstName}
            onChange={event => user.setFirstName(event.target.value)}
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
            onChange={event => user.setLastName(event.target.value)}
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
              onChange={event => user.setGender(event.target.value)}
            />
            <label htmlFor="male">Male</label>
            <input
              id="female"
              className="female"
              name="gender"
              type="radio"
              value="female"
              onChange={event => user.setGender(event.target.value)}
            />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        {/** Date Of Birth */}
        <div className="input-container">
          <label htmlFor="dateOfBirth">Date Of Birth</label>
          <input
            id="dateOfBirth"
            className="basic"
            type="text"
            value={user.dateOfBirth}
            onChange={event => user.setDateOfBirth(event.target.value)}
          />
        </div>
        {/** Height */}
        <div className="input-container">
          <label htmlFor="height">Height</label>
          <input
            id="height"
            className="basic"
            type="text"
            value={user.height}
            onChange={event => user.setHeight(event.target.value)}
          />
        </div>
      </div>

      <Footer />
    </>
  )
}

const StyledComponent = styled(Component)`
  padding: 74px 20px 40px;
  
  > .input-container {
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

      // TODO: Radio個別のスタイルを充てる
      > .female {
        margin-left: 20px;
      }
    }
  }

`

export const SpProfileScreen = (props: Props): JSX.Element => {
  return <StyledComponent {...props} />;
};
