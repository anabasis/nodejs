import { useSearchFilter } from '@hook/useSearchFIlter'
import { useCapFilmList } from '@store/server/useMasterQuery'
import { CapFilmName, MasterDataList, MasterParamsType } from '@type/mater/masterDataType'
import { apiAdmin, changeTimeLocal } from 'library'
import { useRouter } from 'next/navigation'
import { BoardTable, NoData, Pagenation } from 'ui'

const CapFilmBoard = () => {
  const router = useRouter()
  const { onPageChange, currentPage, searchFilterParams } = useSearchFilter<MasterParamsType>()
  const { capFilmList, isSuccess } = useCapFilmList({ searchFilterParams, currentPage })

  return (
    <>
      <BoardTable>
        <colgroup>
          <col style={{ width: '10%' }} />
          <col style={{ width: 'auto' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '15%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>No.</th>
            <th>Cap/film Name</th>
            <th>Added Date</th>
            <th>Last Modified Date</th>
            <th>Uploader</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess && capFilmList?.content?.length === 0 ? (
            <tr className="nodata">
              <td colSpan={5}>
                <NoData text="  There is no registered master data." className="full" />
              </td>
            </tr>
          ) : (
            capFilmList?.content.map((master: MasterDataList & CapFilmName, index: number) => {
              return (
                <tr key={index} onClick={() => router.push(`/master/detail?path=cap-film&masterId=${master.id}`)}>
                  <td>{master.id}</td>
                  <td>{master.capFilmName}</td>
                  <td>{changeTimeLocal({ time: master.createDate, type: 'yyyy-MM-dd' })}</td>
                  <td>{changeTimeLocal({ time: master.lastUpdateDate, type: 'yyyy-MM-dd' })}</td>
                  <td>{master.memberName}</td>
                </tr>
              )
            })
          )}
        </tbody>
      </BoardTable>
      <Pagenation
        currentPage={currentPage}
        totalPage={capFilmList?.totalPages}
        onPageChange={onPageChange}
        pageSize={searchFilterParams?.size}
        totalCount={capFilmList?.totalElements}
      />
    </>
  )
}
export default CapFilmBoard
