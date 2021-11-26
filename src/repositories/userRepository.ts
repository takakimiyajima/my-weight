// import { mCMSClient } from "@/libs/client";
import axios from "@/libs/axios"
import {
  // mCMSResponse,
  // User,
  UserEntity,
  UserMapper
} from '@/entities'
import { PATH ,ENDPOINTS } from '@/constants'


export class UserRepository {
  /**
   * Get user profile
   * descending order by workOutDate
   * @param userId
   */
  // static fetchUser = async (userId: number): Promise<UserEntity | null> => {
  //   try {
  //     const res = await mCMSClient.get<mCMSResponse<User>>({
  //       endpoint: "user",
  //       queries: {
  //         filters: `userId[equals]${userId}`,
  //         limit: 1
  //       },
  //     })

  //     return res.totalCount > 0 ? UserMapper.getUserEntity(res.contents[0]) : null
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  static fetchUser = async (userId: number): Promise<UserEntity | null> => {
    try {
      const res = await axios.get(
        `${ENDPOINTS.user}`,
        { 
          params: {
            filters: `userId[equals]${userId}`,
            limit: 1
          }
        }
      )

      return res.data.totalCount > 0
        ? UserMapper.getUserEntity(res.data.contents[0])
        : null
    } catch (error) {
      console.error(error)
    }
  }

  static postUser = async (): Promise<null> => {
    try {
      return await axios.post(
        `${PATH}${ENDPOINTS.user}`,
        {
          "userId": "test22",
          "firstName": "複数行のテキストを入力\n複数行のテキストを入力",
          "lastName": "複数行のテキストを入力\n複数行のテキストを入力",
          "dateOfBirth": "2021-11-26T07:33:14.534Z",
          "gender": [
            "選択肢"
          ],
          "height": 123
        }
      )
    } catch (error) {
      console.error(error)
    }
  }
}
