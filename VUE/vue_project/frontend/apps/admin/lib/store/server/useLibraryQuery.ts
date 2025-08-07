import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getLibraryManuals,
  addLibraryManuals,
  editLibraryManualsList,
  modifyLibraryManuals,
  deleteLibraryManuals,
  getLibraryManualsList,
  addLibraryManualsList,
  deleteLibraryManualsList,
  modifyLibraryManualsList,
} from '@api/library'
import { LibraryManualReturnType, LibraryManualListReturnType } from '@type/library'
import { useToastPopup } from 'library'

export const useLibraryManualQuery = ({ currentPage }) => {
  const { data: libraryManualList, isSuccess } = useQuery<LibraryManualReturnType>(['libraryList', currentPage], () => getLibraryManuals({ currentPage }))

  return {
    libraryManualList,
    isSuccess,
  }
}

export const useLibraryManualListQuery = ({ searchFilterParams, currentPage }) => {
  const { data: libraryManualList, isSuccess } = useQuery<LibraryManualListReturnType>(['libraryManualList', currentPage, searchFilterParams], () =>
    getLibraryManualsList({ searchFilterParams, currentPage })
  )

  return {
    libraryManualList,
    isSuccess,
  }
}

export const useLibraryMuate = () => {
  const { toastOpen, getToastState } = useToastPopup()

  const queryClient = useQueryClient()

  const { mutate: libraryAddMutate } = useMutation(addLibraryManuals, {
    onSuccess: () => {
      queryClient.invalidateQueries(['libraryList'])
      toastOpen(getToastState({ content: 'Successfully added.', icon: 'success' }))
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Add failed.', icon: 'error' }))
    },
  })
  const { mutate: libraryEditMutate } = useMutation(modifyLibraryManuals, {
    onSuccess: () => {
      queryClient.invalidateQueries(['libraryList'])
      toastOpen(getToastState({ content: 'Successfully saved.', icon: 'success' }))
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Add failed.', icon: 'warning' }))
    },
  })
  const { mutate: libraryOrderMutate } = useMutation(editLibraryManualsList, {
    onSuccess: () => {
      queryClient.invalidateQueries(['libraryList'])
      toastOpen(getToastState({ content: 'Successfully saved.', icon: 'success' }))
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Save failed.', icon: 'warning' }))
    },
  })
  const { mutate: libraryDeleteMutate } = useMutation(deleteLibraryManuals, {
    onSuccess: () => {
      queryClient.invalidateQueries(['libraryList'])
      toastOpen(getToastState({ content: 'Delete Successfully.', icon: 'success' }))
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Delete failed.', icon: 'error' }))
    },
  })
  const { mutate: libraryManualsListAddMutate, isLoading: libraryAddLoading } = useMutation(addLibraryManualsList, {
    onError: () => {
      toastOpen(getToastState({ content: 'Add failed.', icon: 'error' }))
    },
  })

  const { mutate: libraryManualsListDeleteMutate } = useMutation(deleteLibraryManualsList, {
    onError: () => {
      toastOpen(getToastState({ content: 'Delete failed.', icon: 'error' }))
    },
  })

  const { mutate: libraryManualsListEditMutate, isLoading: libraryEditLoading } = useMutation(modifyLibraryManualsList, {
    onError: () => {
      toastOpen(getToastState({ content: 'Save failed.', icon: 'warning' }))
    },
  })

  return {
    libraryAddLoading,
    libraryEditLoading,
    libraryAddMutate,
    libraryEditMutate,
    libraryDeleteMutate,
    libraryOrderMutate,
    libraryManualsListAddMutate,
    libraryManualsListDeleteMutate,
    libraryManualsListEditMutate,
  }
}
