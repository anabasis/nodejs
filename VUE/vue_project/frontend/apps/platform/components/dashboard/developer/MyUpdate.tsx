'use client'

import { useMyUpdateCount, useMyUpdateList } from '@store/server/useDashboardQuery'
import { MyProjectsNewsType } from '@type/dashboard/dashboardType'
import { useCallback, useMemo, useRef, useState } from 'react'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Badge, ButtonMui, EllipsisTypo, Icons, NoData, RoundTab } from 'ui/index'
import { changeTimeLocal, getCode } from 'library/util'
import { format, differenceInMinutes, differenceInDays } from 'date-fns'
import { useRouter } from 'next/navigation'

export const MyUpdate = () => {
  const router = useRouter()
  const roundTabData = useMemo(() => {
    return [
      { tabName: 'All', value: 'all' },
      { tabName: 'Project', value: 'NT04' },
      { tabName: 'Request', value: 'NT08' },
    ]
  }, [])

  const [selectedIndex, setSelectedIndex] = useState(0)

  const { data: myUpdateCount } = useMyUpdateCount()
  const { data: myUpdateList } = useMyUpdateList(roundTabData[selectedIndex].value)

  const formatNotiTime = (dateTime: string): string => {
    const date = new Date(changeTimeLocal({ time: dateTime }))
    const now = new Date()

    const agoMinute = differenceInMinutes(date, now)
    const agoDay = differenceInDays(date, now)

    if (agoMinute < -24 * 60) {
      return `${Math.ceil(-agoMinute / 60 / 24)} days ago`
    } else if (agoMinute < -60) {
      // return `${Math.floor(-agoMinute / 60)} hour ago`
      return format(date, 'HH:mm')
    } else {
      return `${-agoMinute} min ago`
    }
  }

  const handleTabChange = useCallback(({ oldIndex, newIndex }) => {
    setSelectedIndex(newIndex)
  }, [])

  const swiperParams = {
    slidesPerGroup: 4,
    slidesPerView: 4,
    spaceBetween: 20,
    navigation: true,
    pagination: { clickable: true, el: '.swiper-pagination' },
    className: 'mySwiper',
    modules: [Navigation, Pagination],
    // observer: true,
  }

  const handleUpdate = useCallback(
    (item: MyProjectsNewsType) => {
      router.push(item.lndgUrl)
    },
    [router]
  )

  return (
    <>
      <div className="cont_title_box">
        <p className="title1">
          <span className="mr_10">My Update</span>
          <Badge uiType="solid" color="blue" style="count" size="sm">
            {myUpdateCount}
          </Badge>
        </p>
      </div>
      <div className="myupdate ps_re">
        <div className="align mb_20">
          <div className="lft">
            <RoundTab tabData={roundTabData} value={selectedIndex} onChange={handleTabChange} />
          </div>
          {myUpdateList?.length === 0 && (
            <div className="rgt">
              <ButtonMui color="skyblue" size="xsmall" disabled>
                <i style={{ transform: 'rotate(180deg)' }}>
                  <Icons.AngleIcon fill={'#C6CDDA'} />
                </i>
              </ButtonMui>
              <ButtonMui color="skyblue" size="xsmall" disabled>
                <Icons.AngleIcon fill={'#C6CDDA'} />
              </ButtonMui>
            </div>
          )}
        </div>
        {myUpdateList?.length > 0 ? (
          <>
            <Swiper style={{ height: '100%', width: '100%', paddingBottom: 48 }} {...swiperParams}>
              {myUpdateList?.map((item: MyProjectsNewsType, index) => (
                <SwiperSlide key={index} onClick={() => handleUpdate(item)}>
                  <div className="card update">
                    <div>
                      <div className="dashicon">
                        <img src={`/images/D_icon_${item.notfTpCd.toLowerCase()}.png`} width="44px" height="44px" alt="" />
                      </div>
                      <h2 className="headline5 navy800 mtb_10">{item.title}</h2>
                      <p className="body2 navy400">{item.content}</p>
                    </div>
                    <div className="desc">
                      <dl>
                        <dt>Project Name</dt>
                        <dd>
                          <EllipsisTypo>{item.prjNm}</EllipsisTypo>
                        </dd>
                      </dl>
                      <dl>
                        <dt>Product Category</dt>
                        <dd>
                          <EllipsisTypo>{item.dissCatCd}</EllipsisTypo>
                        </dd>
                      </dl>
                      <p className="align gap_10 wrap">
                        <strong className="capH navy200">{changeTimeLocal({ time: item.crtDt, type: 'yyyy-MM-dd' })}</strong>
                        <span className="caption navy200">{formatNotiTime(item.crtDt)}</span>
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="swiper-pagination customize"></div>
          </>
        ) : (
          myUpdateList?.length === 0 && (
            <>
              <div className="align center per_h85">
                <NoData text={`No updates. \n We'll let you know when there's an update.`} />
              </div>
              <p className="align center ps_ab btm_10">
                <span className="carousel"></span>
              </p>
            </>
          )
        )}
      </div>
    </>
  )
}
