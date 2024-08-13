import axios, { AxiosInstance } from 'axios'

class Service {
  protected http: AxiosInstance

  constructor(
    baseURL: string = process.env.NEXT_PUBLIC_API_BASE_URL as string,
  ) {
    this.http = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${localStorage.getItem('access_token')}`,
      },
    })
  }
}

export default Service
