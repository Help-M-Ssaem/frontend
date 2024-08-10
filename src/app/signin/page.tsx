'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Signin = () => {
  const router = useRouter()
  const KAKAO_API_KEY = process.env.NEXT_PUBLIC_APP_KAKAO_API_KEY
  const KAKAO_REDIRECT_URI = process.env.NEXT_PUBLIC_APP_KAKAO_REDIRECT_URI
  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_APP_GOOGLE_API_KEY
  const GOOGLE_REDIRECT_URI = process.env.NEXT_PUBLIC_APP_GOOGLE_REDIRECT_URI

  const KakaoSigninBtnClick = () => {
    const URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code&prompt=login`
    router.push(URL)
  }

  const GoogleSigninBtnClick = () => {
    const URL = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_API_KEY}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`
    router.push(URL)
  }

  return (
    <div className="flex flex-col items-center my-18 w-full max-w-95 mx-auto gap-5">
      <Image
        src="/images/common/cat_logo.svg"
        alt="google_btn"
        width={83}
        height={73}
      />
      <div className="text-maindark text-title1 font-bold">
        로그인 / 회원가입
      </div>
      <div className="text-gray2 text-headline font-semibold">
        소셜 로그인로 가입할 수 있습니다.
      </div>
      <div className="h-[1px] bg-gray4 w-full" />
      <div className="flex flex-col gap-5">
        <Image
          src="/images/auth/google_btn.svg"
          alt="google_btn"
          width={380}
          height={50}
          className="cursor-pointer"
          onClick={GoogleSigninBtnClick}
        />
        <Image
          src="/images/auth/kakao_btn.svg"
          alt="kako_btn"
          width={380}
          height={50}
          className="cursor-pointer"
          onClick={KakaoSigninBtnClick}
        />
      </div>
    </div>
  )
}

export default Signin
