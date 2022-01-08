import axios from '@/libs/axios'
// import { AxiosResponse } from 'axios'
import {
  // User,
  UserEntity,
  UserMapper,
} from '@/entities'
import { ENDPOINTS } from '@/constants'

type BaseUser = {
  userId: string
  firstName: string
  lastName: string
  gender: string
  dateOfBirth: string
  height: string
}

type updateUser = {
  contentId: string
} & BaseUser

export class UserRepository {
  /**
   * Get user profile
   * descending order by workOutDate
   * @param userId
   */
  static fetchUser = async (userId: number): Promise<UserEntity | null> => {
    try {
      const res = await axios.get(`${ENDPOINTS.user}`, {
        params: {
          filters: `userId[equals]${userId}`,
          limit: 1,
        },
      })

      return res.data.totalCount > 0
        ? UserMapper.getUserEntity(res.data.contents[0])
        : null
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Create user
   * @param user: CreateUser
   */
  static createUser = async (user: BaseUser): Promise<null> => {
    const height = parseInt(user.height, 10)
    try {
      return await axios.post(
        `${ENDPOINTS.user}`,
        {
          userId: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          dateOfBirth: user.dateOfBirth,
          gender: [user.gender],
          height,
        }
      )
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  /**
   * Update user
   * @param user
   */
   static updateUser = async (user: updateUser): Promise<null> => {
    const height = parseInt(user.height, 10)
    try {
      return await axios.patch(`${ENDPOINTS.user}/${user.contentId}`, {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        dateOfBirth: user.dateOfBirth,
        gender: [user.gender],
        height,
      })
    } catch (error) {
      console.error(error)
      throw error
    }
  }
}
