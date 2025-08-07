import { addNotification, deleteNotification, getNotificationList, modifyNotification } from '@api/notification'
import { newListAtom } from '@store/client/notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { DetailGuideListReturnType } from '@type/detail-guilde'
import { NotificationReturnType } from '@type/notification/notificationType'
import { useSetAtom } from 'jotai'
import { useModal, useToastPopup } from 'library'
import { useRouter } from 'next/navigation'

export const useNotificationList = ({ searchFilterParams, currentPage }) => {
  const {
    data: notificationList,
    isSuccess,
    refetch,
  } = useQuery<NotificationReturnType>(['notificationList', searchFilterParams, currentPage], () => getNotificationList({ searchFilterParams, currentPage }))

  return {
    notificationList,
    refetch,
    isSuccess,
  }
}

export const useNotificationMutation = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { toastOpen, getToastState } = useToastPopup()
  const { modalClose } = useModal()

  const setList = useSetAtom(newListAtom)

  const { mutate: addNotificationMutate, isLoading: addNotificationIsLoading } = useMutation(addNotification, {
    onSuccess: () => {
      queryClient.invalidateQueries(['notificationList'])
      toastOpen(getToastState({ content: 'Successfully added.', icon: 'success' }))
      modalClose()
      router.push('/notification')
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Add failed.', icon: 'warning' }))
    },
  })

  const { mutate: modifyNotificationMutate, isLoading: modifyNotificationIsLoading } = useMutation(modifyNotification, {
    onSuccess: () => {
      queryClient.invalidateQueries(['notificationList'])
      toastOpen(getToastState({ content: 'Successfully saved.', icon: 'success' }))
      router.replace(`/notification`)
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Save failed.', icon: 'warning' }))
      setList([])
    },
  })

  const { mutate: deleteNotificationMutate } = useMutation(deleteNotification, {
    onSuccess: () => {
      queryClient.invalidateQueries(['notificationList'])
      toastOpen(getToastState({ content: 'Successfully deleted.', icon: 'success' }))
      router.replace(`/notification`)
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Delete failed.', icon: 'warning' }))
      router.replace(`/notification`)
    },
  })
  return { addNotificationMutate, addNotificationIsLoading, modifyNotificationMutate, modifyNotificationIsLoading, deleteNotificationMutate }
}
