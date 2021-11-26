import axios from "@/libs/axios"
import { ENDPOINTS } from '@/constants'
import {
  // Weight,
  WeightEntity,
  WeightMapper
} from '@/entities'

export class WeightRepository {
  /**
   * Get weights belong user
   * descending order by workOutDate
   * @param userId
   */
  static fetchWeights = async (userId: string): Promise<Array<WeightEntity>> => {
    try {
      const res = await axios.get(
        `${ENDPOINTS.weight}`,
        { params: { filters: `userId[equals]${userId}` }}
      )

      return res.data.contents.map((weight) => WeightMapper.getWeightEntity(weight))
    } catch (error) {
      console.error(error)
    }
  }
}
