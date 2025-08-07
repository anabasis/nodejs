'use client'

import Language from '@components/setting/Language'
import Lisense from '@components/setting/Lisense'
import Terms from '@components/setting/Terms'
import Notification from '@components/setting/Notification'
import { Breadcrumb, ContentBox, ContentBoxWrap, BaseTab } from 'ui'
import { useState } from 'react'

export default function Page() {
  const tabData = [
    { tabName: 'Terms', content: <Terms /> },
    { tabName: 'License', content: <Lisense /> },
    { tabName: 'Language', content: <Language /> },
    { tabName: 'Notification', content: <Notification /> },
  ]
  const [tabIndex, setTabIndex] = useState(0)

  const handleTabChange = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    setTabIndex(newIndex)
  }

  const getContent = () => {
    return tabData[tabIndex].content
  }

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={['Settings']} />
            <h1 className="headline1">Settings</h1>
          </div>
        </ContentBox>
        <BaseTab tabData={tabData} value={tabIndex} onChange={handleTabChange} />
      </div>
      {getContent()}
    </>
  )
}
