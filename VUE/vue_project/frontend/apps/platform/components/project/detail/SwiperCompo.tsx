'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import { ProjectCard } from 'ui'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { ProjectBasicInfoType } from '@type/project/projectType'
import { useProjectHistory } from '@store/server/useProjectQuery'
import { changeTimeLocal } from 'library/util/time'

export default function SwiperCompo({ projectInfo }: { projectInfo: ProjectBasicInfoType }) {
  const { data: projectHistory } = useProjectHistory(projectInfo)

  const swiperParams = {
    slidesPerGroup: 5,
    slidesPerView: 5,
    spaceBetween: 10,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: true,
    className: 'mySwiper',
    modules: [Navigation, Pagination],
    observer: true,
  }

  return (
    <div className="project-swiper">
      <div className="align cont_title_box mb_20 h36">
        <div className="lft">
          <p className="title1">
            <span className="mr_10">Process History</span>
          </p>
        </div>
      </div>
      <div>
        <Swiper style={{ height: 290, width: '100%', paddingBottom: 48 }} {...swiperParams}>
          {projectHistory?.map((item, index) => (
            <SwiperSlide key={index}>
              <ProjectCard
                title={item.process}
                name={item.member}
                update={changeTimeLocal({ time: item.lastUpdateDate, type: 'yyyy-MM-dd HH:mm' })}
                date={`${changeTimeLocal({ time: item.startDate, type: 'yyyy-MM-dd' })} ~ ${
                  item.statusCode === 'PCNG' ? '' : changeTimeLocal({ time: item.endDate, type: 'yyyy-MM-dd' })
                }`}
                status={item.status}
                index={index}
              />
            </SwiperSlide>
          ))}
          <div className="swiper-pagination customize"></div>
        </Swiper>
      </div>
    </div>
  )
}
