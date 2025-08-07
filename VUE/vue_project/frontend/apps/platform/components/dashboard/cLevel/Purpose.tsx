import React from 'react'
import { useEffect, useMemo, useState } from 'react'
import DashBox from '../DashBox'
import { Bar } from 'react-chartjs-2'

import type { ChartData, ChartOptions } from 'chart.js'
import { usePurposeListData } from '@store/server/useDashboardQuery'
import { PurposeType } from '@type/dashboard/dashboardType'

function Purpose({ selectedValue }: { selectedValue: string }) {
  const [purposeChartData, setPurposeChartData] = useState<ChartData<'bar', PurposeType[]>>({ labels: [], datasets: [] })
  const { data: purposeList } = usePurposeListData(selectedValue)

  const chartPurposeOptions = useMemo<ChartOptions<'bar'>>(() => {
    return {
      maintainAspectRatio: false,
      barThickness: 30,
      borderRadius: 4,
      scales: {
        x: {
          border: { dash: [3, 3], color: 'rgba(198, 205, 218, 1)' },
        },
        y: {
          border: { dash: [3, 3], color: 'rgba(198, 205, 218, 1)' },
          grid: { offset: true },
        },
      },
      plugins: {
        legend: {
          display: false,
          position: 'top',
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
              divRoot.className = 'd_label purpose'
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
  }, [])

  useEffect(() => {
    if (!!purposeList) {
      setPurposeChartData({
        labels: purposeList.map((item) => item.purpose),
        datasets: [{ data: purposeList, backgroundColor: '#FCB03E', parsing: { xAxisKey: 'purpose', yAxisKey: 'purposeCount' } }],
      })
    }
  }, [purposeList])

  return (
    <DashBox className="flex1 dashbox purpose" title={'Purpose'}>
      <Bar options={chartPurposeOptions} data={purposeChartData} updateMode="resize" />
    </DashBox>
  )
}

export default Purpose
