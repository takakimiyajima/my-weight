import { mCMSClient } from "@/libs/client";
import { mCMSResponse, Weight, WeightEntity, WeightMapper } from '@/entities'

export class WeightRepository {
  /**
   * Get weights belong user
   * descending order by workOutDate
   * @param userId
   */
  static fetchWeights = async (userId: string): Promise<Array<WeightEntity>> => {
    try {
      const res = await mCMSClient.get<mCMSResponse<Weight>>({
        endpoint: "weight",
        queries: {
          filters: `userId[equals]${userId}`,
          orders: `-workOutDate`
        },
      })

      return res.contents.map((weight) => WeightMapper.getWeightEntity(weight))
    } catch (error) {
      console.error(error)
    }
  }
}
