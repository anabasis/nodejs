import { addModifyLicense, deleteLicense, getExistSystemCode, getLicenseDetail, getLicenseList } from '@api/license'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { LicenseFilterType, LicenseListType, LicenseType } from '@type/license/licenseType'

export const useLicenseListData = (filterInfo: LicenseFilterType, currentPage: number) => {
  return useQuery({
    queryKey: ['license', 'licenseList', `sDate${filterInfo.startDate}`, `eDate${filterInfo.endDate}`, `type${filterInfo.systemType}`, currentPage],
    queryFn: () => getLicenseList(filterInfo, currentPage),
    select: (result) => {
      return result.data
    },
  })
}

export const useExistSystemCodeData = () => {
  return useQuery({
    queryKey: ['license', 'existSystemCode'],
    queryFn: getExistSystemCode,
    select: (result) => {
      return result.data
    },
  })
}

export const useLicenseDetailData = (id) => {
  return useQuery({
    queryKey: ['license', 'licenseDetail', id],
    queryFn: () => getLicenseDetail(id),
    select: (result) => {
      return result.data
    },
  })
}

export const useAddLicenseMutation = () => {
  return useMutation({ mutationFn: addModifyLicense })
}

export const useDeleteLicenseMutation = () => {
  return useMutation({ mutationFn: deleteLicense })
}
