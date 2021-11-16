import dayjs from 'dayjs';
import ca from 'dayjs/locale/ca'
dayjs.locale(ca)

/** api type */
type Weight = {
  id: string,
  createdAt: string,
  updatedAt: string,
  publishedAt: string,
  revisedAt: string,
  weight: number,
  workOutDate: string
}

/** entity type */
export type WeightEntity = {
  weight: number,
  workOutDate: string
}

/** Mapping weight entity */
export class WeightMapper {
  static getWeightEntity = (
    weight: Weight
  ): WeightEntity => {
    return {
      weight: weight.weight,
      workOutDate: dayjs(weight.workOutDate).format('YYYY-MM-DD'),
    }
  }

  /**
   * Sort descending order for array
   * @param weights 
   */
  static sortWorkOutDate = (
    weights: Array<WeightEntity>
  ): Array<WeightEntity> => {
    weights.sort((a, b) => a.workOutDate < b.workOutDate ? 1 : -1)
  
    return weights
  }
}