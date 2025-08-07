import React, { useEffect } from 'react'
import { Icons } from 'ui/index'
import { useMemo, useState } from 'react'
import { Bar } from 'react-chartjs-2'
import type { ChartData, ChartOptions } from 'chart.js'
import { useResionStatusData, useTop6CountryData } from '@store/server/useDashboardQuery'
import DashBox from '../DashBox'
import { CountryType } from '@type/dashboard/dashboardType'

function ByCountry({ selectedValue }: { selectedValue: string }) {
  const [countryChartData, setCountryChartData] = useState<ChartData<'bar', CountryType[]>>({
    labels: [],
    datasets: [],
  })

  // 대륙명 목록을 정의합니다.
  const continentNames = useMemo(() => {
    return [
      { name: 'Asia', fill: '#27ae60' },
      { name: 'South America', fill: '#3b79f2' },
      { name: 'Europe', fill: '#ffc453' },
      { name: 'North America', fill: '#fc773e' },
      { name: 'Australia', fill: '#40b4f7' },
      { name: 'Africa', fill: '#98b9cb' },
    ]
  }, [])

  // 대륙별 선택 상태를 관리하는 상태 배열을 생성합니다.
  const [selectedContinentIndex, setSelectedContinentIndex] = useState(0) // 기본으로 아시아 선택
  const [selectedContinentImageName, setSelectedContinentImageName] = useState('asia') // 아시아 이미지 파일
  const colors = continentNames[selectedContinentIndex].name.replace(/\s+/g, '').toLowerCase()

  const { data: regionStatusList } = useResionStatusData(selectedValue)
  const { data: top6CountryDataList } = useTop6CountryData(selectedValue, continentNames[selectedContinentIndex].name)

  useEffect(() => {
    if (!!top6CountryDataList) {
      setCountryChartData({
        labels: top6CountryDataList.map((item) => item.countryName),
        datasets: [
          {
            data: top6CountryDataList,
            parsing: { xAxisKey: 'countryName', yAxisKey: 'projectCount' },
            backgroundColor: continentNames[selectedContinentIndex].fill,
          },
        ],
      })
    }
  }, [top6CountryDataList])

  // 대륙 선택 이벤트 처리 함수를 정의합니다.
  const handleContinentClick = (index) => {
    setSelectedContinentIndex(index)
    const imageName = continentNames[index].name.replace(/\s+/g, '').toLowerCase()
    // const color = continentNames[index].fill
    setSelectedContinentImageName(imageName)
  }
  // 지도 버튼
  const continentList = continentNames.map((item, index) => (
    <button
      key={index}
      className={`pd_12 tl round8 b_solid bc_navy100 w100 ${selectedContinentIndex === index ? 'bg_blue10' : 'bg_white'}`}
      onClick={() => {
        handleContinentClick(index)
      }}
    >
      <Icons.Approval fill={item.fill} />
      <span className="body2 typo900 ml_6">{item.name}</span>
    </button>
  ))

  const chartCountryOptions = useMemo<ChartOptions<'bar'>>(() => {
    return {
      responsive: true,
      barThickness: 30,
      borderRadius: 4,
      scales: {
        x: {
          border: { dash: [3, 3], color: '#C6CDDA' },
        },
        y: {
          border: { dash: [3, 3], color: '#C6CDDA' },
          grid: { offset: true },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        title: {
          display: false,
        },
        tooltip: {
          // Disable the on-canvas tooltip
          enabled: false,
          position: 'nearest',
          external: function (context) {
            const { chart, tooltip } = context
            let tooltipEl = chart.canvas.parentNode.querySelector('div')
            if (!tooltipEl) {
              tooltipEl = document.createElement('div')
              tooltipEl.style.background = 'rgba(255, 255, 255,0)'
              tooltipEl.style.opacity = '1'
              tooltipEl.style.pointerEvents = 'none'
              tooltipEl.style.position = 'absolute'
              chart.canvas.parentNode.appendChild(tooltipEl)
            }
            if (tooltip.opacity === 0) {
              tooltipEl.style.opacity = '0'
              return
            }
            if (tooltip.body) {
              const bodyLines = tooltip.body.map((b) => b.lines)
              const divRoot = document.createElement('div')
              divRoot.id = 'chartjs-tooltip'
              divRoot.className = `d_label country ${colors}`
              bodyLines.forEach((body, i) => {
                const div = document.createElement('div')
                div.textContent = body.join('')
                divRoot.appendChild(div)
              })
              // Remove old children
              while (tooltipEl.firstChild) {
                tooltipEl.firstChild.remove()
              }
              tooltipEl.appendChild(divRoot)
            }
            const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas
            // Display, position, and set styles for font
            tooltipEl.style.opacity = '1'
            tooltipEl.style.left = positionX - 15 + tooltip.caretX + 'px'
            tooltipEl.style.top = positionY - 30 + tooltip.caretY + 'px'
            tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px'
          },
        },
      },
    }
  }, [colors])

  const continentCount = useMemo(() => {
    const temp = regionStatusList?.find((item) => item.continentName === continentNames[selectedContinentIndex].name)
    return temp === undefined ? 0 : temp.continentCount > 999 ? '999+' : temp.continentCount
  }, [continentNames, regionStatusList, selectedContinentIndex])

  return (
    <DashBox className="w100" title="By Country">
      <div className="align">
        {/* 지도 */}
        <div className="align w42 grid12" style={{ maxWidth: '720px', minWidth: '620px' }}>
          <div className="align column grid3 gap_6">{continentList}</div>
          <div className="ps_re grid7">
            <img src={`/images/map/${selectedContinentImageName}.svg`} alt={selectedContinentImageName} />
            <p className={`map_badge ${selectedContinentImageName}`}>{continentCount}</p>
          </div>
        </div>
        {/* 지도 */}
        <div className="rgt w56 d_bar ps_re bycountry">
          <Bar options={chartCountryOptions} data={countryChartData} />
        </div>
      </div>
    </DashBox>
  )
}

export default ByCountry
