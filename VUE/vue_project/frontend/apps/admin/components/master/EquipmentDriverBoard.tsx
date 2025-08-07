import { useSearchFilter } from '@hook/useSearchFIlter'
import { useInstrumentDriverList } from '@store/server/useMasterQuery'
import { EquipmentDriverName, MasterDataList, MasterParamsType } from '@type/mater/masterDataType'
import { changeTimeLocal } from 'library'
import { useRouter } from 'next/navigation'
import { BoardTable, NoData, Pagenation } from 'ui'

const EquipmentDriverBoard = () => {
  const router = useRouter()
  const { onPageChange, currentPage, searchFilterParams } = useSearchFilter<MasterParamsType>()
  const { instrumentDriverList, isSuccess } = useInstrumentDriverList({ searchFilterParams, currentPage })

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
            <th>Instrument Driver Name</th>
            <th>Added Date</th>
            <th>Last Modified Date</th>
            <th>Uploader</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess && instrumentDriverList?.content?.length === 0 ? (
            <tr className="nodata">
              <td colSpan={5}>
                <NoData text="  There is no registered master data." className="full" />
              </td>
            </tr>
          ) : (
            instrumentDriverList?.content.map((master: MasterDataList & EquipmentDriverName, index: number) => {
              return (
                <tr
                  key={index}
                  onClick={() => {
                    router.push(`/master/detail?path=equipment-driver&masterId=${master.id}`)
                  }}
                >
                  <td>{master.id}</td>
                  <td>{master.instrmDrvNm}</td>
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
        totalPage={instrumentDriverList?.totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
        pageSize={searchFilterParams?.size}
        totalCount={instrumentDriverList?.totalElements}
      />
    </>
  )
}
export default EquipmentDriverBoard
