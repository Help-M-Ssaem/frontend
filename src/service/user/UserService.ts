import Service from '@/apis/AxiosInstance'
import { Profile, User } from '@/model/User'

class UserService extends Service {
  getTerms() {
    return this.http.get('/common/terms')
  }

  getProfile(id: number) {
    return this.http.get<Profile>(`/profile/${id}`)
  }

  getUserInfo() {
    return this.http.get<User>('/member/info')
  }

  patchProfile(profile: Profile) {
    return this.http.patch<Profile>('/profile', profile)
  }

  postProfileImg(profileImg: FormData) {
    return this.http.post('/member/profile/file', profileImg, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  deleteProfileImg() {
    return this.http.delete('/member/profile')
  }
}

export default new UserService()
