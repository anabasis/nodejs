import { useQuery } from '@tanstack/react-query'
import { getQnaHome } from '@api/home'
import { QnaAdminListReturnType } from '@type/qna'

export const useHomeQuery = ({ params, currentPage }) => {
  const { data: qnaHomeList, isSuccess } = useQuery<QnaAdminListReturnType>(['qnaHomeList', currentPage], () => getQnaHome({ params, currentPage }))

  return {
    qnaHomeList,
    isSuccess,
  }
}
