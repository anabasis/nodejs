import React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import type { ChartData, ChartOptions } from 'chart.js'
import { useProductCategoryListData } from '@store/server/useDashboardQuery'
import DashBox from '../DashBox'

function ProductCategory({ selectedValue }: { selectedValue: string }) {
  const [productCategoryChartData, setProductCategoryChartData] = useState<ChartData<'doughnut'>>({ labels: [], datasets: [] })
  const { data: productCategoryList } = useProductCategoryListData(selectedValue)
  const [selectedItemIndices, setSelectedItemIndices] = useState<number[]>([])

  const colorProductCategory = useMemo(() => {
    return ['#354165', '#44547E', '#657496', '#808DA8', '#A2ADC1', '#C6CDDA', '#E9EBF0', '#FFFFFF']
  }, [])

  useEffect(() => {
    if (!!productCategoryList) {
      setProductCategoryChartData({
        labels: productCategoryList.map((item) => item.dissCatNm),
        datasets: [
          {
            data: productCategoryList.map((item) => item.count),
            backgroundColor: colorProductCategory.slice(0, productCategoryList.length),
          },
        ],
      })
    }
  }, [productCategoryList, colorProductCategory])

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

    const updatedDatasets = productCategoryChartData.datasets.map((dataset, i) => {
      if (i === index) {
        return {
          ...dataset,
          hidden: !dataset.hidden,
        }
      }
      return dataset
    })

    // 새 데이터셋 가시성 정보로 corporateChartData를 업데이트합니다.
    setProductCategoryChartData({
      ...productCategoryChartData,
      datasets: updatedDatasets,
    })
  }

  const chartProductCategoryOptions = useMemo<ChartOptions<'doughnut'>>(() => {
    return {
      plugins: {
        tooltip: {
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
              const bodyLines = tooltip.body.map((b) => b.lines)
              const divRoot = document.createElement('div')
              divRoot.id = 'chartjs-tooltip'
              divRoot.className = 'd_label product'

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
            tooltipEl.style.left = positionX + tooltip.caretX + 'px'
            tooltipEl.style.top = positionY - 30 + tooltip.caretY + 'px'
            // tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px'
          },
          // displayColors: false,
          // callbacks: {
          //   title: function (context) {
          //     return ''
          //   },
          // },
        },
        legend: {
          display: false,
        },
      },
    }
  }, [])

  return (
    <DashBox className="flex1 dashbox" title={'Product Category'}>
      <div className="align per_h78">
        <Doughnut data={productCategoryChartData} options={chartProductCategoryOptions} className="d_doughnut" />
        {/*    className={selectedItemIndices.includes(index) ? 'blind' : ''} // 선택된 항목인지 여부를 확인하는 조건부 클래스를 추가합니다.
                onClick={() => handleClickLegend(index)} */}
        <ul className="d_legend_group product">
          {productCategoryList &&
            productCategoryList.map((item, index) => (
              <li key={index}>
                <span className="legend" style={{ backgroundColor: colorProductCategory[index] }}></span>
                <span className="title"> {item.dissCatNm}</span>
              </li>
            ))}
        </ul>
      </div>
    </DashBox>
  )
}

export default ProductCategory
