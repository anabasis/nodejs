'use client'

import { useRecentPageList } from '@store/server/useDashboardQuery'
import { EllipsisTypo, NoData } from 'ui/index'
import { ContentBox } from 'ui/layouts'
import { changeTimeLocal, getCdnFileUrl } from 'library/util'
import { format, differenceInMinutes, differenceInDays } from 'date-fns'
import { useRouter } from 'next/navigation'

export const RecentPage = () => {
  const router = useRouter()
  const { data: recentPageList } = useRecentPageList()

  const formatNotiTime = (dateTime: string): string => {
    const date = new Date(changeTimeLocal({ time: dateTime }))
    const now = new Date()

    const agoMinute = differenceInMinutes(date, now)
    const agoDay = differenceInDays(date, now)

    if (agoMinute < -24 * 60) {
      return `${Math.ceil(-agoMinute / 60 / 24)} days ago`
    } else if (agoMinute < -60) {
      return `${Math.floor(-agoMinute / 60)} hour ago`
    } else {
      return `${-agoMinute} min ago`
    }
  }

  return (
    <ContentBox className="sticky">
      <aside className="recent_area">
        <p className="title1 mb_30">Recent Page</p>
        {recentPageList?.map((item) => (
          <div className="recent_box" key={item.visitTime} onClick={() => router.push(item.url)}>
            <div className="recent_box_header">
              <div className="align start">
                <EllipsisTypo line={1} className="body3">
                  {item.title}
                </EllipsisTypo>
              </div>
            </div>
            <div className="recent_box_body">
              <EllipsisTypo line={3} className="body2 typo800">
                {item.content}
              </EllipsisTypo>
              <div className="align end mt_10">
                <p className="caption typo500">{formatNotiTime(item.visitTime)}</p>
              </div>
            </div>
          </div>
        ))}
        {/* nodata */}
        {recentPageList?.length === 0 && (
          <div className="align center min_vh70">
            <NoData className="mt_30" size="sm" text={`There are no recently \n viewed pages.`} />
          </div>
        )}
      </aside>
    </ContentBox>
  )
}
