'use client'

import { useCallback } from 'react'
import { Icons, ContentBox, BoxLinkItem, BoxLinkList } from 'ui'
import { useModal } from 'library/hook/useModal'
import TermsPopup from 'ui/components/footer/TermsPopup'
import { TermsListType } from '@type/setting/settingType'
import { useTermsListData } from '@store/server/useSettingQuery'

export default function Terms() {
  const { modalOpen } = useModal()

  const { data: termsList } = useTermsListData()

  const handleTermsClick = useCallback(
    ({ termsCategoryCodeName, termsCategoryCode }: TermsListType) => {
      modalOpen({
        title: termsCategoryCodeName,
        maxWidth: 'xl',
        linetitle: true,
        content: <TermsPopup termsCategoryCode={termsCategoryCode} />,
      })
    },
    [modalOpen]
  )

  return (
    <ContentBox>
      <BoxLinkList>
        {termsList &&
          termsList?.map((item) => (
            // qa요청으로 이벤트 영역 화살표에서 박스로 변경
            <BoxLinkItem
              onClick={() => handleTermsClick(item)}
              key={item.termsCategoryCode}
              label={item.termsCategoryCodeName}
              action={
                <button>
                  <Icons.AngleIcon width={20} height={20} fill="#354165" />
                </button>
              }
            />
          ))}
      </BoxLinkList>
    </ContentBox>
  )
}
