import React from 'react'
import DashBox from '../DashBox'
import { Bar } from 'react-chartjs-2'

import { useEffect, useMemo, useState } from 'react'
import type { ChartData, ChartOptions } from 'chart.js'
import { useProcessCountData } from '@store/server/useDashboardQuery'
import { ProcessType } from '@type/dashboard/dashboardType'

function Process({ selectedValue }: { selectedValue: string }) {
  const [processChartData, setProcessChartData] = useState<ChartData<'bar', ProcessType[]>>({ labels: [], datasets: [] })
  const { data: processList } = useProcessCountData(selectedValue)

  useEffect(() => {
    if (!!processList) {
      setProcessChartData({
        labels: processList.map((item) => item.name),
        datasets: [{ data: processList, parsing: { xAxisKey: 'count', yAxisKey: 'name' }, backgroundColor: '#F03863' }],
      })
    }
  }, [processList])

  const chartProcessOptions = useMemo<ChartOptions<'bar'>>(() => {
    return {
      indexAxis: 'y',
      // responsive: true,
      maintainAspectRatio: false,
      barThickness: 10,
      borderRadius: 4,
      scales: {
        x: {
          title: { display: false },
          border: { dash: [5, 5], color: 'rgba(198, 205, 218, 1)' },
          grid: {
            // offset: true,
            // color: function (context) {
            //   return context.index !== 5 ? 'rgba(198, 205, 218, 1)' : 'rgba(198, 205, 218, 0)'
            // },
          },
          ticks: {
            color: '#657496',
          },
        },
        y: {
          title: { display: false },
          ticks: { color: '#657496' },
          border: {
            dash: [5, 5],
            color: 'rgba(198, 205, 218, 1)',
          },
          grid: {
            // offset: true,
            // color: function (context) {
            //   return context.index !== 0 ? 'rgba(198, 205, 218, 1)' : 'rgba(198, 205, 218, 0)'
            // },
          },
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
              divRoot.className = 'd_label process'

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

  return (
    <DashBox className="flex1 dashbox " title={'Process'}>
      <Bar options={chartProcessOptions} data={processChartData} redraw={true} />
    </DashBox>
  )
}

export default Process
