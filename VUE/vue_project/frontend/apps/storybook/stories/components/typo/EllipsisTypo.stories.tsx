import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { EllipsisTypo } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Typo/EllipsisTypo',
  component: EllipsisTypo,
  tags: ['autodocs'],
} satisfies Meta<typeof EllipsisTypo>

export default meta

export const Default = () => (
  <div style={{ width: '500px', border: '1px solid #dcdcdc', padding: '20px' }}>
    <EllipsisTypo>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis eius, aperiam quidem, libero molestiae quo harum distinctio vitae quis quos culpa! Eaque
      iure dolor dicta, impedit amet reprehenderit vel nobis.
    </EllipsisTypo>
  </div>
)

export const styleClass = () => (
  <div style={{ width: '500px', border: '1px solid #dcdcdc', padding: '20px' }}>
    <EllipsisTypo className="title1 blue400">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis eius, aperiam quidem, libero molestiae quo harum distinctio vitae quis quos culpa! Eaque
      iure dolor dicta, impedit amet reprehenderit vel nobis.
    </EllipsisTypo>
  </div>
)

export const lineClamp = () => (
  <div style={{ width: '500px', border: '1px solid #dcdcdc', padding: '20px' }}>
    {/* 최유희 :  1~4 줄까지 가능합니다. 추가로 필요할 시 수정하겠습니다.  */}
    <EllipsisTypo line={4} className="title1 blue400">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis eius, aperiam quidem, libero molestiae quo harum distinctio vitae quis quos culpa! Eaque
      iure dolor dicta, impedit amet reprehenderit vel nobis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis eius, aperiam quidem, libero
      molestiae quo harum distinctio vitae quis quos culpa! Eaque iure dolor dicta, impedit amet reprehenderit vel nobis.
    </EllipsisTypo>
  </div>
)

export const maxWidth = () => (
  <div style={{ width: '500px', border: '1px solid #dcdcdc', padding: '20px' }}>
    <div className="align start">
      <div className="item">
        <span className="title1 navy400">나는 고정</span>
      </div>
      <div className="item">
        <EllipsisTypo className="title1 blue400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis eius, aperiam quidem, libero molestiae quo harum distinctio vitae quis quos culpa!
          Eaque iure dolor dicta, impedit amet reprehenderit vel nobis.
        </EllipsisTypo>
      </div>
    </div>
  </div>
)
