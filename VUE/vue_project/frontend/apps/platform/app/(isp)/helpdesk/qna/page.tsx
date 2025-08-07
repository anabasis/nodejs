'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Breadcrumb, SelectChangeEventType, DateRangePicker, FilterItem, ButtonMui, ContentBox, SelectMui } from 'ui'
import { PageListTab } from '@components/common/PageListTab'
import { useCode, useParamsData, useModuleSelectFilter } from 'library'
import { QnaCommonCodes, QnaParamsType } from '@type/qna'
import QnaTable from '@components/helpdesk/QnaTable'
import { useSearchFilter } from '@hook/useSearchFIlter'

const pageTitleList = ['Help Desk']
const tabData = [{ tabName: 'QnA', href: '/helpdesk/qna' }]
const commonCodes = { type: 'PFM006', category: 'PFM008', module: 'PFM009', status: 'PFM007' }
const selectMenuList = ['Type', 'Category', 'Module', 'Status']

const initData = {
  size: 20,
}

const QnaPage = () => {
  const router = useRouter()
  const { searchFilterParams, setChangeSearchParams, resetSearcFilterParams, onResetFilter, isParamsLoading } = useSearchFilter<QnaParamsType>(initData)
  const { cCode } = useCode(commonCodes) as { cCode: QnaCommonCodes }
  const { selectData, changeSelectData } = useModuleSelectFilter<QnaParamsType>({ cCode, params: searchFilterParams })

  const onChangeSelect = (event: SelectChangeEventType, select: string) => {
    changeSelectData(event, select)
    if (select === 'category') {
      setChangeSearchParams({
        [select]: event.target.value,
        module: '',
      })
      return
    }
    setChangeSearchParams(event, select)
  }
  useEffect(() => {
    return () => {
      resetSearcFilterParams()
    }
  }, [])
  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          {/* lft/rgt 가 좌우로 정렬됩니다.  */}
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">Help Desk</h1>
          </div>
          <div className="rgt">
            <ButtonMui color="primary" icon="PlusIcon" onClick={() => router.push('/helpdesk/qna/add')} size="large" type="contained">
              Inquiry
            </ButtonMui>
          </div>
        </ContentBox>
        <PageListTab tabData={tabData} activeTab={0} />
      </div>

      <ContentBox>
        <div className="align">
          <div className="lft gap_10">
            <FilterItem label="Period">
              <DateRangePicker
                defaultDate={{ startDate: searchFilterParams?.displayStartDate, endDate: searchFilterParams?.displayEndDate }}
                onChangePickerDate={({ displayEndDate, displayStartDate, startDate, endDate }) =>
                  setChangeSearchParams({ startDate, endDate, displayEndDate, displayStartDate })
                }
              />
            </FilterItem>

            {selectMenuList.map((select, i) => (
              <FilterItem key={`${select}_${i}`} label={select}>
                <SelectMui
                  size="small"
                  value={searchFilterParams[select.toLocaleLowerCase()] || ''}
                  onChange={(event) => onChangeSelect(event, select.toLocaleLowerCase())}
                  options={selectData[select.toLocaleLowerCase()]}
                />
              </FilterItem>
            ))}

            <ButtonMui
              size="xsmall"
              type="outlined"
              color="gray"
              uiType="reset_btn"
              icon="ResetIcon"
              iconStyle={{ width: 22, height: 22, fill: '#354165' }}
              onClick={() => onResetFilter(initData)}
            />
          </div>
        </div>

        {!isParamsLoading && <QnaTable />}
      </ContentBox>
    </>
  )
}
export default QnaPage
