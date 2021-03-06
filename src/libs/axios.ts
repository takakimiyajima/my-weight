import axiosBase from 'axios'

const axios = axiosBase.create({
  baseURL: 'https://takakimiyajima.microcms.io/api/v1',
  headers: {
    'X-MICROCMS-API-KEY': process.env.API_KEY ?? process.env.API_KEY_FOR_BROWSER,
    'Content-Type': 'application/json'
   }
})

export default axios
