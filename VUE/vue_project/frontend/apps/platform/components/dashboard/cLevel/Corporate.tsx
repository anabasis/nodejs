import React from 'react'
import { useEffect, useMemo, useState, useRef } from 'react'
import { Bar } from 'react-chartjs-2'
import type { ChartData, ChartOptions } from 'chart.js'
import { useCorporateData } from '@store/server/useDashboardQuery'
import DashBox from '../DashBox'

function Corporate({ selectedValue }: { selectedValue: string }) {
  const [corporateChartData, setCorporateChartData] = useState<ChartData<'bar'>>({ labels: [], datasets: [] })
  const [selectedItemIndices, setSelectedItemIndices] = useState<number[]>([])

  const { data: corporateList } = useCorporateData(selectedValue)

  const colorCorporate = useMemo(() => {
    return ['#0028E1', '#3357FF', '#9D9FFE', '#C6C5FE', '#E9E8FF', '#C6CDDA']
  }, [])

  const max = useMemo(() => {
    if (!!corporateList) {
      let total = 0
      corporateList.forEach((item) => (total += item.corporateCount))
      return total
    }
    return 100
  }, [corporateList])

  useEffect(() => {
    if (!!corporateList) {
      setCorporateChartData({
        labels: [''],
        datasets: corporateList.map((item, index) => {
          return {
            data: [item.corporateCount],
            backgroundColor: [colorCorporate[index]],
            label: item.corporateName,
            class: 'radius_item',
            borderSkipped: false,
            borderRadius: index === 0 ? { bottomLeft: 8, topLeft: 8 } : index === corporateList.length - 1 ? { bottomRight: 8, topRight: 8 } : 0,
          }
        }),
      })
    }
  }, [colorCorporate, corporateList])

  const chartCorporateOptions = useMemo<ChartOptions<'bar'>>(() => {
    return {
      indexAxis: 'y',
      // responsive: false,
      // maintainAspectRatio: false,
      barThickness: 50,
      elements: { bar: { borderWidth: 2, borderColor: 'rgb(255,255,255,0)' } },
      scales: {
        x: {
          stacked: true,
          title: { display: false },
          border: { display: false },
          grid: { display: false },
          ticks: { display: false },
          max: max,
          min: 0,
        },
        y: {
          stacked: true,
          title: { display: false },
          border: { display: false },
          grid: { display: false },
        },
      },
      layout: {
        padding: {
          top: 0,
          bottom: 0,
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
              const tooltipData = context.tooltip.dataPoints.map((bodyItem: any) => bodyItem.parsed.x)
              const divRoot = document.createElement('div')
              divRoot.id = 'chartjs-tooltip'
              divRoot.className = 'd_label'

              tooltipData.forEach((body, i) => {
                const div = document.createElement('div')
                div.textContent = body
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
            tooltipEl.style.left = positionX - 30 + tooltip.caretX + 'px'
            tooltipEl.style.top = positionY - 40 + tooltip.caretY + 'px'
            // tooltipEl.style.left = tooltip.caretX + 'px'
            // tooltipEl.style.top = tooltip.caretY + 'px'
            tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px'
          },
        },
      },
    }
  }, [max])

  const handleClickLegend = (index: number) => {
    // index가 selectedItemIndices에 포함되어 있는지 확인합니다.
    const indexInSelection = selectedItemIndices.indexOf(index)

    // indexInSelection이 -1인 경우, 즉, 선택목록에 없는 경우, index를 추가합니다.
    if (indexInSelection === -1) {
      // Index가 선택목록에 없으면, 추가합니다.
      setSelectedItemIndices([...selectedItemIndices, index])
    } else {
      // Index가 선택목록에 있는 경우, 해당 index를 제거합니다.
      setSelectedItemIndices(selectedItemIndices.filter((i) => i !== index))
    }

    // 선택한 데이터셋의 'hidden' 속성을 토글하여 표시/숨김을 변경합니다.
    const updatedDatasets = corporateChartData.datasets.map((dataset, i) => {
      if (i === index) {
        return {
          ...dataset,
          hidden: !dataset.hidden,
        }
      }
      return dataset
    })

    // 새 데이터셋 가시성 정보로 corporateChartData를 업데이트합니다.
    setCorporateChartData({
      ...corporateChartData,
      datasets: updatedDatasets,
    })
  }

  return (
    <DashBox className="flex1 corporate dashbox " title={'Corporate'}>
      <div className="ps_ab w100 per_h18 top_m20">
        <Bar options={chartCorporateOptions} data={corporateChartData} />
      </div>
      <ul className="d_legend_group w100 corporate ps_ab btm_0 per_h65" style={{ paddingTop: '6%' }}>
        {/*               className={selectedItemIndices.includes(index) ? 'blind' : ''} // 선택된 항목인지 여부를 확인하는 조건부 클래스를 추가합니다.
              onClick={() => handleClickLegend(index)} */}
        {corporateChartData.datasets &&
          corporateChartData.datasets.map((item, index) => (
            <li key={index}>
              <span className="legend" style={{ backgroundColor: item.backgroundColor[0] }}></span>
              <span className="title"> {item.label}</span>
            </li>
          ))}
      </ul>
    </DashBox>
  )
}

export default Corporate
