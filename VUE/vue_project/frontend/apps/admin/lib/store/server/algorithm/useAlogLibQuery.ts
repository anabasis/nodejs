import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  getAlgorithmLibList,
  addAlgorithmLib,
  deleteAlgorithmLibVer,
  getAlgorithmLibVerList,
  addAlgorithmLibVer,
  getAlgorithmLibVerLists,
} from '@api/algorithm/library'
import { AlogoLibDetailListReturnType, AlogrithmLibListReturnType } from '@type/algorithm/library'
import { useToastPopup } from 'library'
import { useRouter } from 'next/navigation'

export const useAlgoLibListData = ({ searchFilterParams, currentPage }) => {
  const { data: algorithmLibraryList, isSuccess } = useQuery<AlogrithmLibListReturnType>(['algorithmLibraryList', searchFilterParams, currentPage], () =>
    getAlgorithmLibList({ searchFilterParams, currentPage })
  )
  return {
    algorithmLibraryList,
    isSuccess,
  }
}

export const useAlgoLibVerListQuery = ({ libId, currentPage }) => {
  const { data: algorithmLibVerList, isSuccess } = useQuery<AlogoLibDetailListReturnType>(['algorithmLibVerList', libId, currentPage], () =>
    getAlgorithmLibVerLists({ libId, currentPage })
  )

  return {
    algorithmLibVerList,
    isSuccess,
  }
}

export const useAlogoMutate = (libId?: string) => {
  const queryClient = useQueryClient()
  const { getToastState, toastOpen } = useToastPopup()
  const router = useRouter()

  const { mutate: algohmLibAdd, isLoading: algoLibAddLoading } = useMutation(addAlgorithmLib, {
    onSuccess: (data) => {
      if (data?.statusCode === 200) {
        toastOpen(getToastState({ content: 'Successfully added.', icon: 'success' }))
        router.push('/algorithm/library-manage')
        return
      }

      toastOpen(getToastState({ content: data?.description, icon: 'error' }))
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Add failed.', icon: 'error' }))
    },
  })

  const { mutate: algohmLibVerAdd } = useMutation(addAlgorithmLibVer, {
    onSuccess: (data) => {
      if (data?.statusCode === 200) {
        queryClient.invalidateQueries(['algorithmLibVerList'])
        toastOpen(getToastState({ content: 'Successfully added.', icon: 'success' }))
        router.push(`/algorithm/library-manage/detail?libId=${libId}`)
        return
      }

      toastOpen(getToastState({ content: data?.description, icon: 'error' }))
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Add failed.', icon: 'error' }))
    },
  })

  const { mutate: algohmLibVerDelete } = useMutation(deleteAlgorithmLibVer, {
    onSuccess: (data) => {
      if (data?.statusCode === 200) {
        queryClient.invalidateQueries(['algorithmLibVerList'])
        toastOpen(getToastState({ content: 'Successfully deleted.', icon: 'success' }))
        libId && router.push(`/algorithm/library-manage/detail?libId=${libId}`)
        return
      }
      toastOpen(getToastState({ content: data?.description, icon: 'error' }))
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Delete failed.', icon: 'error' }))
    },
  })

  return { algohmLibAdd, algohmLibVerAdd, algohmLibVerDelete, algoLibAddLoading }
}
