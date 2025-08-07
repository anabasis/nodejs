'use client'

/**
 * 화면: 사용자 역할 - 리스트 부분
 */

import { corpLevelList, roleLevelList } from '@constant/selectList'
import { useRouter } from 'next/navigation'
import { BoardTable, NoData, Pagenation } from 'ui'
import { changeTimeLocal } from 'library'
import { UserRoleListType, UserRoleSearchParamType } from '@type/role/userRole'
import { useUserRoleList } from '@store/server/useUserRoleQuery'
import { useSearchFilter } from '@hook/useSearchFIlter'

interface userRoleBoardProps {
  corpLevel: string
  roleLevel: string
}

const UserRoleBoard = (props: userRoleBoardProps) => {
  const propParams = props
  const { currentPage, searchFilterParams, onPageChange } = useSearchFilter<UserRoleSearchParamType>()

  const { userRoleList, isSuccess } = useUserRoleList({ searchFilterParams, propParams, currentPage })

  const route = useRouter()

  return (
    <>
      <BoardTable>
        <colgroup>
          <col style={{ width: '14%' }} />
          <col style={{ width: '14%' }} />
          <col style={{ width: '32%' }} />
          <col style={{ width: '22%' }} />
          <col style={{ width: '16%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>Corporate Level</th>
            <th>Role Level</th>
            <th>Role Name</th>
            <th>Members</th>
            <th>Last Update Date</th>
          </tr>
        </thead>

        {/* 데이터 부분 */}
        <tbody>
          {isSuccess && userRoleList?.content?.length === 0 ? (
            <tr className="nodata">
              <td colSpan={5}>
                <NoData text="There are no registered user roles." className="full" />
              </td>
            </tr>
          ) : (
            userRoleList?.content?.map((item: UserRoleListType) => (
              <tr key={item.usrRolNumber} onClick={() => route.push(`detail/?num=${item.usrRolNumber}`)}>
                <td>{corpLevelList.find((level) => level.value === item.corpLvCode).name}</td>
                <td>{roleLevelList.find((level) => level.value === item.roleLvCode).name}</td>
                <td>{item.usrRolName}</td>
                <td>{`${item.usrCount} members`}</td>
                <td>{changeTimeLocal({ time: item.mdfDate, type: 'yyyy-MM-dd' })}</td>
              </tr>
            ))
          )}
        </tbody>
      </BoardTable>
      <Pagenation
        currentPage={currentPage}
        totalPage={userRoleList?.totalPages}
        onPageChange={onPageChange}
        pageSize={searchFilterParams?.size}
        totalCount={userRoleList?.totalElements}
      />
    </>
  )
}

export default UserRoleBoard
