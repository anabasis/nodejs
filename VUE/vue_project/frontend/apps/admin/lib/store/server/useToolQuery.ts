import { getToolList, getToolDetail, getCorporateList, deleteTool, manageTool, modifyTool, addTool } from '@api/tools'
import { initialToolData } from '@constant/toolManagement'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { ITool, IToolSearchParam } from '@type/tools/toolType'
import { useToastPopup } from 'library'

export const useToolListQuery = (filterData?: IToolSearchParam) => {
  return useQuery({
    queryKey: ['filteredToolList', filterData],
    queryFn: () => getToolList(filterData),
    select: (result) => {
      return result.data
    },
    refetchOnWindowFocus: false,
    // refetchOnMount: true,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  })
}

export const useToolDetailQuery = (id: string) => {
  return useQuery({
    queryKey: ['toolDetail', id],
    queryFn: () => getToolDetail(id),
    select: (result) => {
      return result ? result.data : initialToolData
    },
    refetchOnWindowFocus: false,
    // refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  })
}

export const useCorporateListQuery = (keyword: string) => {
  return useQuery({
    queryKey: ['corporateList'],
    queryFn: () => getCorporateList(keyword),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
  })
}

export const useToolMutate = () => {
  const { toastOpen, getToastState } = useToastPopup()
  const queryClient = useQueryClient()

  const { mutate: deleteToolMutate } = useMutation(deleteTool, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['filteredToolList'] })
      toastOpen(getToastState({ content: 'Deleted Successfully.', icon: 'success' }))
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Delete failed.', icon: 'error' }))
    },
  })

  const { mutate: manageToolMutate, isLoading: isManageToolLoading } = useMutation(manageTool, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['filteredToolList'] })
      toastOpen(getToastState({ content: 'Successfully saved.', icon: 'success' }))
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Save failed.', icon: 'warning' }))
    },
  })

  const { mutate: editToolMutate, isLoading: isEditToolLoading } = useMutation(modifyTool, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['filteredToolList'] })
      toastOpen(getToastState({ content: 'Successfully saved.', icon: 'success' }))
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Save failed.', icon: 'warning' }))
    },
  })

  const { mutate: addToolMutate, isLoading: isAddToolLoading } = useMutation(addTool, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['filteredToolList'] })
      toastOpen(getToastState({ content: 'Successfully saved.', icon: 'success' }))
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Save failed.', icon: 'warning' }))
    },
  })
  return { deleteToolMutate, manageToolMutate, editToolMutate, addToolMutate, isAddToolLoading, isEditToolLoading, isManageToolLoading }
}
