import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToastPopup } from 'library'
import {
  getAlgorithmCustomCodeList,
  getAlgorithmCustomCodeVer,
  getAlgorithmCustomCodeVers,
  addAlgoCustomVer,
  addAlgoCustom,
  deleteAlgorithmLibVer,
} from '@api/algorithm/custom-code'
import { AlogrithmCustomCodeListReturnType, AlgoCodeVerDetailType, AlgoCustomCodeDetailListReturnType } from '@type/algorithm/custom-code'
import { useRouter } from 'next/navigation'

export const useAlgoCustomCodeQuery = ({ searchFilterParams, currentPage }) => {
  const { data: algorithmCustomCodeList, isSuccess } = useQuery<AlogrithmCustomCodeListReturnType>(
    ['algorithmCustomCodeList', searchFilterParams, currentPage],
    () => getAlgorithmCustomCodeList({ searchFilterParams, currentPage })
  )

  return {
    algorithmCustomCodeList,
    isSuccess,
  }
}

export const useAlgoCustomCodeVerQuery = ({ PartialCodeId, currentPage }) => {
  const { data: algorithmCustomCodeVerList, isSuccess } = useQuery<AlgoCustomCodeDetailListReturnType>(
    ['algorithmCustomCodeVerList', PartialCodeId, currentPage],
    () => getAlgorithmCustomCodeVers({ PartialCodeId, currentPage })
  )

  return {
    algorithmCustomCodeVerList,
    isSuccess,
  }
}

export const useAlogoCodeMutate = (PartialCodeId?: string) => {
  const { getToastState, toastOpen } = useToastPopup()
  const queryClient = useQueryClient()
  const router = useRouter()
  const { mutate: algoCodeAdd, isLoading: algoCodeAddLoading } = useMutation(addAlgoCustom, {
    onSuccess: (data) => {
      if (data?.statusCode === 200) {
        toastOpen(getToastState({ content: 'Successfully added.', icon: 'success' }))
        router.push('/algorithm/custom-code')
        return
      }
      toastOpen(getToastState({ content: data?.description, icon: 'error' }))
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Add failed.', icon: 'error' }))
    },
  })

  const { mutate: addAlgoCustomVerMutate } = useMutation(addAlgoCustomVer, {
    onSuccess: (data) => {
      if (data?.statusCode === 200) {
        queryClient.invalidateQueries(['algorithmCustomCodeList'])
        toastOpen(getToastState({ content: 'Successfully added.', icon: 'success' }))
        router.push(`/algorithm/custom-code/detail?partialCodeId=${PartialCodeId}`)
        return
      }
      toastOpen(getToastState({ content: data?.description, icon: 'error' }))
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Add failed.', icon: 'error' }))
    },
  })

  const { mutate: algoCodeVerDelete } = useMutation(deleteAlgorithmLibVer, {
    onSuccess: (data) => {
      if (data?.statusCode === 200) {
        queryClient.invalidateQueries(['algorithmCustomCodeVerList'])
        toastOpen(getToastState({ content: 'Successfully deleted.', icon: 'success' }))
        PartialCodeId && router.push(`/algorithm/custom-code/detail?partialCodeId=${PartialCodeId}`)
        return
      }
      toastOpen(getToastState({ content: data?.description, icon: 'error' }))
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Delete failed.', icon: 'error' }))
    },
  })

  return { algoCodeAdd, addAlgoCustomVerMutate, algoCodeVerDelete, algoCodeAddLoading }
}
