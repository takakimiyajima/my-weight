/**
 * Validation-related
 */

 const VALIDATE_TYPE = {
  required: {
    value: true,
    message: 'This field is required',
  },
  minLength: {
    value: 6,
    message: 'Has to be longer than 6 characters',
  },
  maxLength: {
    value: 120,
    message: "Can't be longer than 120 characters",
  },
  min: {
    value: 1,
    message: "Can't be longer than 1",
  },
  max: {
    value: 300,
    message: "Can't be longer than 300",
  },
  weightPattern: {
    value: /^[+]?([1-9]\d*)$/,
    message: "Has to be more than 0",
  },
}

export const VALIDATE = [
  {
    name: 'firstName',
    handle: {
      required: VALIDATE_TYPE.required,
      minLength: VALIDATE_TYPE.minLength,
      maxLength: VALIDATE_TYPE.maxLength
    },
  },
  {
    name: 'lastName',
    handle: {
      required: VALIDATE_TYPE.required,
      minLength: VALIDATE_TYPE.minLength,
      maxLength: VALIDATE_TYPE.maxLength
    },
  },
  {
    name: 'dateOfBirth',
    handle: {
      required: VALIDATE_TYPE.required
    },
  },
  {
    name: 'height',
    handle: {
      required: VALIDATE_TYPE.required,
      min: VALIDATE_TYPE.min,
      max: VALIDATE_TYPE.max
    },
  },
  {
    name: 'weight',
    handle: {
      pattern: VALIDATE_TYPE.weightPattern
    },
  },
]