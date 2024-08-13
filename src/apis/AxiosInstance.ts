import axios, { AxiosInstance } from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

class Service {
  protected http: AxiosInstance

  constructor() {
    this.http = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          typeof window !== 'undefined'
            ? `${localStorage.getItem('access_token')}`
            : '',
      },
    })

    if (typeof window !== 'undefined') {
      this.http.defaults.headers.common.Authorization = `${localStorage.getItem('access_token')}`
    }
  }
}

export default Service
