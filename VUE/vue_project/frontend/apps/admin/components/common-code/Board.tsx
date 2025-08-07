import { useSearchFilter } from '@hook/useSearchFIlter'
import { useCommonCodeList } from '@store/server/useCommonCodeQuery'
import { CommonCode, CommonCodeParamsType } from 'lib/type/common-code/commonCodeType'
import { changeTimeLocal } from 'library/util'
import { useRouter } from 'next/navigation'
import { BoardTable, NoData, Pagenation } from 'ui'

const Board = () => {
  const router = useRouter()
  const { onPageChange, currentPage, searchFilterParams } = useSearchFilter<CommonCodeParamsType>()
  const { commonCodeList, isSuccess } = useCommonCodeList({ searchFilterParams, currentPage })

  return (
    <>
      <BoardTable>
        <colgroup>
          <col style={{ width: '15%' }} />
          <col style={{ width: '45%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: 'auto' }} />
        </colgroup>
        <thead>
          <tr id="tableHeader">
            <th>Code</th>
            <th>Code Group</th>
            <th>No. Of Items</th>
            <th>Date</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess && commonCodeList?.content?.length === 0 ? (
            <tr className="nodata">
              <td colSpan={5}>
                <NoData text="There are no registered standard code." className="full" />
              </td>
            </tr>
          ) : (
            commonCodeList?.content?.map((common: CommonCode, index: number) => {
              return (
                <tr key={index} onClick={() => router.push(`/common-code/detail?id=${common.codeGroupId}`)}>
                  <td>{common.codeGroupId}</td>
                  <td>{common.codeGroupName}</td>
                  <td>{common.codeCount}</td>
                  <td>{changeTimeLocal({ time: common.createDate, type: 'yyyy-MM-dd' })}</td>
                  <td>{changeTimeLocal({ time: common.modifyDate, type: 'yyyy-MM-dd' })}</td>
                </tr>
              )
            })
          )}
        </tbody>
      </BoardTable>
      <Pagenation
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPage={commonCodeList?.totalPages}
        pageSize={searchFilterParams?.size}
        totalCount={commonCodeList?.totalElements}
      />
    </>
  )
}
export default Board
