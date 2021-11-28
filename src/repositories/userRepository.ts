import axios from '@/libs/axios'
// import { AxiosResponse } from 'axios'
import {
  // User,
  UserEntity,
  UserMapper,
} from '@/entities'
import { PATH, ENDPOINTS } from '@/constants'

type BaseUser = {
  userId: string
  firstName: string
  lastName: string
  gender: string
  dateOfBirth: string
  height: string
}

type PutUser = {
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
      const res = await axios.get(`${PATH}${ENDPOINTS.user}`, {
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
    console.log('userId')
    console.log(user.userId)
    const height = parseInt(user.height, 10)
    try {
      return await axios.post(`${PATH}${ENDPOINTS.user}`, {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        dateOfBirth: user.dateOfBirth,
        gender: [user.gender],
        height,
      })
    } catch (error) {
      console.error('error')
      console.error(error)
      throw error
    }
  }

  /**
   * Create user
   * @param user: CreateUser
   */
   static putUser = async (user: PutUser): Promise<null> => {
    const height = parseInt(user.height, 10)
    try {
      return await axios.patch(`${PATH}${ENDPOINTS.user}/${user.contentId}`, {
        userId: user.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        dateOfBirth: user.dateOfBirth,
        gender: [user.gender],
        height,
      })
    } catch (error) {
      console.error('error')
      console.error(error)
      throw error
    }
  }
}
