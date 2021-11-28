import axiosBase from 'axios'

/**
 * PickgoのRubyサーバと通信するためのaxiosインスタンス
 */
const axios = axiosBase.create({
  headers: {
    /** FIXME: fix token for POST */
    'X-MICROCMS-API-KEY': process.env.API_KEY ?? '879978592c79415e8d7c161468cbd5767909',
    'Content-Type': 'application/json'
   }
})

export default axios
