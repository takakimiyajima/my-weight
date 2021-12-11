import React from 'react'
import styled from 'styled-components'
import { useFormContext } from 'react-hook-form'
import { VALIDATE } from '@/constants'

export type ContainerProps = {
  inputName: string
  type?: string
  value?: string | number
  onBlurContext?: (value: string) => void
  disabled?: boolean
}

type Props = {
  className?: string
} & ContainerProps

export const Component = ({
  className,
  inputName,
  type = 'text',
  onBlurContext = () => {},
  disabled = false,
}: Props): JSX.Element => {
  const { register, formState: { errors }} = useFormContext()
  const errorMessage = errors[inputName]

  const validate = VALIDATE.find((v) =>
    v.name === inputName)?.handle ?? {}

  return (
    <div className={className}>
      <input
        name={inputName}
        className={`
          basic
          ${disabled && "--disabled"}
          ${!!errorMessage && "--error"}
        `}
        type={type}
        disabled={disabled}
        {...register(inputName, validate)}
        onBlur={event => onBlurContext(event.target.value)}
      />
      {errorMessage && (
        <span className="errorMessage">{errorMessage.message}</span>
      )}
    </div>
  )
}

const StyledComponent = styled(Component)`
  position: relative;
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

    &.--disabled {
      background: ${(props) => props.theme.lightGrey};
    }

    &.--error {
      border-color: ${(props) => props.theme.red};
    }
  }

  > .errorMessage {
    color: ${((props) => props.theme.red)};
  }
`

export const BaseInput = (props: Props): JSX.Element => {
  return <StyledComponent {...props} />
}
