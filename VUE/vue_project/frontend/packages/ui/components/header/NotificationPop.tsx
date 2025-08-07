// 작업자: 김수연

import styles from '@ui/styles/common/_header.module.scss'
import { Badge, NoData } from '@ui/components'
import { find as _find } from 'lodash-es'
import { NotificationItem, NotificationList } from 'library/type/common'

const EmptyNoti = () => (
  <div className="pr_10">
    <div className={`mb_10 ${styles.cont_header}`}>
      <p className="title1 align start">
        <span className="mr_10">New notification</span>
        <Badge uiType="solid" color="blue" style="count" size="sm">
          0
        </Badge>
      </p>
    </div>
    <div className={styles.noti_ls}>
      <NoData text="No notification." size="sm" className={styles.nodata} />
    </div>
  </div>
)

const WrapNotiList = ({ notiList, totalCount }: { notiList: NotificationItem[]; totalCount: number }) => {
  const isNew = _find(notiList, { readYn: 'N' })
  return (
    <div className={`${totalCount < 10 && 'pr_10'}`}>
      <div className={styles.contents}>
        <div className={`mb_10 ${styles.cont_header}`}>
          <p className="title1 align start">
            <span className="mr_10">{`${isNew ? 'New' : 'Past'} notification`}</span>
            {isNew && (
              <Badge uiType="solid" color="blue" style="count" size="sm">
                {notiList.length}
              </Badge>
            )}
          </p>
        </div>
        <div className={styles.noti_ls}>
          {notiList.map((obj, i) => {
            return (
              <a href={process.env['NEXT_PUBLIC_URL_PLATFORM'] + obj.url} key={`${isNew ? 'New' + i : 'Past' + i}`}>
                {/* Link to a */}
                <div className={styles.noti_items}>
                  <div className="align mb_10">
                    <p className="body3">{obj.title}</p>
                    <p className="caption typo500">{obj.notificationDate}</p>
                  </div>
                  <p className="body2">{obj.contents}</p>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export const NotificationPop = ({ notiList }: { notiList: NotificationList }) => {
  const isEmpty = !notiList.Y && !notiList.N
  const totalCount = (notiList.Y?.length || 0) + (notiList.N?.length || 0)
  return (
    <div className={`${styles.wrapper} ${styles.noti}`}>
      {!isEmpty ? Object.values(notiList).map((v, i) => <WrapNotiList notiList={v} key={'noti' + i} totalCount={totalCount} />) : <EmptyNoti />}
    </div>
  )
}

export default NotificationPop
