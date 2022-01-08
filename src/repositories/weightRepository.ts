import axios from "@/libs/axios"
import { ENDPOINTS } from '@/constants'
import {
  WeightEntity,
  WeightMapper
} from '@/entities'

type BaseWeight = {
  userId: string
  weight: number
  workOutDate: string
}

type updateWeight = {
  contentId: string
} & BaseWeight

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
        { 
          params: {
            filters: `userId[equals]${userId}`,
            orders: '-workOutDate',
            limit: 7
          }
        }
      )
      // TODO: add type
      return res.data.contents.map((weight) => WeightMapper.getWeightEntity(weight))
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Create weight
   * @param weight
   */
   static createWeight = async (weight: BaseWeight) => {
    try {
      const res = await axios.post(
        `${ENDPOINTS.weight}`,
        {
          userId: weight.userId,
          weight: weight.weight,
          workOutDate: weight.workOutDate
        }
      )

      return [res.data.id, res.config.data]
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Update weight
   * @param weight
   */
   static patchWeight = async (weight: updateWeight) => {
    try {
      const res = await axios.patch(
        `${ENDPOINTS.weight}/${weight.contentId}`,
        {
          userId: weight.userId,
          weight: weight.weight,
          workOutDate: weight.workOutDate
        }
      )

      return [res.data.id, res.config.data]
    } catch (error) {
      console.error(error)
    }
  }
}
