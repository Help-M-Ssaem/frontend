'use client'

// eslint-disable-next-line import/no-extraneous-dependencies
import '@toast-ui/editor/dist/toastui-editor.css'
import { Editor } from '@toast-ui/react-editor'
import { useEffect, useRef, useState } from 'react'
import {
  usePostBoardImage,
  usePatchBoard,
  useBoardDetail,
} from '@/service/board/useBoardService'
import { useRouter, useParams } from 'next/navigation'
import Button from '@/components/common/Button'
import Container from '@/components/common/Container'
import MbtiSelect from '@/components/board/MbtiSelect'
import { useQueryClient } from '@tanstack/react-query'
import { queryKeys } from '@/service/board/BoardQueries'
import { MBTI } from '@/types/mbtiTypes'
import { useToast } from '@/hooks/useToast'

const BoardUpdatePage = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { id } = useParams()
  const boardId = Number(id)

  const editorRef = useRef<any>(null)
  const { showToast } = useToast()

  const [mbti, setMbti] = useState<MBTI | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [image, setImage] = useState<string[]>([])
  const [uploadImage, setUploadImage] = useState<string[]>([])
  const [initialContent, setInitialContent] = useState('')

  const { data: boardDetail } = useBoardDetail(boardId)
  const { mutate: updateBoard } = usePatchBoard()
  const { mutate: postBoardImage } = usePostBoardImage()

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
    if (boardDetail && editorRef.current) {
      setTitle(boardDetail.title)
      setContent(boardDetail.content)
      setMbti(boardDetail.boardMbti as MBTI)

      const extractedImageUrls = extractImageUrls(boardDetail.content)
      setImage(extractedImageUrls)

      setInitialContent(boardDetail.content)

      editorRef.current.getInstance().setHTML(boardDetail.content)
    }
  }, [boardDetail, editorRef])

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
      postBoardImage(formImage, {
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
    mbti,
  }
  formData.append(
    'patchBoardReq',
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
    updateBoard(
      { id: boardId, board: formData },
      {
        onSuccess: async () => {
          await queryClient.refetchQueries({
            queryKey: queryKeys.board(boardId),
          })
          router.push(`/board/${boardId}`)
        },
      },
    )
  }

  return (
    <div className="w-full-vw ml-half-vw px-4% py-8 sm:px-8% md:px-13% bg-main3">
      <Container color="white" className="bg-white p-10">
        <MbtiSelect mbti={mbti && mbti.toUpperCase()} setMbti={setMbti} />
        <div className="text-headline font-normal text-gray2 mb-5">
          제목을 입력해주세요.
        </div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full h-10 border border-gray-300 rounded-md p-2 mb-4 text-maindark"
        />
        <div className="text-headline font-normal text-gray2 mb-5">
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
          className="text-maindark"
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

export default BoardUpdatePage
