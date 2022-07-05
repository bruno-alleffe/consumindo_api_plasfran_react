import axios from "axios"
import * as localstorage from './../utils/localstorage.js'

export const createConfig = () => {
    return {
      headers: {
        Authorization: `Bearer ${localstorage.getItem("token")}`,
      },
    };
  }

const api = axios.create({baseURL:"https://beta-api.plasfran.com/api", headers: localstorage.getItem("token") ? {Authorization:`Bearer ${localstorage.getItem("token")}`} : ''})

export default api