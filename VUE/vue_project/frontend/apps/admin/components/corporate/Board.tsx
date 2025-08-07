import { useSearchFilter } from '@hook/useSearchFIlter'
import { useCorporateList } from '@store/server/useCorporateQuery'
import { corporateLevelState } from 'lib/constant/corporateOption'
import { Corporate, CorporateParamsType } from 'lib/type/corporate/corporateType'
import { changeTimeLocal } from 'library'
import { useRouter } from 'next/navigation'
import { BoardTable, NoData, Pagenation } from 'ui'
import { LabelBadgeStatus } from 'ui/components'

const statusBadge = {
  'On contract': 'ongoing',
  '계약 진행 중': 'ongoing',
  Active: 'done',
  활성: 'done',
  Inactive: 'pause',
  비활성: 'pause',
}
const Board = () => {
  const router = useRouter()
  const { onPageChange, currentPage, searchFilterParams } = useSearchFilter<CorporateParamsType>()
  const { corporateList, isSuccess } = useCorporateList({ searchFilterParams, currentPage })

  return (
    <>
      <BoardTable>
        <thead>
          <tr>
            <th>No.</th>
            <th>Corporate Name</th>
            <th>Corporate Level</th>
            <th>Country</th>
            <th>Status</th>
            <th>Members</th>
            <th>Date Of Registration</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess && corporateList?.content?.length === 0 ? (
            <tr className="nodata">
              <td colSpan={7}>
                <NoData text="There are no registered corporates." className="full" />
              </td>
            </tr>
          ) : (
            corporateList?.content?.map((corp: Corporate, index: number) => {
              return (
                <tr key={index} onClick={() => router.push(`/corporate/detail?id=${corp.corporationNum}`)}>
                  <td>{corp.corporationNum}</td>
                  <td>{corp.corporationName}</td>
                  <td>{corporateLevelState[corp.corporateLevelCode]}</td>
                  <td>{corp.nation}</td>
                  <td>
                    <LabelBadgeStatus status={statusBadge[corp.corporateStatusCode]}>{corp.corporateStatusCode}</LabelBadgeStatus>
                  </td>
                  <td>{corp.memberCount} members</td>
                  <td>{changeTimeLocal({ time: corp.createDate, type: 'yyyy-MM-dd' })}</td>
                </tr>
              )
            })
          )}
        </tbody>
      </BoardTable>
      <Pagenation
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPage={corporateList?.totalPages}
        pageSize={searchFilterParams?.size}
        totalCount={corporateList?.totalElements}
      />
    </>
  )
}
export default Board
