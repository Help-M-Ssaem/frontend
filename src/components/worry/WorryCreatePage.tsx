'use client'

// eslint-disable-next-line import/no-extraneous-dependencies
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/react-editor'
import { useEffect, useRef, useState } from 'react'

import { useRouter } from 'next/navigation'
import Button from '@/components/common/Button'
import Container from '@/components/common/Container'
import { useQueryClient } from '@tanstack/react-query'
import { useUserInfo } from '@/service/user/useUserService'
import { MBTI } from '@/types/mbtiTypes'
import { useToast } from '@/hooks/useToast'
import {
  usePostWorry,
  usePostWorryImage,
} from '@/service/worry/useWorryService'
import { queryKeys } from '@/service/worry/WorryQueries'
import Dropdown from '@/components/worry/Dropdown'

const WorryCreatePage = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const editorRef = useRef<any>(null)
  const { showToast } = useToast()
  const { data: userInfo } = useUserInfo()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mbti, setMbti] = useState('')
  const [showDropdown, setShowDropdown] = useState(false)
  const handleMbtiClick = (type: string) => {
    setMbti(type)
    setShowDropdown(false)
  }

  useEffect(() => {
    if (userInfo && userInfo.mbti) {
      setMbti(userInfo.mbti.toUpperCase() as MBTI)
    }
  }, [userInfo])

  const [image, setImage] = useState<string[]>([]) // 업로드된 모든 이미지 리스트
  const [uploadImage, setUploadImage] = useState<string[]>([]) // 최종 업로드 이미지 리스트

  const { mutate: postWorry } = usePostWorry()
  const { mutate: postWorryImage } = usePostWorryImage()

  const extractImageUrls = (text: string) => {
    const imgTagRegex = /<img[^>]*src="([^"]+)"[^>]*>/g
    const matches = text.match(imgTagRegex)
    if (!matches) {
      return []
    }
    const imageUrls = matches.map((match) => {
      const srcMatch = match.match(/src="([^"]+)"/)
      return srcMatch ? srcMatch[1] : null
    })
    return imageUrls.filter((url) => url !== null)
  }

  const handleContentChange = () => {
    if (editorRef.current) {
      const contentHTML = editorRef.current.getInstance().getHTML()
      setContent(contentHTML)
      const extractedImageUrls = extractImageUrls(contentHTML)
      const filteredImageUrls = extractedImageUrls.filter(
        (url) => url !== null,
      ) as string[]
      setUploadImage(filteredImageUrls)
    }
  }
  const handleUploadImage = async (blob: Blob) => {
    const formImage = new FormData()
    formImage.append('image', blob)

    return new Promise<string>((resolve, reject) => {
      postWorryImage(formImage, {
        onSuccess: (imgUrl) => {
          resolve(imgUrl)
        },
        onError: (error) => {
          reject(error)
        },
      })
    })
  }
  const formData = new FormData()
  const data = {
    title,
    content,
    targetMbti: mbti,
  }
  formData.append(
    'postWorryReq',
    new Blob([JSON.stringify(data)], { type: 'application/json' }),
  )
  formData.append(
    'image',
    new Blob([JSON.stringify(image)], { type: 'application/json' }),
  )
  formData.append(
    'uploadImage',
    new Blob([JSON.stringify(uploadImage)], { type: 'application/json' }),
  )

  const handleSubmit = () => {
    if (!title) {
      showToast('제목을 입력해주세요.')
      return
    } else if (!content) {
      showToast('내용을 입력해주세요.')
      return
    }
    postWorry(formData, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: queryKeys.worryList })
        router.push(`/worry?waitingPage=1&solvedPage=1`)
      },
    })
  }

  return (
    <div className="w-full-vw ml-half-vw p-5% sm:px-8% sm:py-8 md:px-13% bg-main3">
      <Container color="white" className="bg-white p-10">
        <div className="text-maindark text-title1 font-bold mb-4">
          M쌤 매칭 고민글
        </div>
        <div className="text-headline font-normal text-gray2 mb-2">
          매칭을 원하는 M쌤 유형을 선택해주세요.
        </div>
        <div className="mb-4">
          <Dropdown
            selectedType={mbti}
            onSelectType={handleMbtiClick}
            showDropdown={showDropdown}
            onToggleDropdown={() => setShowDropdown(!showDropdown)}
          />
        </div>

        <div className="text-headline font-normal text-gray2 mb-2">
          제목을 입력해주세요.
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full h-10 border border-gray-300 rounded-md p-2 mb-4"
        />

        <div className="text-headline font-normal text-gray2 mb-2">
          내용을 입력해주세요.
        </div>
        <Editor
          ref={editorRef}
          initialValue=" "
          previewStyle="vertical"
          height="30rem"
          initialEditType="wysiwyg"
          onChange={handleContentChange}
          hooks={{
            addImageBlobHook: async (blob: Blob, callback: any) => {
              const imgUrl = await handleUploadImage(blob)
              setImage((prev: any) => [...prev, imgUrl])
              callback(imgUrl, 'image')
            },
          }}
        />

        <div className="flex gap-2.5 justify-end mt-4">
          <Button
            text="취소하기"
            color="LIGHTPURPLE"
            size="small"
            onClick={() => router.back()}
          />
          <Button
            text="글 쓰기"
            color="PURPLE"
            size="small"
            onClick={handleSubmit}
          />
        </div>
      </Container>
    </div>
  )
}

export default WorryCreatePage
