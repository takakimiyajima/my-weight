import React from 'react'
import styled from 'styled-components'

type Value = string | number

export type Radio = {
  label: string
  value: Value
}

type ContainerProps = {
  title: string
  defaultValue: Value
  radioList: Array<Radio>
  onChangeContext?: (value: string) => void
  disabled?: boolean
}

type Props = {
  className?: string
} & ContainerProps

const Component = ({
  className,
  title,
  defaultValue,
  radioList,
  onChangeContext,
  disabled = false,
}: Props): JSX.Element => {
  return (
    <div className={className}>
      <p>{title}</p>
      <div className={`
        basic
        ${disabled && "--disabled"}
      `}>
        {radioList.map(({ label, value }, index) => (
          <span key={`${label}-${value}-${index}`} className="radio-list">
            <input
              id={`${label}-${index}`}
              type="radio"
              value={value}
              checked={value === defaultValue}
              onChange={(event) => onChangeContext(event.target.value)}
            />
            <label className="radio-label" htmlFor={`${label}-${index}`}>{label}</label>
          </span>
        ))}
      </div>
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
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.3), 0 1px 1px rgba(0, 0, 0, 0.3);

    &.--disabled {
      background: ${(props) => props.theme.lightGrey};
    }

    > .radio-list {
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
`

export const BaseRadio = (props: Props): JSX.Element => {
  return <StyledComponent {...props} />
}
