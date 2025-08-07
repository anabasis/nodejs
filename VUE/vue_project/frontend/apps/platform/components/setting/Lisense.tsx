'use client'

import { Icons, ContentBox, BoxLinkItem, BoxLinkList } from 'ui'
import { useModal, ModalType } from 'library/hook/useModal'
import { useCallback, useEffect, useState } from 'react'
import LisensePopup from './LisensePopup'
import { LicenseListType } from '@type/setting/settingType'
import { useLicenseListData } from '@store/server/useSettingQuery'

export default function Lisense() {
  const { modalOpen, modalClose } = useModal()

  const { data: licenseList } = useLicenseListData()

  const handleLisenseClick = useCallback(
    ({ licenseNumber }: LicenseListType) => {
      modalOpen({
        title: 'License',
        maxWidth: 'xl',
        linetitle: true,
        content: <LisensePopup licenseNumber={licenseNumber} />,
      })
    },
    [modalOpen]
  )

  return (
    <ContentBox>
      <BoxLinkList>
        {licenseList?.map((item) => (
          <BoxLinkItem
            key={`${item.licenseNumber}`}
            label={item.systemName}
            action={
              <button onClick={() => handleLisenseClick(item)}>
                <Icons.AngleIcon width={20} height={20} fill="#354165" />
              </button>
            }
          />
        ))}
      </BoxLinkList>
    </ContentBox>
  )
}
