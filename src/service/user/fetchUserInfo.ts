import UserService from '@/service/user/UserService'
import { User } from '@/model/User'

export const fetchUserInfo = async (): Promise<User | null> => {
  try {
    const response = await UserService.getUserInfo()
    return response.data
  } catch (error) {
    return null
  }
}
