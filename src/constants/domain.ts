/**
 * domain constants
 */

import { THEME } from './style'

export const BMI_CATEGORIES = {
  UNDERWEIGHT: {
    MIN: 0,
    MAX: 18.4,
    COLOR: THEME.red
  },
  NORMAL_WEIGHT: {
    MIN: 18.5,
    MAX: 24.9,
    COLOR: THEME.green
  },
  OVERWEIGHT: {
    MIN: 25,
    MAX: 29.9,
    COLOR: THEME.yellow
  },
  OBESITY: {
    MIN: 30,
    // NOTE: no suitable number 
    MAX: 100,
    COLOR: THEME.red
  },
}