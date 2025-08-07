'use client'

import { useEffect } from 'react'
import { Breadcrumb, DateRangePicker, FilterItem, ButtonMui, ContentBox, SelectMui, SelectChangeEventType } from 'ui'
import { useCode, useModuleSelectFilter } from 'library'
import { QnaCommonCodes } from '@type/qna'
import { QnaAdminParamsType } from '@type/qna'
import QnaManageTable from '@components/helpdesk/qna/management/QnaManageTable'
import { useSearchFilter } from '@hook/useSearchFIlter'

const pageTitleList = ['QnA', 'QnA Mangement']
const tabData = [{ tabName: 'QnA', href: '/helpdesk/qna' }]
const commonCodes = { type: 'PFM006', category: 'PFM008', module: 'PFM009', status: 'PFM007' }
const selectMenuList = ['Category', 'Module']

const initData = {
  size: 20,
}

const QnaMangementPage = () => {
  const { searchFilterParams, setChangeSearchParams, resetSearcFilterParams, onResetFilter, isParamsLoading } = useSearchFilter<QnaAdminParamsType>(initData)
  const { cCode } = useCode(commonCodes) as { cCode: QnaCommonCodes }
  const { selectData, changeSelectData } = useModuleSelectFilter<QnaAdminParamsType>({ cCode, params: searchFilterParams })

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
            <h1 className="headline1">QnA Mangement</h1>
          </div>
        </ContentBox>
      </div>

      <ContentBox>
        <div className="align">
          <div className="lft gap_10">
            <FilterItem label="Period">
              <DateRangePicker
                defaultDate={{ startDate: searchFilterParams?.displayStartDate, endDate: searchFilterParams?.displayEndDate }}
                onChangePickerDate={({ startDate, endDate, displayStartDate, displayEndDate }) =>
                  setChangeSearchParams({ periodFromDate: startDate, periodToDate: endDate, displayStartDate, displayEndDate })
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
              iconStyle={{ width: 20, height: 20, fill: '#354165' }}
              onClick={() => onResetFilter(initData)}
            />
          </div>
        </div>

        {!isParamsLoading && <QnaManageTable />}
      </ContentBox>
    </>
  )
}
export default QnaMangementPage
