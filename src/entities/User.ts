/** api type */
export type User = {
  id: string,
  createdAt: string,
  updatedAt: string,
  publishedAt: string,
  revisedAt: string,
  userId: string,
  lastName: string,
  firstName: string,
  age: number,
  height: number
}

/** entity type */
export type UserEntity = {
  id: string
  fullName: string
  age: number,
  height: number
}

/** Mapping weight entity */
export class UserMapper {
  static getUserEntity = (
    user: User
  ): UserEntity => {
    return {
      id: user.userId,
      fullName: `${user.firstName} ${user.lastName}`,
      age: user.age,
      height: user.height
    }
  }
}
