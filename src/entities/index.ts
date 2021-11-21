/**
 * entry point for entities
 */

/** common response type from microCMS */
 export type mCMSResponse<T> = {
  contents: Array<T>,
  totalCount: number,
  offset: number,
  limit: number
}

export * from './User'
export * from './Weight'
