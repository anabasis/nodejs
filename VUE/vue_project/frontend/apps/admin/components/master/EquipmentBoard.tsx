import { useSearchFilter } from '@hook/useSearchFIlter'
import { useInstrumentList } from '@store/server/useMasterQuery'
import { EquipmentName, MasterDataList, MasterParamsType } from '@type/mater/masterDataType'
import { changeTimeLocal } from 'library'
import { useRouter } from 'next/navigation'
import { BoardTable, NoData, Pagenation } from 'ui'

const EquipmentBoard = () => {
  const router = useRouter()
  const { onPageChange, currentPage, searchFilterParams } = useSearchFilter<MasterParamsType>()
  const { instrumentList, isSuccess } = useInstrumentList({ searchFilterParams, currentPage })

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
            <th>Instrument Name</th>
            <th>Added Date</th>
            <th>Last Modified Date</th>
            <th>Uploader</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess && instrumentList?.content?.length === 0 ? (
            <tr className="nodata">
              <td colSpan={5}>
                <NoData text="  There is no registered master data." className="full" />
              </td>
            </tr>
          ) : (
            instrumentList?.content?.map((master: MasterDataList & EquipmentName, index: number) => {
              return (
                <tr
                  key={index}
                  onClick={() => {
                    router.push(`/master/detail?path=equipment&masterId=${master.id}`)
                  }}
                >
                  <td>{master.id}</td>
                  <td>{master.instrmNm}</td>
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
        totalPage={instrumentList?.totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
        pageSize={searchFilterParams?.size}
        totalCount={instrumentList?.totalElements}
      />
    </>
  )
}
export default EquipmentBoard
