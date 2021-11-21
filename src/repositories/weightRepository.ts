import { mCMSClient } from "@/libs/client";
import { WeightEntity, WeightMapper } from '@/entities'

export class WeightRepository {
  /** TODO: fetch using userID */
  static fetchWeights = async (userId: number): Promise<Array<WeightEntity>> => {
    try {
      const res = await mCMSClient.get({
        endpoint: "weight",
        queries: {
          filters: `userId[equals]${userId}`,
        },
      })

      const weightEntities = res.contents.map((weight) => WeightMapper.getWeightEntity(weight))

      return WeightMapper.sortWorkOutDate(weightEntities)
    } catch (error) {
      console.error(error)
    }
  }
}
