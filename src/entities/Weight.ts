import { getFormattedDate } from '@/utils'

/** api type */
export type Weight = {
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
  weight: number
  /** NOTE: e.g. 2000-01-01T00:00:00.000Z */
  workOutDate: string
}

/** entity type */
export type WeightEntity = {
  contentId: string
  weight: number
  workOutDate: string
}

/** Mapping weight entity */
export class WeightMapper {
  static getWeightEntity = (
    weight: Weight
  ): WeightEntity => {
    return {
      contentId: weight.id,
      weight: weight.weight || null,
      workOutDate: getFormattedDate(weight.workOutDate) || ''
    }
  }
}
