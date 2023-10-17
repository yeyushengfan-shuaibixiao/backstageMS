import YeYuRequest from "./request"
import { BASE_URL, TIME_OUT } from "./config"
import { localCache } from "@/utils/cache"
import { LOGIN_TOKEN } from "@/global/constants"

const yeyuRequest = new YeYuRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  // 每一个请求都自动携带token
  interceptor: {
    onRequestSuccess(config) {
      const token = localCache.getCache(LOGIN_TOKEN)
      if (config.headers && token) {
        config.headers.Authorization = "Bearer " + token
      }

      return config
    }
  }
})

export { yeyuRequest }
