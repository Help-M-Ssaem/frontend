'use client'

import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/react-editor'
import { useRef, useState } from 'react'
import Image from 'next/image'
import {
  usePostBoardImage,
  usePostBoard,
} from '@/service/board/useBoardService'
import { useRouter } from 'next/navigation'
import Button, { MBTI } from '@/components/common/Button'
import Container from '@/components/common/Container'
import { mbtiTypes } from '@/types/mbtiTypes'

const BoardCreatePage = () => {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mbti, setMbti] = useState<MBTI>('ISTJ')
  const [showDropdown, setShowDropdown] = useState(false)

  const [image, setImage] = useState<string[]>([]) // 업로드된 모든 이미지 리스트
  const [uploadImage, setUploadImage] = useState<string[]>([]) // 최종 업로드 이미지 리스트

  const { mutate: postBoard } = usePostBoard()
  const { mutate: postImage } = usePostBoardImage()

  const handleMbtiClick = () => {
    setShowDropdown(false)
  }

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }
  const editorRef = useRef<any>(null)
  const handleContentChange = () => {
    const contentHTML = editorRef.current.getInstance().getHTML()
    setContent(contentHTML)
    const extractedImageUrls = extractImageUrls(contentHTML)
    const filteredImageUrls = extractedImageUrls.filter(
      (url) => url !== null,
    ) as string[]
    setUploadImage(filteredImageUrls)
  }

  // 현재 글에 있는 이미지 url 추출
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

  const formData = new FormData()
  const data = {
    title,
    content,
    mbti,
  }
  formData.append(
    'postBoardReq',
    new Blob([JSON.stringify(data)], { type: 'application/json' }),
  )
  // 업로드된 모든 이미지 리스트
  formData.append(
    'image',
    new Blob([JSON.stringify(image)], { type: 'application/json' }),
  )
  // 최종 업로드 이미지 리스트
  formData.append(
    'uploadImage',
    new Blob([JSON.stringify(uploadImage)], { type: 'application/json' }),
  )

  const handleUploadImage = async (blob: Blob) => {
    const formImage = new FormData()
    formImage.append('image', blob)

    return new Promise<string>((resolve, reject) => {
      postImage(formImage, {
        onSuccess: (imgUrl) => {
          if (typeof imgUrl === 'string') {
            setImage((prev) => [...prev, imgUrl])
            resolve(imgUrl)
          } else {
            console.error('이미지 URL이 문자열이 아닙니다:', imgUrl)
            reject(new Error('이미지 URL이 문자열이 아닙니다.'))
          }
        },
        onError: (error) => {
          console.error('이미지 업로드 실패:', error)
          reject(error)
        },
      })
    })
  }

  const handleSubmit = () => {
    if (!title) {
      alert('제목을 입력해주세요.')
      return
    } else if (!content) {
      alert('내용을 입력해주세요.')
      return
    }
    postBoard(formData)
    router.back()
  }

  return (
    <div className="w-full-vw ml-half-vw px-4% py-8 sm:px-8% md:px-13% bg-main3">
      <Container color="white" className="bg-white p-10">
        <div className="flex items-center gap-3 mb-4 relative ">
          <div
            className="text-title1 font-bold text-maindark mr-2 cursor-pointer"
            onClick={handleMbtiClick}
          >
            {mbti} 게시판
          </div>
          {showDropdown && (
            <div className="absolute bg-white border border-gray4 rounded-3.75 p-5 mt-2 z-10 min-w-max">
              <div className="grid grid-cols-5 gap-4">
                {mbtiTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    className="text-gray2 text-footnote px-2"
                    onClick={() => setMbti(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          )}
          <Image
            src="/images/common/arrow_down.svg"
            width={12}
            height={9}
            alt="arrow_down"
          />
        </div>
        <div className="text-headline font-normal text-gray2 mb-5">
          제목을 입력해주세요.
        </div>
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          className="w-full h-10 border border-gray-300 rounded-md p-2 mb-4"
        />
        <div className="text-headline font-normal text-gray2 mb-5">
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
            addImageBlobHook: async (
              blob: Blob,
              callback: (url: string, alt: string) => void,
            ) => {
              const imgUrl = await handleUploadImage(blob)
              callback(imgUrl, 'image')
            },
          }}
        />
        <div className="flex gap-2.5 justify-end mt-4">
          <Button
            text="취소하기"
            color="PURPLE"
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

export default BoardCreatePage
