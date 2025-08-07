import { addCommonCode, deleteCommonCode, getCommonCodeList, modifyCommonCode } from '@api/common-code'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CommonCodeReturnType } from '@type/common-code/commonCodeType'
import { useToastPopup } from 'library'
import { useRouter } from 'next/navigation'
export const useCommonCodeList = ({ searchFilterParams, currentPage }) => {
  const { data: commonCodeList, isSuccess } = useQuery<CommonCodeReturnType>(['commonCodeList', searchFilterParams, currentPage], () =>
    getCommonCodeList({ searchFilterParams, currentPage })
  )
  return { commonCodeList, isSuccess }
}

export const useCommonCodeMutation = () => {
  const { toastOpen, getToastState } = useToastPopup()
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate: addCommonCodeMutation, isLoading: addCommonCodeIsLoading } = useMutation(addCommonCode, {
    onSuccess: (res) => {
      if (res.data.statusCode === 202115) {
        toastOpen(getToastState({ content: 'Add failed.', icon: 'warning' }))
        return
      }
      queryClient.invalidateQueries(['commonCodeList'])
      toastOpen(getToastState({ content: 'Successfully added.', icon: 'success' }))
      router.push(`/common-code`)
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Add failed.', icon: 'warning' }))
    },
  })

  const { mutate: modifyCommonCodeMutation, isLoading: modifyCommonCodeIsLoading } = useMutation(modifyCommonCode, {
    onSuccess: () => {
      queryClient.invalidateQueries(['commonCodeList'])
      toastOpen(getToastState({ content: 'Successfully saved.', icon: 'success' }))
      router.replace(`/common-code`)
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Save failed.', icon: 'warning' }))
    },
  })

  const { mutate: deleteCommonCodeMutation } = useMutation(deleteCommonCode, {
    onSuccess: () => {
      queryClient.invalidateQueries(['commonCodeList'])
      toastOpen(getToastState({ content: 'Successfully deleted.', icon: 'success' }))
      router.replace('/common-code')
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Delete failed.', icon: 'warning' }))
    },
  })
  return { addCommonCodeMutation, addCommonCodeIsLoading, modifyCommonCodeMutation, modifyCommonCodeIsLoading, deleteCommonCodeMutation }
}
