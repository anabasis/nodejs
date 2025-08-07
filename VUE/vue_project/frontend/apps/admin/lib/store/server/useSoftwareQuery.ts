import { addSoftware, addVersion, deleteSoftware, deleteVersion, getSoftwareBoard, getSoftwareHistoryVersionBoard, modifySoftware } from '@api/software'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { SoftwareHistoryReturnType, SoftwareReturnType } from '@type/software/softwareType'
import { useAlert, useModal, useToastPopup } from 'library'
import { useRouter, useSearchParams } from 'next/navigation'

export const useSoftwareList = ({ searchFilterParams, currentPage }) => {
  const { data: softwareList, isSuccess } = useQuery<SoftwareReturnType>(['software', searchFilterParams, currentPage], () =>
    getSoftwareBoard({ searchFilterParams, currentPage })
  )
  return { softwareList, isSuccess }
}

export const useSoftwareVersionList = ({ currentPage, size, appsId }) => {
  const { data: history, isSuccess } = useQuery<SoftwareHistoryReturnType>(
    ['history', appsId, currentPage],
    () => getSoftwareHistoryVersionBoard({ currentPage, size, appsId }),
    {
      keepPreviousData: true,
    }
  )
  return { history, isSuccess }
}

export const useSoftwareMutation = () => {
  const { toastOpen, getToastState } = useToastPopup()
  const { alertClose } = useAlert()
  const { modalClose } = useModal()

  const router = useRouter()
  const appsId = useSearchParams().get('appsId')
  const queryClient = useQueryClient()

  //앱 추가
  const { mutate: addSoftwareMutation, isLoading: addSoftwareIsLoading } = useMutation(addSoftware, {
    onSuccess: () => {
      queryClient.invalidateQueries(['software'])
      toastOpen(getToastState({ content: 'Successfully added.', icon: 'success' }))
      router.replace(`/software`)
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Add failed.', icon: 'warning' }))
    },
  })

  //버전 추가
  const { mutate: addVersionMutation } = useMutation(addVersion, {
    onSuccess: () => {
      queryClient.invalidateQueries(['history'])
      modalClose()
      toastOpen(getToastState({ content: 'Successfully added.', icon: 'success' }))
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Add failed.', icon: 'warning' }))
    },
  })

  //앱 수정
  const { mutate: modifySoftwareMutation, isLoading: modifySoftwareIsLoading } = useMutation(modifySoftware, {
    onSuccess: () => {
      queryClient.invalidateQueries(['software'])
      toastOpen(getToastState({ content: 'Successfully saved.', icon: 'success' }))
      router.push(`/software/detail?appsId=${appsId}`)
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Save failed.', icon: 'warning' }))
    },
  })

  //앱 삭제
  const { mutate: deleteSoftwareMutation } = useMutation(deleteSoftware, {
    onSuccess: () => {
      queryClient.invalidateQueries(['software'])
      toastOpen(getToastState({ content: 'Successfully deleted.', icon: 'success' }))
      router.replace(`/software`)
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Delete failed.', icon: 'warning' }))
    },
  })

  //버전 삭제
  const { mutate: deleteVersionMutation } = useMutation(deleteVersion, {
    onSuccess: () => {
      queryClient.invalidateQueries(['history'])
      alertClose()
      toastOpen(getToastState({ content: 'Successfully deleted.', icon: 'success' }))
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Delete failed.', icon: 'warning' }))
    },
  })
  return {
    addSoftwareMutation,
    addSoftwareIsLoading,
    addVersionMutation,
    modifySoftwareMutation,
    modifySoftwareIsLoading,
    deleteVersionMutation,
    deleteSoftwareMutation,
  }
}
