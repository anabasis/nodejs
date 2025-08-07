import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import { Badge, EllipsisTypo } from '@ui/components'
import { api, apiAdmin, changeTimeLocal, getIsAdmin } from 'library'
import Link from 'next/link'

type NoticeItem = {
  createDate: string
  noticeCategory: string
  noticeCategoryCode: string
  noticeNumber: number
  noticeType: string
  noticeTypeCode: string
  title: string
}

export const NoticeSwiper = () => {
  const [notices, setNotices] = useState([])

  const sliderRef1 = useRef(null)
  const swiperParams1 = {
    slidesPerView: 1,
    pagination: false,
    loop: true,
    className: 'NoticeSwiper',
    ref: sliderRef1,
    modules: [Autoplay],
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
  }

  const getDashboardNotice = () => {
    if (!!getIsAdmin()) {
      apiAdmin.get('/home/notice').then((res) => {
        if (res) setNotices(res.data)
      })
    } else {
      api.get('/dashboard/notice').then((res) => {
        if (res) setNotices(res.data)
      })
    }
  }

  useEffect(() => {
    getDashboardNotice()
  }, [])

  return (
    <div className="align start">
      <Badge uiType="solid">Notice</Badge>
      {/* @ts-ignore */}
      {notices.length > 0 ? (
        <Swiper direction={'vertical'} {...swiperParams1}>
          {notices.map((v: NoticeItem) => (
            <SwiperSlide key={v.noticeNumber}>
              <Link className="flex1 min_w0 align center per_h100" href={`/notice/detail/?noticeId=${v.noticeNumber}`}>
                <div className="align ">
                  <EllipsisTypo className="body2 flex1 min_w0">
                    [{v.noticeCategory}]{v.title}
                  </EllipsisTypo>
                  <span className="body2 typo500">{changeTimeLocal({ time: v.createDate, type: 'yyyy-MM-dd' })}</span>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="body2 typo500 ml_20">There are no registered notice.</p>
      )}
    </div>
  )
}
