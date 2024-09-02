import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

class Service {
  protected http: AxiosInstance

  constructor() {
    this.http = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    // 요청 인터셉터를 사용하여 매 요청마다 토큰을 동적으로 설정
    this.http.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('access_token')
        if (token && config.headers) {
          config.headers.set('Authorization', `${token}`)
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      },
    )
  }
}

export default Service
