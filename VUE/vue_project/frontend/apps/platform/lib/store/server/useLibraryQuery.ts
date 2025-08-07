import { useQuery } from '@tanstack/react-query'
import { getLibrary, getLibraryManual } from '@api/library'
import { LibrarylListReturnType, LibraryManualListReturnType } from 'library/type/library'

export const useLibraryManualQuery = ({ currentPage }) => {
  const { data: libraryManual, isSuccess } = useQuery<LibraryManualListReturnType>(['libraryManual', currentPage], () => getLibraryManual({ currentPage }))

  return {
    libraryManual,
    isSuccess,
  }
}

export const useLibraryQuery = ({ searchFilterParams, currentPage }) => {
  const { data: libraryList, isSuccess } = useQuery<LibrarylListReturnType>(['libraryList', searchFilterParams, currentPage], () =>
    getLibrary({ searchFilterParams, currentPage })
  )

  return {
    libraryList,
    isSuccess,
  }
}
