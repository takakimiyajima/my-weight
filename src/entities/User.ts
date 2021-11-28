import { getAge, getFormattedDate } from '@/utils'

/** api type */
export type User = {
  contentId: string
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  userId: string
  lastName?: string
  firstName?: string
  dateOfBirth?: string
  gender?: Array<string>
  height?: number
}

/** entity type */
export type UserEntity = {
  contentId: string
  id: string
  firstName: string
  lastName: string
  fullName: string
  gender: string
  dateOfBirth: string
  age: number | null
  height: string
}

/** Mapping weight entity */
export class UserMapper {
  static getUserEntity = (
    user: User
  ): UserEntity => {
    return {
      contentId: user.id,
      id: user.userId,
      firstName: user?.firstName ?? '',
      lastName: user?.lastName ?? '',
      fullName: `${user?.firstName} ${user?.lastName}`,
      gender: user?.gender[0] ?? 'male',
      dateOfBirth: getFormattedDate(user?.dateOfBirth) ?? '',
      age: getAge(user?.dateOfBirth) ?? null,
      height: String(user?.height) ?? ''
    }
  }
}
