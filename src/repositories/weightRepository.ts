import { API_ENDPOINT } from '@/constants'
import { WeightEntity, WeightMapper } from '@/entities'

const key = {
  headers: { 'X-API-KEY': process.env.API_KEY ?? '' }
}

export class WeightRepository {
  /** TODO: fetch using userID */
  static fetchWeights = async (): Promise<Array<WeightEntity>> => {
    try {
      const res = await fetch(API_ENDPOINT, key)
      const json = await res.json()

      const weightEntities = json.contents.map((weight) => WeightMapper.getWeightEntity(weight))

      return WeightMapper.sortWorkOutDate(weightEntities)
    } catch (error) {
      console.error(error)
    }
  }
}
