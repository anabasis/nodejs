import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getTermsList, getTermsAdd, deleteTerms, editTerms } from '@api/terms'
import { isEmptyCheck, useToastPopup } from 'library'
import { TermsListReturnType } from '@type/terms'
import { useRouter } from 'next/navigation'

export const useTermsListData = ({ searchFilterParams, currentPage }) => {
  const { data: termsList, isSuccess } = useQuery<TermsListReturnType>(['termsList', searchFilterParams, currentPage], () =>
    getTermsList({ searchFilterParams, currentPage })
  )

  return {
    termsList,
    isSuccess,
  }
}

export const useTermskMuate = () => {
  const { toastOpen, getToastState } = useToastPopup()
  const router = useRouter()

  const { mutate: termsAddMutate, isLoading: termsAddLoading } = useMutation(getTermsAdd, {
    onSuccess: (data) => {
      if (data?.statusCode === 202111) {
        toastOpen(getToastState({ content: 'Add failed.', icon: 'warning' }))
        return
      }
      toastOpen(getToastState({ content: 'Successfully added.', icon: 'success' }))
      router.replace(`/terms`)
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Add failed.', icon: 'warning' }))
    },
  })

  const { mutate: termsEditMutate, isLoading: termsEditLoading } = useMutation(editTerms, {
    onSuccess: (data) => {
      if (data?.statusCode === 202111) {
        toastOpen(getToastState({ content: 'Save failed.', icon: 'warning' }))
        return
      }
      toastOpen(getToastState({ content: 'Successfully saved.', icon: 'success' }))
      router.replace(`/terms`)
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Save failed.', icon: 'warning' }))
    },
  })

  const { mutate: termsDeleteMutate } = useMutation(deleteTerms, {
    onSuccess: () => {
      toastOpen(getToastState({ content: 'Delete Successfully.', icon: 'success' }))
      router.replace(`/terms`)
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Delete failed.', icon: 'warning' }))
    },
  })
  return { termsAddMutate, termsEditMutate, termsDeleteMutate, termsAddLoading, termsEditLoading }
}
