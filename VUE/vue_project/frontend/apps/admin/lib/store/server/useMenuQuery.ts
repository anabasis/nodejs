import { addMenu, deleteMenu, modifyMenu, modifyMenuArrangement } from '@api/menumanagement'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getFilteredLnbMenuList, getMenuDetail, getMenuManagementList } from '@util/menumanagement'
import { useMenu, useToastPopup } from 'library'
import { useRouter } from 'next/navigation'
import { currentTabSelectedAtom } from '@store/client/menu'
import { useSetAtom } from 'jotai'
export const useMenuListQuery = ({ isAdmin }: { isAdmin: boolean }) => {
  return useQuery({
    queryKey: ['menuList'],
    queryFn: () => getMenuManagementList(isAdmin),
    select: (result) => {
      return result
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  })
}

export const useFilterLnbListQuery = (isAdmin: boolean, roleNum: string) => {
  return useQuery({
    queryKey: ['lnbList', roleNum],
    queryFn: () => getFilteredLnbMenuList(isAdmin, roleNum),
    select: (result) => {
      return result
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  })
}

export const useMenuDetailQuery = (menuNum: number) => {
  return useQuery({
    queryKey: ['menuDetail', menuNum],
    queryFn: () => getMenuDetail(menuNum),
    select: (result) => {
      return result
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  })
}

export const useMenuMutate = (menuTypeFromPathname?: string, navigationLocation?: string) => {
  const router = useRouter()
  const setCurrentTab = useSetAtom(currentTabSelectedAtom)
  const { toastOpen, getToastState } = useToastPopup()
  const queryClient = useQueryClient()
  const { updateMenuAtom } = useMenu()

  const { mutate: addMenuMutate, isLoading: isAddLoading } = useMutation(addMenu, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuList'] })
      setCurrentTab(navigationLocation)
      toastOpen(getToastState({ content: 'Successfully added.', icon: 'success' }))
      setTimeout(updateMenuAtom, 400)
      router.push(`/menu/${menuTypeFromPathname}/`)
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Add failed.', icon: 'error' }))
    },
  })

  const { mutate: deleteMenuMutate } = useMutation(deleteMenu, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuList'] })
      toastOpen(getToastState({ content: 'Successfully deleted.', icon: 'success' }))
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Delete failed.', icon: 'error' }))
    },
  })

  const { mutate: modifyMenuArrangementMutate, isLoading: isArragementModifyLoading } = useMutation(modifyMenuArrangement, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuList'] })
      toastOpen(getToastState({ content: 'Successfully saved.', icon: 'success' }))
      setCurrentTab(navigationLocation.toUpperCase())
      router.push(`/menu/${menuTypeFromPathname}/`)
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Save failed.', icon: 'warning' }))
    },
  })

  const { mutate: modifyMenuMutate, isLoading: isModifyLoading } = useMutation(modifyMenu, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuList'] })
      queryClient.invalidateQueries({ queryKey: ['menuDetail'] })
      toastOpen(getToastState({ content: 'Successfully saved.', icon: 'success' }))
      setCurrentTab(navigationLocation)
      setTimeout(updateMenuAtom, 400)
      router.push(`/menu/${menuTypeFromPathname}/`)
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Save failed.', icon: 'warning' }))
    },
  })

  return { deleteMenuMutate, addMenuMutate, modifyMenuMutate, modifyMenuArrangementMutate, isAddLoading, isModifyLoading, isArragementModifyLoading }
}
