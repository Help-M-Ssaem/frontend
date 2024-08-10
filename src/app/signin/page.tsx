'use client'

import Image from 'next/image'

const Signin = () => {
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
        />
        <Image
          src="/images/auth/kakao_btn.svg"
          alt="kako_btn"
          width={380}
          height={50}
          className="cursor-pointer"
        />
      </div>
    </div>
  )
}

export default Signin
