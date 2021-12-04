import React from 'react'
import styled from 'styled-components'

export type ContainerProps = {
  id?: string
  type?: string
  value: string | number
  onChange: (value: string) => void
  disabled?: boolean
}

type Props = {
  className?: string
} & ContainerProps

export const Component = ({
  className,
  id,
  type = 'text',
  value,
  onChange,
  disabled = false,
}: Props): JSX.Element => {
  return (
    <div className={className}>
      <input
        id={id}
        className={`
          basic
          ${disabled && "disabled"}
        `}
        type={type}
        value={value}
        onChange={event => onChange(event.target.value)}
        disabled={disabled}
      />
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

    &.disabled {
      background: ${(props) => props.theme.lightGrey};
    }

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
`

export const BaseInput = (props: Props): JSX.Element => {
  return <StyledComponent {...props} />
}
