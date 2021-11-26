// import { mCMSClient } from "@/libs/client"
import axios from "@/libs/axios"
import { PATH, ENDPOINTS } from '@/constants'
import {
  // mCMSResponse,
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
  // static fetchWeights = async (userId: string): Promise<Array<WeightEntity>> => {
  //   try {
  //     const res = await mCMSClient.get<mCMSResponse<Weight>>({
  //       endpoint: "weight",
  //       queries: {
  //         filters: `userId[equals]${userId}`,
  //         orders: `-workOutDate`
  //       },
  //     })

  //     return res.contents.map((weight) => WeightMapper.getWeightEntity(weight))
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  static fetchWeights = async (userId: string): Promise<Array<WeightEntity>> => {
    try {
      const res = await axios.get(
        `${PATH}${ENDPOINTS.weight}`,
        { params: { filters: `userId[equals]${userId}` }}
      )

      return res.data.contents.map((weight) => WeightMapper.getWeightEntity(weight))
    } catch (error) {
      console.error(error)
    }
  }
}
