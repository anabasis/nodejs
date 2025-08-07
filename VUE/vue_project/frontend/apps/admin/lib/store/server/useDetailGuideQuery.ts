import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getDetailGuide, addDetailGuide, deleteDetailGuide, modifyDetailGuide } from '@api/detail-guide'
import { DetailGuideListReturnType } from '@type/detail-guilde'
import { useToastPopup } from 'library'
import { useRouter } from 'next/navigation'

export const useDetailGuideQuery = ({ searchFilterParams, currentPage }) => {
  const { data: detailGuideList, isSuccess } = useQuery<DetailGuideListReturnType>(['detailGuideList', searchFilterParams, currentPage], () =>
    getDetailGuide({ searchFilterParams, currentPage })
  )

  return {
    detailGuideList,
    isSuccess,
  }
}

export const useDetailGuideMuate = () => {
  const { toastOpen, getToastState } = useToastPopup()
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate: detailGuideAddMutate, isLoading: detailGuideAddLoading } = useMutation(addDetailGuide, {
    onSuccess: () => {
      queryClient.invalidateQueries(['detailGuideList'])
      toastOpen(getToastState({ content: 'Successfully added.', icon: 'success' }))
      router.push('/detail-guide')
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Add failed.', icon: 'error' }))
    },
  })
  const { mutate: detailGuideEditMutate, isLoading: detailGuideEditLoading } = useMutation(modifyDetailGuide, {
    onSuccess: () => {
      queryClient.invalidateQueries(['detailGuideList'])
      toastOpen(getToastState({ content: 'Successfully Saved.', icon: 'success' }))
      router.replace('/detail-guide')
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Save failed.', icon: 'warning' }))
    },
  })
  const { mutate: detailGuideDeleteMutate } = useMutation(deleteDetailGuide, {
    onSuccess: () => {
      queryClient.invalidateQueries(['detailGuideList'])
      toastOpen(getToastState({ content: 'Successfully deleted.', icon: 'success' }))
      router.replace('/detail-guide')
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Delete failed.', icon: 'error' }))
    },
  })
  return { detailGuideAddMutate, detailGuideEditMutate, detailGuideDeleteMutate, detailGuideAddLoading, detailGuideEditLoading }
}
