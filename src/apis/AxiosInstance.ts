import axios, { AxiosInstance } from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

class Service {
  protected http: AxiosInstance

  constructor() {
    this.http = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('access_token')}`,
      },
    })

    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token')
      if (token) {
        this.http.defaults.headers.common.Authorization = `${token}`
      }
    }
  }
}

export default Service
