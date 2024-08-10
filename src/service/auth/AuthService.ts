import axios, { AxiosInstance } from 'axios'
import { Signup } from '@/model/User'

class AuthService {
  private baseURL: string

  private http: AxiosInstance

  constructor() {
    this.baseURL = process.env.NEXT_PUBLIC_API_BASE_URL as string
    this.http = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  postSignup({ email, nickName, mbti, caseSensitivity }: Signup) {
    return this.http.post('/sign-up', {
      email,
      nickName,
      mbti,
      caseSensitivity,
    })
  }

  postNicknameDuplicationCheck(nickName: string) {
    return this.http.post('/nick-name', { nickName })
  }
}

export default new AuthService()
