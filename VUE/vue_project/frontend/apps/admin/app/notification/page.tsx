/**
 * 작성자 : 양수연
 * 화면 : AR1 알림 관리
 * path : /notification
 */
'use client'
import Board from '@components/notification/Board'
import Registration from '@components/notification/Registration'
import { useSearchFilter } from '@hook/useSearchFIlter'
import { NotificationParamsType } from '@type/notification/notificationType'
import { ModalType, useMenu, useModal } from 'library'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { Breadcrumb, ButtonMui, ContentBox, FilterItem, SearchIcoInput, SelectMui } from 'ui'

const pageTitleList = [`Notification`]

const initData = {
  size: 20,
  keywordName: 'title',
}

const Notification = () => {
  const { modalOpen } = useModal()
  const pathname = usePathname()
  const { getPathInfo } = useMenu()

  const optionList = [
    {
      name: 'Title',
      value: 'title',
    },
    {
      name: 'String',
      value: 'string',
    },
  ]

  const { valueParam, selectTab, isParamsLoading, resetSearcFilterParams, onValueParamChange, onSelectTab, onResetFilter, onSearch } =
    useSearchFilter<NotificationParamsType>(initData)

  const modalState: ModalType = {
    title: 'Notification registration',
    textTitle: 'Enter your information to register a new notification.',
    maxWidth: 'l',
    linetitle: true,
    content: <Registration />,
  }

  useEffect(() => {
    return () => {
      resetSearcFilterParams()
    }
  }, [])
  return (
    <>
      {/* 헤더 */}
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">Notification</h1>
          </div>
          <div className="rgt">
            <ButtonMui
              color="primary"
              icon="PlusIcon"
              onClick={() => modalOpen(modalState)}
              size="large"
              type="contained"
              disabled={getPathInfo(pathname).crtYn !== 'Y'}
            >
              Add
            </ButtonMui>
          </div>
        </ContentBox>
      </div>
      {/* 필터 및 테이블 */}
      <ContentBox>
        <div className="align">
          <div className="lft gap_10">
            <FilterItem label="Keyword">
              <div className="grid6">
                <SearchIcoInput
                  uiType="addSelect"
                  clearValue={() => onValueParamChange('', 'keyword')}
                  onSearchClick={() => onSearch('keyword')}
                  onSearch={(event) => onSearch(event, 'keyword')}
                  value={valueParam || ''}
                  onChangeSearch={onValueParamChange}
                  placeholder="Enter keyword"
                >
                  <SelectMui
                    value={selectTab?.keywordName || ''}
                    size="full"
                    onChange={(event) => onSelectTab(event, 'keywordName')}
                    options={optionList}
                    uiType="multi"
                    placeholder="Select"
                  />
                </SearchIcoInput>
              </div>
            </FilterItem>
            <ButtonMui
              size="xsmall"
              type="outlined"
              color="gray"
              uiType="reset_btn"
              icon="ResetIcon"
              iconStyle={{ width: 20, height: 20, fill: '#354165' }}
              onClick={() => onResetFilter(initData)}
            />
          </div>
        </div>
        {!isParamsLoading && <Board />}
      </ContentBox>
    </>
  )
}
export default Notification
