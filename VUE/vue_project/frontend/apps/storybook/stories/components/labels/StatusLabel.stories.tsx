// 작업자: 김수연

import type { Meta } from '@storybook/react'
import React from 'react'
import { StatusLabel } from 'ui'

const meta: Meta = {
  title: 'components/Labels/StatusLabel',
  component: StatusLabel,
  tags: ['autodocs'],
  args: {
    status: 'nor',
    type: 'circle',
  },
  argTypes: {
    status: {
      options: [
        'Normal',
        'Nor',
        'Done',
        'Complete',
        'Responsecomplete',
        'Submitted',
        'Requestgranted',
        'Ongoing',
        'Assigned',
        'Pause',
        'Wait',
        'Waitforresponse',
        'Error',
        'Abort',
        'Aborted',
        'Requestdenied',
        'Change',
        'Acc',
        'Delete',
        'Cancel',
        'Restore',
        'Ready',
        'Running',
        'Changes',
        'Stopped',
        'Standby',
        'Pasuse',
        'Waitforresponse',
        'Accid',
        'Taxonid',
        'Followup',
        'Fail',
        'Ordering',
        'Oligodesign',
        'Essentialseqdesign',
        'Copying',
        'Waiting',
        'Onhold',
        'Black',
        'Blue',
        'Blue200',
        'Blue300',
        'Blue400',
      ],
      control: { type: 'select' },
    },
  },
}

export default meta

const Template = (args: any) => <StatusLabel {...args}>{args.status}</StatusLabel>

export const Default = Template.bind({})
