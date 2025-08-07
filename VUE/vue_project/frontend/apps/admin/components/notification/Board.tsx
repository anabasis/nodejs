import { useSearchFilter } from '@hook/useSearchFIlter'
import { isLoading } from '@store/client/notification'
import { useNotificationList } from '@store/server/useNotificationQuery'
import { NotificationContent, NotificationParamsType } from '@type/notification/notificationType'
import { useAtomValue } from 'jotai'
import { useRouter } from 'next/navigation'
import { BoardTable, NoData, Pagenation } from 'ui'

const Board = () => {
  const router = useRouter()
  // const isNotiLoading = useAtomValue(isLoading)
  const { onPageChange, currentPage, searchFilterParams } = useSearchFilter<NotificationParamsType>()
  const { notificationList, isSuccess } = useNotificationList({ searchFilterParams, currentPage })
  // useEffect(() => {
  //   if (!isNotiLoading) {
  //     refetch()
  //   }
  // }, [isNotiLoading])

  return (
    <>
      <BoardTable>
        <colgroup>
          <col style={{ width: '8%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '35%' }} />
          <col style={{ width: '20%' }} />
        </colgroup>
        <thead>
          <tr>
            <th>No.</th>
            <th>Code</th>
            <th>Title</th>
            <th>String</th>
            <th>Path Parameter</th>
          </tr>
        </thead>
        <tbody>
          {isSuccess && notificationList?.content?.length === 0 ? (
            <tr className="nodata">
              <td colSpan={5}>
                <NoData text="There are no registered notifications." className="full" />
              </td>
            </tr>
          ) : (
            notificationList?.content.map((noti: NotificationContent, index: number) => {
              return (
                <tr key={index} onClick={() => router.push(`/notification/detail?notiId=${noti.id}`)}>
                  <td>{noti.id}</td>
                  <td>{noti.notificationCode}</td>
                  <td>{noti.title}</td>
                  <td>{noti.text}</td>
                  <td>{noti.landingUrl}</td>
                </tr>
              )
            })
          )}
        </tbody>
      </BoardTable>
      <Pagenation
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPage={notificationList?.totalPages}
        pageSize={searchFilterParams?.size}
        totalCount={notificationList?.totalElements}
      />
    </>
  )
}
export default Board
