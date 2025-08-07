import { ResponseType, LicenseListType } from '@type/license/licenseType'
import { apiAdmin } from 'library/util'

export const getLicenseList = async (filterInfo, currentPage) => {
  const filter = Object.keys(filterInfo)
    .filter((key) => filterInfo[key] !== '' && filterInfo[key] !== 'all' && !['displayStartDate', 'displayEndDate'].includes(key))
    .map((key) => `${key}=${filterInfo[key]}`)
    .join('&')

  return await apiAdmin.get<ResponseType<LicenseListType>>(`/licence/list?${filter === '' ? '' : `${filter}&`}page=${currentPage}`)
}

export const getExistSystemCode = async () => {
  return await apiAdmin.get<string[]>(`/licence/existSystemCode`)
}

export const getLicenseDetail = async (id) => {
  return await apiAdmin.get(`/licence/${id}/detail`)
}

export const addModifyLicense = async (data) => {
  return Object.keys(data).includes('licenceNumber')
    ? await apiAdmin.post(`/licence/${data.licenceNumber}/modify`, { systemType: data.systemType, contents: data.contents })
    : await apiAdmin.post('/licence/add', { systemType: data.systemType, contents: data.contents })
}

export const deleteLicense = async (id) => {
  return apiAdmin.post(`/licence/${id}/delete`)
}
