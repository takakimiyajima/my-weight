import { mCMSClient } from "@/libs/client";
import { mCMSResponse, User, UserEntity, UserMapper } from '@/entities'

export class UserRepository {
  /**
   * Get user profile
   * descending order by workOutDate
   * @param userId
   */
  static fetchUser = async (userId: number): Promise<UserEntity | null> => {
    try {
      const res = await mCMSClient.get<mCMSResponse<User>>({
        endpoint: "user",
        queries: {
          filters: `userId[equals]${userId}`,
          limit: 1
        },
      })

      return res.totalCount > 0 ? UserMapper.getUserEntity(res.contents[0]) : null
    } catch (error) {
      console.error(error)
    }
  }
}
