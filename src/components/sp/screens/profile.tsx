import React, { useState ,useContext } from 'react'
import styled from 'styled-components'
import { useSession } from 'next-auth/client'
import { useForm, FormProvider } from 'react-hook-form'
import { UserContext } from '@/contexts/user/userContext'
import { Header, Footer } from '@/components/sp/layouts'
import { BaseInput, BaseRadio, Radio } from '@/components/sp/atoms'

type FormState = {
  firstName: string
  lastName: string
  dateOfBirth: string
  height: string | number
}

export type ContainerProps = {
}

type Props = {
  className?: string
}

export const Component = ({ className }: Props): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)
  const user = useContext(UserContext)
  const [session] = useSession()
  const userId = String(session.userId)

  const methods = useForm<FormState>({
    mode: 'onChange',
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      dateOfBirth: user.dateOfBirth,
      height: user.height,
    },
  })

  /** When without error, execute */
  const registerUser = async () => {
    setIsLoading(true)

    user.existUser
      ? await user.updateUser(userId)
      : await user.createUser(userId)
    
    setIsLoading(false)
  }

  const genderList: Array<Radio> = [
    {
      label: 'Female',
      value: 'female',
    },
    {
      label: 'Male',
      value: 'male',
    },
  ]

  return (
    <>
      <Header />

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(registerUser)}>
          <div className={className}>
            {!user.existUser &&
              <div className="description">
                <p>Welcome to MY WEIGHT CHECKER</p>
                <p>Register your info</p>
              </div>
            }
            {/** First Name */}
            <div className="input-container">
              <label htmlFor="firstName">First Name</label>
              <BaseInput
                inputName="firstName"
                onBlurContext={user.setFirstName}
              />
            </div>
            {/** Last Name */}
            <div className="input-container">
              <label htmlFor="lastName">Last Name</label>
              <BaseInput
                inputName="lastName"
                onBlurContext={user.setLastName}
              />
            </div>
            {/** Gender */}
            <div className="input-container">
              <BaseRadio
                title="Gender"
                defaultValue={user.gender}
                radioList={genderList}
                disabled={user.existUser}
                onChangeContext={user.setGender}
              />
            </div>
            {/** Date Of Birth */}
            <div className="input-container">
              <label htmlFor="dateOfBirth">Date Of Birth</label>
              <BaseInput
                inputName="dateOfBirth"
                type="date"
                disabled={user.existUser}
                onBlurContext={user.setDateOfBirth}
              />
            </div>
            {/** Height */}
            <div className="input-container">
              <label htmlFor="height">Height (cm)</label>
              <BaseInput
                inputName="height"
                onBlurContext={user.setHeight}
              />
            </div>

            <button
              type="submit"
              className={`
                register
                ${isLoading && "--disabled"}
              `}
              disabled={isLoading}
            >
              Register
            </button>
          </div>
        </form>
      </FormProvider>

      <Footer />
    </>
  )
}

const StyledComponent = styled(Component)`
  padding: 74px 20px 40px;

  > .description {
    font-size: 16px;
    text-align: center;
    font-weight: 600;
    color: ${(props) => props.theme.green};
    margin-bottom: 30px;
  }

  .input-container {
    position: relative;
    margin-top: 14px;
    font-size: 16px;
    font-weight: 600;

    &:first-child {
      margin-top: 0;
    }
  }

  .register {
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

    &--disabled {
      opacity: 0.4;
    }

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
