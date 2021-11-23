import { getAge, getFormattedDate } from '@/utils'

/** api type */
export type User = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  userId: string
  lastName: string
  firstName: string
  dateOfBirth: string
  gender: string
  height: number
}

/** entity type */
export type UserEntity = {
  id: string
  firstName: string
  lastName: string
  fullName: string
  gender: string
  dateOfBirth: string
  age: number
  height: number
}

/** Mapping weight entity */
export class UserMapper {
  static getUserEntity = (
    user: User
  ): UserEntity => {
    return {
      id: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: `${user.firstName} ${user.lastName}`,
      gender: user.gender,
      dateOfBirth: getFormattedDate(user.dateOfBirth),
      age: getAge(user.dateOfBirth),
      height: user.height
    }
  }
}
