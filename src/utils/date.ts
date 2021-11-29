/**
 * Date-related utils
 */

 import dayjs from 'dayjs'
 import ca from 'dayjs/locale/ca'
 dayjs.locale(ca)

/** e.g. 2020-01-01 */
const yyyyMMDD = 'YYYY-MM-DD'

export const today = (): string => dayjs().format(yyyyMMDD)

export const getFormattedDate = (
  input: string,
  format: string = yyyyMMDD
): string => dayjs(input).format(format)

export const getTheLastOneWeek = (): Array<string> => {
  return Array(7)
    .fill(null)
    .map((_, i) => dayjs().subtract(i, 'day').format(yyyyMMDD))
}

export const getSortTheLastOneWeek = (): Array<string> =>
  getTheLastOneWeek().sort()


export const getAge = (dateOfBirth: string): number => {
  const today = dayjs()
  const birthDate = dayjs(dateOfBirth)

  return today.diff(birthDate, 'year')
}
