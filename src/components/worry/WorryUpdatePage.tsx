'use client'

// eslint-disable-next-line import/no-extraneous-dependencies
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/react-editor'
import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Button from '@/components/common/Button'
import Container from '@/components/common/Container'
import { useQueryClient } from '@tanstack/react-query'
import { MBTI } from '@/types/mbtiTypes'
import { useToast } from '@/hooks/useToast'
import {
  usePatchWorry,
  usePostWorryImage,
  useWorryDetail,
} from '@/service/worry/useWorryService'
import { queryKeys } from '@/service/worry/WorryQueries'
import Dropdown from '@/components/worry/Dropdown'

const WorryUpdatePage = () => {
  const { id } = useParams()
  const worryId = Number(id)
  const router = useRouter()
  const queryClient = useQueryClient()
  const editorRef = useRef<any>(null)
  const { showToast } = useToast()

  const { data: worryDetail } = useWorryDetail(worryId)
  const { mutate: patchWorry } = usePatchWorry()
  const { mutate: postWorryImage } = usePostWorryImage()

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [mbti, setMbti] = useState('')
  const [image, setImage] = useState<string[]>([])
  const [uploadImage, setUploadImage] = useState<string[]>([])
  const [initialContent, setInitialContent] = useState('')

  const [showDropdown, setShowDropdown] = useState(false)
  const handleMbtiClick = (type: string) => {
    setMbti(type)
    setShowDropdown(false)
  }

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

  useEffect(() => {
    if (worryDetail && editorRef.current) {
      setTitle(worryDetail.title)
      setContent(worryDetail.content)
      setMbti(worryDetail.targetMbti as MBTI)

      const extractedImageUrls = extractImageUrls(worryDetail.content)
      setImage(extractedImageUrls)

      setInitialContent(worryDetail.content)

      editorRef.current.getInstance().setHTML(worryDetail.content)
    }
  }, [worryDetail, editorRef])

  useEffect(() => {
    const extractedImageUrls = extractImageUrls(content)
    const filteredImageUrls = extractedImageUrls.filter(
      (url) => url !== null,
    ) as string[]
    setUploadImage(filteredImageUrls)
  }, [content])

  const handleContentChange = () => {
    const updatedContent = editorRef.current?.getInstance().getHTML() || ''
    setContent(updatedContent)
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

  const handleSubmit = () => {
    if (!title) {
      showToast('제목을 입력해주세요.')
      return
    } else if (!content) {
      showToast('내용을 입력해주세요.')
      return
    }

    const formData = new FormData()
    const data = {
      title,
      content,
      targetMbti: mbti,
    }
    formData.append(
      'patchWorryReq',
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

    patchWorry(
      {
        id: worryId,
        worry: formData,
      },
      {
        onSuccess: async () => {
          await queryClient.refetchQueries({
            queryKey: queryKeys.worry(worryId),
          })
          router.push(`/worry/${worryId}`)
        },
      },
    )
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
          className="w-full h-10 border border-gray-300 rounded-md p-2 mb-4 text-maindark"
        />

        <div className="text-headline font-normal text-gray2 mb-2">
          내용을 입력해주세요.
        </div>
        <Editor
          ref={editorRef}
          initialValue={initialContent}
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
            text="수정하기"
            color="PURPLE"
            size="small"
            onClick={handleSubmit}
          />
        </div>
      </Container>
    </div>
  )
}

export default WorryUpdatePage
