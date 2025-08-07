import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getNotice, addNotice, deleteNotice, modifyNotice } from '@api/notice'
import { NoticeListReturnType } from '@type/notice'
import { useAlert, AlertType, useToastPopup } from 'library'
import { useRouter } from 'next/navigation'
export const useNoticeQuery = ({ searchFilterParams, currentPage }) => {
  const { data: noticeList, isSuccess } = useQuery<NoticeListReturnType>(['noticeList', searchFilterParams, currentPage], () =>
    getNotice({ searchFilterParams, currentPage })
  )

  return {
    noticeList,
    isSuccess,
  }
}

export const useNoticeMuate = () => {
  const { toastOpen, getToastState } = useToastPopup()

  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate: noticeAddMutate, isLoading: noticeAddLoading } = useMutation(addNotice, {
    onSuccess: () => {
      queryClient.invalidateQueries(['noticeList'])
      toastOpen(getToastState({ content: 'Successfully added.', icon: 'success' }))
      router.replace('/notice')
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Add failed.', icon: 'error' }))
    },
  })
  const { mutate: noticeEditMutate, isLoading: noticeEditLoading } = useMutation(modifyNotice, {
    onSuccess: () => {
      queryClient.invalidateQueries(['noticeList'])
      toastOpen(getToastState({ content: 'Successfully Saved.', icon: 'success' }))
      router.replace('/notice')
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Save failed.', icon: 'warning' }))
    },
  })
  const { mutate: noticeDeleteMutate } = useMutation(deleteNotice, {
    onSuccess: () => {
      queryClient.invalidateQueries(['noticeList'])
      toastOpen(getToastState({ content: 'Successfully deleted.', icon: 'success' }))
      router.replace('/notice')
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Delete failed.', icon: 'error' }))
    },
  })

  return { noticeAddMutate, noticeEditMutate, noticeDeleteMutate, noticeAddLoading, noticeEditLoading }
}
