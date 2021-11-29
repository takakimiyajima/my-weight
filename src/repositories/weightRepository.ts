import axios from "@/libs/axios"
import { PATH, ENDPOINTS } from '@/constants'
import {
  // Weight,
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
        `${PATH}${ENDPOINTS.weight}`,
        { params: { filters: `userId[equals]${userId}` }}
      )

      console.log('res')
      console.log(res.data.contents)
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
   static createWeight = async (weight: BaseWeight): Promise<null> => {
    try {
      return await axios.post(
        `${PATH}${ENDPOINTS.weight}`,
        {
          userId: weight.userId,
          weight: weight.weight,
          workOutDate: weight.workOutDate
        }
      )
    } catch (error) {
      console.error(error)
    }
  }

  /**
   * Update weight
   * @param weight
   */
   static patchWeight = async (weight: updateWeight): Promise<null> => {
    try {
      return await axios.patch(
        `${PATH}${ENDPOINTS.weight}/${weight.contentId}`,
        {
          userId: weight.userId,
          weight: weight.weight,
          workOutDate: weight.workOutDate
        }
      )
    } catch (error) {
      console.error(error)
    }
  }
}
