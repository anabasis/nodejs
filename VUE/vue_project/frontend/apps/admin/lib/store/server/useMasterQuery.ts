import {
  addMasterData,
  deleteMasterData,
  getCapFilmBoard,
  getInstrumentBoard,
  getInstrumentDriverBoard,
  getPlateBoard,
  getProductBoard,
  modifyMasterData,
} from '@api/master'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { CapFilmReturnType, EquipmentDriverReturnType, EquipmentReturnType, PlateReturnType, ProductReturnType } from '@type/mater/masterDataType'
import { useToastPopup } from 'library'
import { useRouter, useSearchParams } from 'next/navigation'
export const useProductList = ({ searchFilterParams, currentPage }) => {
  const { data: productList, isSuccess } = useQuery<ProductReturnType>(['product', searchFilterParams, currentPage], () =>
    getProductBoard({ searchFilterParams, currentPage })
  )
  return { productList, isSuccess }
}

export const useInstrumentList = ({ searchFilterParams, currentPage }) => {
  const { data: instrumentList, isSuccess } = useQuery<EquipmentReturnType>(['equipment', searchFilterParams, currentPage], () =>
    getInstrumentBoard({ searchFilterParams, currentPage })
  )
  return { instrumentList, isSuccess }
}

export const useInstrumentDriverList = ({ searchFilterParams, currentPage }) => {
  const { data: instrumentDriverList, isSuccess } = useQuery<EquipmentDriverReturnType>(['equipment-driver', searchFilterParams, currentPage], () =>
    getInstrumentDriverBoard({ searchFilterParams, currentPage })
  )
  return { instrumentDriverList, isSuccess }
}

export const useCapFilmList = ({ searchFilterParams, currentPage }) => {
  const { data: capFilmList, isSuccess } = useQuery<CapFilmReturnType>(['cap-film', searchFilterParams, currentPage], () =>
    getCapFilmBoard({ searchFilterParams, currentPage })
  )
  return { capFilmList, isSuccess }
}

export const usePlateList = ({ searchFilterParams, currentPage }) => {
  const { data: plateList, isSuccess } = useQuery<PlateReturnType>(['plate', searchFilterParams, currentPage], () =>
    getPlateBoard({ searchFilterParams, currentPage })
  )
  return { plateList, isSuccess }
}

export const useMasterMutation = () => {
  const { toastOpen, getToastState } = useToastPopup()
  const router = useRouter()
  const queryClient = useQueryClient()

  const search = useSearchParams()
  //   const masterId = search.get('masterId') //id(PK)
  const path = search.get('path')

  const { mutate: addMaster, isLoading: addMasterIsLoading } = useMutation(addMasterData, {
    onSuccess: () => {
      queryClient.invalidateQueries([`${path}`])
      toastOpen(getToastState({ content: 'Successfully added.', icon: 'success' }))
      router.push(`/master/${path}`)
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Add failed.', icon: 'warning' }))
    },
  })

  const { mutate: modifyMaster, isLoading: modifyMasterIsLoading } = useMutation(modifyMasterData, {
    onSuccess: () => {
      queryClient.invalidateQueries([`${path}`])
      toastOpen(getToastState({ content: 'Successfully saved.', icon: 'success' }))
      router.replace(`/master/${path}`)
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Save failed.', icon: 'warning' }))
    },
  })

  const { mutate: deleteMaster, isLoading: deleteMasterIsLoading } = useMutation(deleteMasterData, {
    onSuccess: () => {
      queryClient.invalidateQueries([`${path}`])
      toastOpen(getToastState({ content: 'Successfully deleted.', icon: 'success' }))
      router.replace(`/master/${path}`)
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Delete failed.', icon: 'warning' }))
    },
  })

  return { addMaster, addMasterIsLoading, modifyMaster, modifyMasterIsLoading, deleteMaster, deleteMasterIsLoading }
}
