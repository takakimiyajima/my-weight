import axiosBase from 'axios'

/**
 * PickgoのRubyサーバと通信するためのaxiosインスタンス
 */
const axios = axiosBase.create({
  headers: { 'X-MICROCMS-API-KEY': process.env.API_KEY ?? '' }
})

export default axios
