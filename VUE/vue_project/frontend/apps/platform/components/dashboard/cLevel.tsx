'use client'

import { ContentBox, Footer } from 'ui/layouts'
import { TooltipHover } from 'ui/mui'
import { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js'
import ByCountry from './cLevel/ByCountry'
import Process from './cLevel/Process'
import ProductCategory from './cLevel/ProductCategory'
import Purpose from './cLevel/Purpose'
import Corporate from './cLevel/Corporate'
import { useProjectCountData } from '@store/server/useDashboardQuery'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title)

export default function CLevel() {
  const [selectedValue, setSelectedValue] = useState<'ACC' | 'CUR'>('CUR')

  // 라디오 버튼 클릭 이벤트 처리 함수를 정의합니다.
  const onSetData = (event) => {
    setSelectedValue(event.target.value)
  }

  const { data: projectCount } = useProjectCountData(selectedValue)

  return (
    <>
      <ContentBox className="pd_24">
        <div className="cont_title_box align mb_14">
          <div className="lft">
            <h2 className="title1 mr_6">Overall Project Status</h2>
            <TooltipHover placements="top">Projects for research purposes are not included in the overall project status.</TooltipHover>
          </div>
          <div className="rgt">
            <span className="body1 navy200">Current {`${projectCount}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}</span>
            <div className="radio_group">
              <input type="radio" id="cumulative" value="ACC" onChange={onSetData} name="projectStatusCode " checked={selectedValue === 'ACC'} />
              <label htmlFor="cumulative">Accumulate</label>
              <input type="radio" id="current" value="CUR" onChange={onSetData} checked={selectedValue === 'CUR'} name="projectStatusCode " />
              <label htmlFor="current">Current</label>
            </div>
          </div>
        </div>
        <div className="align gap_20 wrap stretch mb_20">
          {/* 기업 */}
          <Corporate selectedValue={selectedValue} />
          {/* 카테고리 */}
          <ProductCategory selectedValue={selectedValue} />
          {/* 목적 */}
          <Purpose selectedValue={selectedValue} />
          {/* 프로세스 */}
          <Process selectedValue={selectedValue} />
        </div>
        {/* 지도 */}
        <ByCountry selectedValue={selectedValue} />
      </ContentBox>
      <ContentBox type="dashboard">
        <Footer />
      </ContentBox>
    </>
  )
}
