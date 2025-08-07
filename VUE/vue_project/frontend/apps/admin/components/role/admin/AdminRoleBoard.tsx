'use client'

/**
 * 화면: 어드민 역할 - 어드민 리스트
 */

import { useRouter } from 'next/navigation'
import { BoardTable, NoData, Pagenation } from 'ui'
import { changeTimeLocal } from 'library'
import { useAdminRoleList } from '@store/server/useAdminRoleQuery'
import { AdminRoleListType, AdminRoleSearchParamType } from '@type/role/adminRole'
import { useSearchFilter } from '@hook/useSearchFIlter'

const AdminRoleBoard = () => {
  const route = useRouter()

  const { searchFilterParams, currentPage, onPageChange } = useSearchFilter<AdminRoleSearchParamType>()

  const { adminRoleList, isSuccess } = useAdminRoleList({ searchFilterParams, currentPage })

  return (
    <>
      <BoardTable>
        <colgroup>
          <col style={{ width: '56%' }} />
          <col style={{ width: '26%' }} />
          <col style={{ width: '17%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>Role Name</th>
            <th>Members</th>
            <th>Last Update Date</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess && adminRoleList?.content?.length === 0 ? (
            <tr className="nodata">
              <td colSpan={3}>
                <NoData text="There are no registered admin roles." className="full" />
              </td>
            </tr>
          ) : (
            adminRoleList?.content?.map((item: AdminRoleListType, index: number) => (
              // 클릭하면 해당 어드민 역할의 상세 화면으로 이동
              <tr key={index} onClick={() => route.push(`detail/?num=${item.adminRoleNumber}`)}>
                <td>{item.adminRoleName}</td>
                <td>{`${item.adminRoleCount} members`}</td>
                <td>{changeTimeLocal({ time: item.modifyDate, type: 'yyyy-MM-dd' })}</td>
              </tr>
            ))
          )}
        </tbody>
      </BoardTable>
      <Pagenation
        pageSize={searchFilterParams?.size}
        totalPage={adminRoleList?.totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalCount={adminRoleList?.totalElements}
      />
    </>
  )
}

export default AdminRoleBoard
