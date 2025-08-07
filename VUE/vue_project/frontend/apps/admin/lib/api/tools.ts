import { IToolPostFormat, IToolSearchParam } from '@type/tools/toolType'
import { apiAdmin } from 'library/util'

export const getToolList = async (filterData: IToolSearchParam) => {
  const { keyword, startDate, endDate, keywordTab } = filterData
  if (keyword.length == 0 && startDate.length == 0 && endDate.length == 0 && keywordTab.length == 0) {
    return await apiAdmin.get(`/tool-management/tool/list`)
  }
  return await apiAdmin.get(
    `/tool-management/tool/list?keyword=${encodeURIComponent(keyword)}&keywordTab=${keywordTab}&startDate=${startDate}&endDate=${endDate}`
  )
}

export const getToolDetail = async (id: string) => {
  if (!!id) {
    return await apiAdmin.get(`/tool-management/tool/${id}/detail`)
  } else {
    return null
  }
}

export const getCorporateList = async (keyword: string) => {
  const response = await apiAdmin.get(`/common/corporate/list?keyWord=${keyword}`)
  return response.data
}

export const addTool = async (newTool: IToolPostFormat) => {
  return await apiAdmin.post(`/tool-management/tool/add`, newTool)
}

export const modifyTool = async ({ modifiedTool, toolId }: { modifiedTool: IToolPostFormat; toolId: number }) => {
  return await apiAdmin.post(`/tool-management/tool/${toolId}/modify`, modifiedTool)
}

export const deleteTool = async (toolId: number) => {
  return await apiAdmin.post(`/tool-management/tool/${toolId}/delete`)
}

export const manageTool = async (changedTools: { toolNum: number; toolOrder: number }[]) => {
  return apiAdmin.post(`/tool-management/tool/modify/order`, { toolOrderDtoLists: changedTools })
}
