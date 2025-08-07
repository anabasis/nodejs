'use client'

import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import ToolForm from '@components/tools/ToolForm'
import { pageTitle } from '@constant/toolManagement'

export default function ToolEditPage() {
  const pageTitleList = pageTitle['edit']
  const params = useSearchParams()
  const [toolId] = useState(params.get('id'))

  return <ToolForm pageTitleList={pageTitleList} toolId={toolId} />
}
