'use client'

/**
 * 화면: 사용자 역할
 */

import { ButtonMui, SelectChangeEvent, SelectMui, Breadcrumb, ContentBox, FilterItem, DateRangePicker } from 'ui'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import UserRoleBoard from '@components/role/user/UserRoleBoard'
import { UserRoleSearchParamType } from '@type/role/userRole'
import { useAtom } from 'jotai'
import { userRoleAddSuccessAtom, userRoleDeleteSuccessAtom, userRoleSaveSuccessAtom } from '@store/client/role'
import { useToastPopup, ToastType, useMenu } from 'library'
import { userRolePageTitle } from '@constant/pageTitleList'
import { corpLevelList, roleLevelList } from '@constant/selectList'
import { useSearchFilter } from '@hook/useSearchFIlter'

const initData = {
  size: 20,
}

const UserRole = () => {
  const route = useRouter()
  const [userRoleDeleteSuccess, isUserRoleDeleteSuccess] = useAtom(userRoleDeleteSuccessAtom) // 사용자 역할 삭제 성공 여부. 역할 상세 화면에 삭제 처리가 되므로 props drilling 방지 목적으로 jotai 사용
  const [userRoleAddSuccess, isUserRoleAddSuccess] = useAtom(userRoleAddSuccessAtom) // 사용자 역할 추가 성공 여부 - 추가 화면에서 추가 처리되므로 props drilling 방지
  const [userRoleSaveSuccess, isUserRoleSaveSuccess] = useAtom(userRoleSaveSuccessAtom) // 사용자 역할 수정 성공 여부 - 상세 화면에서 수정처리 되므로 props drilling 방지

  const [corpLevel, setCorpLevel] = useState('') // 기업 레벨
  const [roleLevel, setRoleLevel] = useState('') // 역할 레벨
  const [selectedRoleLevelList, setSelectedRoleLevelList] = useState([{ name: 'All', value: '' }, ...roleLevelList]) // 필터링 된 역할 레벨 리스트

  const { searchFilterParams, isParamsLoading, setChangeSearchParams, onResetFilter, resetSearcFilterParams } =
    useSearchFilter<UserRoleSearchParamType>(initData)

  const pathname = usePathname()
  const { getPathInfo } = useMenu()
  const { toastOpen } = useToastPopup()

  /**
   * handleCorpLevel: 검색 조건 기업레벨을 선택하면 동작하는 함수
   * - 기업레벨을 선택하면 그에 맞는 역할레벨을 조회 후 역할레벨 검색조건 리스트에 렌더링
   * - 해당 기업 레벨에 맞는 사용자 역할 조회 API 호출
   * - 기업레벨 검색 state에 저장
   * @param input : 기업레벨 값
   */
  const handleList = (input: string) => {
    setCorpLevel(input)
    if (input === 'LV1') {
      setSelectedRoleLevelList([{ name: 'Level A', value: 'A' }])
      setRoleLevel('A')
    } else if (input === 'LV2') {
      setSelectedRoleLevelList([{ name: 'Level B', value: 'B' }])
      setRoleLevel('B')
    } else {
      setSelectedRoleLevelList([{ name: 'All', value: '' }, ...roleLevelList])
      setRoleLevel('')
    }
  }

  /**
   * handleReset: reset 버튼 클릭 시 동작하는 함수
   * - 검색조건들을 모두 default 값으로 변경
   */
  const handleReset = () => {
    onResetFilter(initData)
    setSelectedRoleLevelList([{ name: 'All', value: '' }, ...roleLevelList])
    setCorpLevel('')
    setRoleLevel('')
  }

  /**
   * userRoleDeleteSuccessToast: 사용자 역할 삭제 성공 toast popup. 상세화면에서 삭제되면 이 화면으로 온다
   */
  const userRoleDeleteSuccessToast: ToastType = {
    icon: 'success',
    autoHideDuration: 3000,
    content: 'Successfully deleted.',
  }

  /**
   * UserRoleAddSuccess: 사용자 역할 추가 성공 toast popup
   */
  const UserRoleAddSuccessToast: ToastType = {
    icon: 'success',
    autoHideDuration: 3000,
    content: 'Successfully added.',
  }

  /**
   * UserRoleSaveSuccess: 사용자 역할 수정 성공 toast popup
   */
  const UserRoleSaveSuccessToast: ToastType = {
    icon: 'success',
    autoHideDuration: 3000,
    content: 'Successfully saved.',
  }

  // 사용자 역할이 삭제된 경우 toast popup 노출
  useEffect(() => {
    if (userRoleDeleteSuccess) {
      toastOpen(userRoleDeleteSuccessToast)
      isUserRoleDeleteSuccess(false)
    }
  }, [userRoleDeleteSuccess, isUserRoleDeleteSuccess])

  // 사용자 역할 등록 성공하면 토스트 팝업 제공
  useEffect(() => {
    if (userRoleAddSuccess) {
      toastOpen(UserRoleAddSuccessToast)
      isUserRoleAddSuccess(false)
    }
  }, [userRoleAddSuccess, isUserRoleAddSuccess])

  // 사용자 역할 수정 성공하면 토스트 팝업 제공
  useEffect(() => {
    if (userRoleSaveSuccess) {
      toastOpen(UserRoleSaveSuccessToast)
      isUserRoleSaveSuccess(false)
    }
  }, [userRoleSaveSuccess, isUserRoleSaveSuccess])

  useEffect(() => {
    return () => {
      resetSearcFilterParams()
    }
  }, [])

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={userRolePageTitle} />
            <h1 className="headline1">User Role</h1>
          </div>
          <div className="rgt">
            {/* Add 버튼 ->  클릭 시 사용자 역할 추가 페이지 이동 */}
            <ButtonMui
              icon="PlusIcon"
              type="contained"
              size="large"
              color="primary"
              disabled={getPathInfo(pathname).crtYn !== 'Y'}
              onClick={() => route.push('add')}
            >
              Add
            </ButtonMui>
          </div>
        </ContentBox>
      </div>

      <ContentBox>
        {/* 검색 부분 */}
        <div className="align">
          <div className="lft gap_10">
            <FilterItem label="Period">
              <DateRangePicker
                defaultDate={{ startDate: searchFilterParams?.displayStartDate, endDate: searchFilterParams?.displayEndDate }}
                onChangePickerDate={({ displayEndDate, displayStartDate, startDate, endDate }) =>
                  setChangeSearchParams({ startDate, endDate, displayEndDate, displayStartDate })
                }
              />
            </FilterItem>
            <FilterItem label="Corporate Level">
              <SelectMui
                size="medium"
                options={[{ name: 'All', value: '' }, ...corpLevelList]}
                value={corpLevel}
                onChange={(event: SelectChangeEvent<string>) => handleList(event.target.value)}
              />
            </FilterItem>
            <FilterItem label="Role Level">
              <SelectMui
                size="medium"
                options={selectedRoleLevelList}
                value={roleLevel}
                onChange={(event: SelectChangeEvent<string>) => setRoleLevel(event.target.value)}
              />
            </FilterItem>
            <ButtonMui
              size="xsmall"
              type="outlined"
              color="gray"
              uiType="reset_btn"
              icon="ResetIcon"
              iconStyle={{ width: 20, height: 20, fill: '#354165' }}
              onClick={() => handleReset()}
            />
          </div>
        </div>
        {/* 데이터 표시 부분 */}
        {!isParamsLoading && <UserRoleBoard corpLevel={corpLevel} roleLevel={roleLevel} />}
      </ContentBox>
    </>
  )
}

export default UserRole
