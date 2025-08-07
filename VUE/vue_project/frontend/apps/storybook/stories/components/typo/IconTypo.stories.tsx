import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { EllipsisTypo, IconTypo } from 'ui'

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: 'Components/Typo/IconTypo',
  component: IconTypo,
  tags: ['autodocs'],
} satisfies Meta<typeof IconTypo>

export default meta

export const Default = () => (
  <div>
    <IconTypo icon="TooltipIcon" width={16} height={16} fill="#E1315A">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis eius, aperiam quidem, libero molestiae quo harum distinctio vitae quis quos culpa! Eaque
      iure dolor dicta, impedit amet reprehenderit vel nobis.
    </IconTypo>
  </div>
)

export const NoIcon = () => (
  <div>
    <IconTypo>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis eius, aperiam quidem, libero molestiae quo harum distinctio vitae quis quos culpa! Eaque
      iure dolor dicta, impedit amet reprehenderit vel nobis.
    </IconTypo>
  </div>
)

export const IconWithEllipsis = () => (
  <div style={{ width: '500px', border: '1px solid #dcdcdc', padding: '20px' }}>
    <IconTypo icon="TooltipIcon" width={16} height={16} fill="#E1315A">
      <EllipsisTypo>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis eius, aperiam quidem, libero molestiae quo harum distinctio vitae quis quos culpa!
        Eaque iure dolor dicta, impedit amet reprehenderit vel nobis.
      </EllipsisTypo>
    </IconTypo>
  </div>
)
