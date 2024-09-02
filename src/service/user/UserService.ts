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

  async fetchUserInfo() {
    return this.http.get('/member/info')
  }

  patchProfile(profile: any) {
    return this.http.patch('/member/profile', profile)
  }

  postProfileImg(profileImg: FormData) {
    return this.http
      .post('/member/profile/file', profileImg, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        return response.data
      })
  }

  deleteProfileImg() {
    return this.http.delete('/member/profile')
  }

  deleteProfileImgS3(imageUrl: string) {
    return this.http.post(`/member/s3/file?imageUrl=${imageUrl}`)
  }
}

export default new UserService()
