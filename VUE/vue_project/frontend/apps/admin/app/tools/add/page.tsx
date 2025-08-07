'use client'

import React from 'react'
import ToolForm from '@components/tools/ToolForm'
import { pageTitle } from '@constant/toolManagement'

export default function ToolAddPage() {
  const pageTitleList = pageTitle['add']

  return <ToolForm pageTitleList={pageTitleList} />
}
