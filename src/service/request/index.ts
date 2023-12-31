import axios from "axios"
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"

interface yeyuRequestConfig extends AxiosRequestConfig {
  interceptor?: {
    onRequestSuccess?: (config: yeyuRequestConfig) => yeyuRequestConfig
    onRequestFailure?: (err: any) => void
    onResponseSuccess?: (config: yeyuRequestConfig) => yeyuRequestConfig
    onResponseFailure?: (err: any) => void
  }
}
class YeYuRequest {
  instance: AxiosInstance

  constructor(config: yeyuRequestConfig) {
    this.instance = axios.create(config)
    // 全局拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // console.log('全局请求成功拦截')
        return config
      },
      (err) => {
        console.log("请求失败拦截", err)
      }
    )
    this.instance.interceptors.response.use(
      (config) => {
        // console.log('全局响应成功拦截')
        return config
      },
      (err) => {
        console.log("响应失败拦截", err)
      }
    )
    // console.log(config);
    //针对单个实例
    if (config.interceptor) {
      this.instance.interceptors.request.use(
        (configs) => {
          if (config.interceptor?.onRequestSuccess) {
            config = config.interceptor?.onRequestSuccess(configs)
          }
          return configs
        },
        (err) => {
          if (config.interceptor?.onRequestFailure) {
            config.interceptor?.onRequestFailure(err)
          }
        }
      )
      this.instance.interceptors.response.use(
        (configs) => {
          if (config.interceptor?.onResponseSuccess) {
            config = config.interceptor?.onResponseSuccess(configs)
          }
          return configs
        },
        (err) => {
          if (config.interceptor?.onResponseFailure) {
            config.interceptor.onResponseFailure(err)
          }
        }
      )
    }
  }

  // 封装网络请求
  request(config: yeyuRequestConfig) {
    //单个请求拦截
    if (config.interceptor?.onRequestSuccess) {
      config = config.interceptor.onRequestSuccess(config)
    }
    return new Promise<AxiosResponse>((resolve, reject) => {
      this.instance
        .request(config)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }
  get(config: yeyuRequestConfig) {
    return this.request({ method: "get", ...config })
  }
  post(config: yeyuRequestConfig) {
    return this.request({ method: "post", ...config })
  }
  delete(config: yeyuRequestConfig) {
    return this.request({ method: "delete", ...config })
  }
  patch(config: yeyuRequestConfig) {
    return this.request({ method: "patch", ...config })
  }
}

export default YeYuRequest
