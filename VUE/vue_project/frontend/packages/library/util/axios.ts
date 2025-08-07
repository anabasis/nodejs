import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { getToken, isBrowser } from '.'

let isFetching = false
let fetchStack: Function[] = []
// const retryCount = 3

const pushFetchStack = (callback: Function) => fetchStack.push(callback)

const popFetchStack = (token: string) => fetchStack.forEach((callback) => callback(token))

// Request Interceptor
const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const { headers } = config
  let token = getToken()

  // 재요청 카운트 CORS애러로 안먹힘
  // if (headers?.retrycount && headers.retrycount < 1) {
  //   return false
  // } else {
  //   headers.retrycount = retryCount
  // }

  if (isBrowser && window?.authKc && !token) token = getToken(window.authKc.getToken() || null)
  if (!headers.Authorization && token) headers.Authorization = `Bearer ${token}`

  // Set Loading Start Here

  return config
}

// Response Interceptor
const onResponse = (response: AxiosResponse): AxiosResponse => {
  const { status } = response

  if (status !== 200) console.log('%c%s', 'color:tomato', `[CODE] ${status} ${response}`)

  // Set Loading End Here

  return response
}

// Auth Error Case
const onErrorAuth = (config: InternalAxiosRequestConfig) => {
  const originalRequest = config

  const checkUpdate = (isUpdate: boolean) => {
    if (isUpdate) {
      if (isFetching) {
        return new Promise((resolve) => {
          pushFetchStack((token: string) => {
            originalRequest.headers.Authorization = token
            resolve(axios.request(originalRequest))
          })
        })
      } else {
        isFetching = true

        const token = 'Bearer ' + getToken(window.authKc.getToken())

        // config.headers.retrycount--
        config.headers.Authorization = token
        popFetchStack(token)
        fetchStack = []
        isFetching = false

        return axios.request(config)
      }
    } else {
      delete config.headers.Authorization
      window.authKc.doLogout('/')
    }
  }
  window.authKc.updateToken(checkUpdate)
}

const onError = (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { message, config } = error
    const { method, url } = config as InternalAxiosRequestConfig
    const {
      status,
      data: { statusCode, message: errmsg },
    } = error.response ?? {}

    switch (status) {
      case 401: {
        if (isBrowser && window?.authKc) onErrorAuth(config as InternalAxiosRequestConfig)
        break
      }
      case 403: {
        if (isBrowser && window?.authKc) window.authKc.doLogout('/')
        break
      }
      // case 404: {
      //   alert(`[API] ${method?.toUpperCase()} ${url}\nError ${statusCode} ${errmsg}`)
      //   break
      // }
      // case 500: {
      //   alert(`[API] ${method?.toUpperCase()} ${url}\nError ${statusCode} ${errmsg}`)
      //   break
      // }
      default: {
        console.log('%c%s', 'color:tomato', `[API] ${method?.toUpperCase()} ${url} | Error ${status} ${message}`)
        break
      }
    }
  } else {
    console.log('%c%s', 'color:red', `[API] | Error ${error.message}`)
  }

  return Promise.reject(error)
}

const setupInterceptors = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.request.use(onRequest, onError)
  instance.interceptors.response.use(onResponse, onError)

  return instance
}

const api = axios.create({
  baseURL: process.env['NEXT_PUBLIC_URL_API_PLATFORM'],
  timeout: 1e4,
  // headers: {
  //   'accept-language': 'en',
  // },
})

const apiAdmin = axios.create({
  baseURL: process.env['NEXT_PUBLIC_URL_API_ADMIN'],
  timeout: 1e4,
})

const apiIsc = axios.create({
  baseURL: process.env['NEXT_PUBLIC_URL_API_INSILICO'],
  // timeout: 1e4,
})

const apiLab = axios.create({
  baseURL: `${process.env['NEXT_PUBLIC_URL_API_LABIDE']}/api`,
  timeout: 1e4,
})

setupInterceptors(api)
setupInterceptors(apiAdmin)
setupInterceptors(apiIsc)
setupInterceptors(apiLab)

export { api, apiAdmin, apiIsc, apiLab, axios }
