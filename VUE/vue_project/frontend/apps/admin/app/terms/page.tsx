'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Breadcrumb, ContentBox, SelectMui, ButtonMui } from 'ui'
import { useEffect, useMemo, useState } from 'react'
import FilterItem from 'ui/molecules/FilterItem'
import DateRangePicker from 'ui/datepicker/DateRangePicker'
import { useCode, selectInitValue, convertOptionKey, useMenu } from 'library'
import { TermsParamsType, TermsCommonCodes, TermsCountryGroup, TermsSelectType } from '@type/terms'
import TermsTable from '@components/terms/TermsTable'
import { getCommonCountryGruop } from '@api/common'
import { useSearchFilter } from '@hook/useSearchFIlter'
const pageTitleList = ['Terms & Conditions']

const initData = {
  size: 20,
}
const commonCodes = { termsCategoryCode: 'PFM047' }

function TermsPage() {
  const router = useRouter()
  const pathname = usePathname()
  const { getPathInfo } = useMenu()
  const { cCode } = useCode(commonCodes) as { cCode: TermsCommonCodes }
  const [country, setCountry] = useState<TermsCountryGroup>()
  const { searchFilterParams, resetSearcFilterParams, setChangeSearchParams, onResetFilter, isParamsLoading } = useSearchFilter<TermsParamsType>(initData)

  const selectData = useMemo(() => {
    if (!cCode && !country) return []
    return selectInitValue({ ...cCode, countryCode: country })
  }, [cCode, country]) as TermsSelectType

  const init = async () => {
    const data = await getCommonCountryGruop()
    const res = data.map((i: object) => convertOptionKey(i, ['countryGroupId', 'countryGroupName']))
    setCountry(res)
  }

  useEffect(() => {
    init()

    return () => {
      resetSearcFilterParams()
    }
  }, [])

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">Terms & Conditions</h1>
          </div>
          <div className="rgt">
            <ButtonMui
              disabled={getPathInfo(pathname).crtYn !== 'Y'}
              color="primary"
              icon="PlusIcon"
              onClick={() => router.push('/terms/add')}
              size="large"
              type="contained"
            >
              Add
            </ButtonMui>
          </div>
        </ContentBox>
      </div>

      <ContentBox>
        <div className="align">
          <div className="lft gap_10">
            <FilterItem label="Period">
              <DateRangePicker
                defaultDate={{ startDate: searchFilterParams?.displayStartDate, endDate: searchFilterParams?.displayEndDate }}
                onChangePickerDate={({ startDate, endDate, displayEndDate, displayStartDate }) =>
                  setChangeSearchParams({ periodToDate: startDate, periodFromDate: endDate, displayEndDate, displayStartDate })
                }
              />
            </FilterItem>

            <FilterItem label="Category">
              <SelectMui
                size="small"
                value={searchFilterParams.termsCategoryCode || ''}
                onChange={(event) => setChangeSearchParams(event, 'termsCategoryCode')}
                options={selectData?.termsCategoryCode}
              />
            </FilterItem>

            <FilterItem label="Country Group">
              <SelectMui
                size="small"
                value={searchFilterParams.countryCode || ''}
                onChange={(event) => setChangeSearchParams(event, 'countryCode')}
                options={selectData?.countryCode}
              />
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

        {!isParamsLoading && <TermsTable />}
      </ContentBox>
    </>
  )
}

export default TermsPage
