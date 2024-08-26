import Image from 'next/image'
import { useCategoryBookmark } from '@/service/board/useBoardService'
import { useRouter } from 'next/navigation'

interface BookmarkI {
  mbti: string[]
}

interface BookmarkProps {
  closeBookmarkPopup: () => void
}

const Bookmark = ({ closeBookmarkPopup }: BookmarkProps) => {
  const router = useRouter()
  const { data: bookmarks } = useCategoryBookmark()

  const handleBookmarkClick = (mbti: string) => {
    closeBookmarkPopup()
    router.push(`/board?mbti=${mbti}&page=1`)
  }

  return (
    <div className="bg-main3 rounded-3.75 shadow-lg w-full p-5">
      <h2 className="text-headline text-gray2 font-semibold mb-4">
        나의 즐겨찾기
      </h2>
      <ul className="flex flex-col gap-2.5">
        {bookmarks &&
          bookmarks.map((bookmark: BookmarkI, idx: number) => (
            <li key={idx}>
              <button
                type="button"
                className="w-full flex justify-between items-center bg-white p-3.5 rounded-3.75 shadow-md"
                onClick={() => handleBookmarkClick(bookmark.mbti[0])}
              >
                <span className="text-footnote text-gray2">
                  {bookmark.mbti[0]} 게시판
                </span>
                <Image
                  src="/images/board/star_fill.svg"
                  alt="star"
                  width={16}
                  height={16}
                />
              </button>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default Bookmark
