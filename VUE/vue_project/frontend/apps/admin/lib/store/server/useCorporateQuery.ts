import { deleteCorporate, getCorporateBoard, getCountryList, getUserList, modifyCorporate } from '@api/corporate'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useToastPopup } from 'library'
import { useRouter } from 'next/navigation'

import { CorporateReturnType, CountryList } from '@type/corporate/corporateType'

export const useCorporateCommon = () => {
  //국가 목록
  const { data: country } = useQuery<CountryList>(['country'], () => getCountryList())

  const countryList =
    Array.isArray(country) &&
    country.map((country) => ({
      value: country?.countryCd,
      name: country?.engCountryNm,
    }))

  //회원 목록
  const { data: userList } = useQuery<CountryList>(['userList'], () => getUserList())

  //Representative(Seegene)
  const managerUserId =
    Array.isArray(userList) &&
    userList
      .filter((user) => user.corporateLevelCode === 'LV1') //씨젠직원만 출력
      .filter((user) => user.userStatusCode === 'NRM') //정상 (탈퇴한씨젠회원 제외)
      .map((user, index) => ({
        label: `${user.fullName} ${user.organizationName}`,
        value: user.userUid,
      }))

  return { country, countryList, userList, managerUserId }
}

export const useCorporateList = ({ searchFilterParams, currentPage }) => {
  const { data: corporateList, isSuccess } = useQuery<CorporateReturnType>(['corporateList', searchFilterParams, currentPage], () =>
    getCorporateBoard({ searchFilterParams, currentPage })
  )
  return { corporateList, isSuccess }
}

export const useCorporateMutation = () => {
  const { toastOpen, getToastState } = useToastPopup()
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate: modifyCorporateMutation, isLoading: modifyCorporateIsLoading } = useMutation(modifyCorporate, {
    onSuccess: () => {
      queryClient.invalidateQueries(['corporateList'])
      toastOpen(getToastState({ content: 'Successfully saved.', icon: 'success' }))
      router.replace(`/corporate`)
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Save failed.', icon: 'warning' }))
    },
  })

  const { mutate: deleteCorporateMutation } = useMutation(deleteCorporate, {
    onSuccess: () => {
      queryClient.invalidateQueries(['corporateList'])
      toastOpen(getToastState({ content: 'Successfully deleted.', icon: 'success' }))
      router.replace('/corporate')
    },
    onError: () => {
      toastOpen(getToastState({ content: 'Delete failed.', icon: 'warning' }))
    },
  })
  return { modifyCorporateMutation, modifyCorporateIsLoading, deleteCorporateMutation }
}
