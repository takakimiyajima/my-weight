/**
 * Date-related utils
 */

import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(timezone)
dayjs.extend(utc)

/** 
 * Time zone
 */
/** Vancouver */
// const GMT_MINUS_8= 'America/Los_Angeles'

/** e.g. 2020-01-01 */
export const yyyyMMDD = 'YYYY-MM-DD'

export const today = () => dayjs()

/** Hour for locale */
export const currentlyHour = () => today().hour()

export const getFormattedDate = (
  input: string,
  format: string = yyyyMMDD
): string => dayjs.utc(input).format(format)

export const getTheLastOneWeek = (): Array<string> => {
  return Array(7)
    .fill(null)
    .map((_, i) => dayjs().subtract(i, 'day').format(yyyyMMDD))
}

export const getSortTheLastOneWeek = (): Array<string> =>
  getTheLastOneWeek().sort()

/** get user age */
export const getAge = (dateOfBirth: string): number => {
  const today = dayjs()
  const birthDate = dayjs(dateOfBirth)

  return today.diff(birthDate, 'year')
}
