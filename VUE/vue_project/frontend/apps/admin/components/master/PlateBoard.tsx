import { useSearchFilter } from '@hook/useSearchFIlter'
import { usePlateList } from '@store/server/useMasterQuery'
import { MasterDataList, MasterParamsType, PlateName } from '@type/mater/masterDataType'
import { changeTimeLocal } from 'library'
import { useRouter } from 'next/navigation'
import { BoardTable, NoData, Pagenation } from 'ui'

const PlateBoard = () => {
  const router = useRouter()
  const { onPageChange, currentPage, searchFilterParams } = useSearchFilter<MasterParamsType>()
  const { plateList, isSuccess } = usePlateList({ searchFilterParams, currentPage })

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
            <th>Plate Name</th>
            <th>Added Date</th>
            <th>Last Modified Date</th>
            <th>Uploader</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess && plateList?.content?.length === 0 ? (
            <tr className="nodata">
              <td colSpan={5}>
                <NoData text="There is no registered master data." className="full" />
              </td>
            </tr>
          ) : (
            plateList?.content.map((master: MasterDataList & PlateName, index: number) => {
              return (
                <tr key={index} onClick={() => router.push(`/master/detail?path=plate&masterId=${master.id}`)}>
                  <td>{master.id}</td>
                  <td>{master.plateName}</td>
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
        totalPage={plateList?.totalPages}
        onPageChange={onPageChange}
        pageSize={searchFilterParams?.size}
        totalCount={plateList?.totalElements}
      />
    </>
  )
}
export default PlateBoard
