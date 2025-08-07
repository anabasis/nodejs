import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useToastPopup } from 'library'
import { getAlgorithmPackList, postAlgorithmPack, deleteAlgorithmPack, putAlgorithmPack } from '@api/algorithm/pack'
import { AlogrithmPackListReturnType } from '@type/algorithm/pack'
import { useRouter } from 'next/navigation'

export const useAlgoPackData = ({ searchFilterParams, currentPage }) => {
  const { data: algorithmPackList, isSuccess } = useQuery<AlogrithmPackListReturnType>(['algorithmPackData', searchFilterParams, currentPage], () =>
    getAlgorithmPackList({ searchFilterParams, currentPage })
  )

  return {
    algorithmPackList,
    isSuccess,
  }
}
export const useAlogoPackMutate = (libId?: string) => {
  const queryClient = useQueryClient()
  const { getToastState, toastOpen } = useToastPopup()
  const router = useRouter()

  const { mutate: algohmPackAdd, isLoading: algoPackAddLoading } = useMutation(postAlgorithmPack, {
    onSuccess: (data) => {
      if (data?.statusCode === 200) {
        queryClient.invalidateQueries(['algorithmPackData'])
        toastOpen(getToastState({ content: 'Successfully added.', icon: 'success' }))
        router.push('/algorithm/algorithm-pack')
        return
      }
      toastOpen(getToastState({ content: data?.description, icon: 'error' }))
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Add failed.', icon: 'error' }))
    },
  })
  const { mutate: algohmPackPut, isLoading: algoPackEditLoading } = useMutation(putAlgorithmPack, {
    onSuccess: (data) => {
      if (data?.statusCode === 200) {
        queryClient.invalidateQueries(['algorithmPackData'])
        toastOpen(getToastState({ content: 'Successfully saved.', icon: 'success' }))
        router.push('/algorithm/algorithm-pack')
        return
      }
      toastOpen(getToastState({ content: data?.description, icon: 'error' }))
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Saved failed.', icon: 'error' }))
    },
  })

  const { mutate: algohmLibVerDelete } = useMutation(deleteAlgorithmPack, {
    onSuccess: (data) => {
      if (data?.statusCode === 200) {
        queryClient.invalidateQueries(['algorithmPackData'])
        toastOpen(getToastState({ content: 'Successfully deleted.', icon: 'success' }))
        router.push(`/algorithm/algorithm-pack`)
        return
      }
      toastOpen(getToastState({ content: data?.description, icon: 'error' }))
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Delete failed.', icon: 'error' }))
    },
  })

  return { algohmPackAdd, algohmLibVerDelete, algohmPackPut, algoPackAddLoading, algoPackEditLoading }
}
