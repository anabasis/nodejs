'use client'

import { BasicGuideCard } from '@components/library/BasicGuideCard'
import { useRouter } from 'next/navigation'
import { LibrarylListReturnType } from 'library/type/library'
type ListType = {
  id: number
  guideName: string
  keyword: string
  date: string
  update: string
}

function GuideCardList({ listData }: { listData: LibrarylListReturnType }) {
  const router = useRouter()
  // const moveListPage = (library) => router.push(getQueryRouter(library, ['id']))

  return <div className="align start"></div>
}

export default GuideCardList
