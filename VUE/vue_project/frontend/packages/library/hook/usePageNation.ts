import { useState, useTransition } from 'react'

export const usePageNation = () => {
  const [_, startTransition] = useTransition()
  const [currentPage, setCurrentPage] = useState(0)

  const onPageChange = (page: number) => {
    startTransition(() => {
      setCurrentPage(page)
    })
  }

  return {
    onPageChange,
    currentPage,
  }
}
