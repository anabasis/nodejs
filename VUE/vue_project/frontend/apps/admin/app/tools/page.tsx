'use client'

import { selectBoxOptions, initialFilterParam, pageTitle } from '@constant/toolManagement'
import { useToolListQuery } from '@store/server/useToolQuery'
import { IToolSearchParam } from '@type/tools/toolType'
import { getCdnFileUrl, useMenu } from 'library'
import { usePathname, useRouter } from 'next/navigation'
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { Breadcrumb, ContentBox, ButtonMui, BoardTable, SearchIcoInput, EllipsisTypo, TooltipClick, Icons, InputGroup, SelectMui, NoData, ListError } from 'ui'
import DateRangePicker from 'ui/datepicker/DateRangePicker'
import FilterItem from 'ui/molecules/FilterItem'
import Image from 'next/image'
import { useMenuAuthority } from '@hook/useMenuAuthority'

const pageTitleList = pageTitle['main']

export default function ToolManagementPage() {
  const router = useRouter()

  const { getUserAuthority } = useMenuAuthority()
  const { read, create, update } = getUserAuthority()

  const [filterParam, setFilterData] = useState<IToolSearchParam>(initialFilterParam)
  const [searchKeyword, setSearchKeyword] = useState<string>('')
  const [searchCategory, setSearchCategory] = useState<string>('TOOL_NAME')

  const { data: toolList, refetch } = useToolListQuery(filterParam)

  const handleHeaderBtnClick = useCallback(
    (btnType: string) => {
      router.push(btnType)
    },
    [router]
  )

  const handleRowClick = useCallback((toolId) => {
    router.push(`/tools/detail?id=${toolId}`)
  }, [])

  const handleDatePickerChange = ({
    startDate,
    endDate,
    displayStartDate,
    displayEndDate,
  }: {
    startDate: string
    endDate: string
    displayStartDate: string
    displayEndDate: string
  }) => {
    setFilterData((prev) => ({
      ...prev,
      startDate: startDate,
      endDate: endDate,
      displayStartDate,
      displayEndDate,
    }))
  }

  const handleKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value)
  }

  const handleResetBtnClick = useCallback(() => {
    setFilterData(initialFilterParam)
    setSearchKeyword('')
    setSearchCategory('TOOL_NAME')
  }, [searchKeyword])

  const handleSearchCatogoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchCategory(e.target.value)
  }

  const onSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchCategory.length != 0 && searchKeyword.length != 0) {
      setFilterData((prev) => ({ ...prev, keyword: searchKeyword, keywordTab: searchCategory }))
    }
  }

  const onSearchClick = () => {
    // search request sent here
    if (searchKeyword.length != 0 && searchCategory.length != 0) {
      setFilterData((prev) => ({ ...prev, keyword: searchKeyword, keywordTab: searchCategory }))
    }
  }

  const createTableRows = () => {
    return toolList?.length != 0 ? (
      toolList?.map((tool) => (
        <tr key={tool.toolNum} onClick={() => handleRowClick(tool.toolNum)}>
          <td>
            <div className="bg_icon_box square small gray">
              <Image src={getCdnFileUrl(tool?.fileInfoResponse)} alt={tool?.fileInfoResponse.displayFileName} width="36" height="36" />
            </div>
          </td>
          <td>{tool.toolName}</td>
          <td>
            <EllipsisTypo>{tool.toolDescription}</EllipsisTypo>
          </td>
          <td>
            <span>{(tool.toolExposure === 'PRV' && 'Private') || (tool.toolExposure === 'PTL' && 'Patially Open') || 'Public'}</span>
            {tool.toolExposure === 'PTL' && tool.toolExposureCorp.length > 0 && (
              <TooltipClick placements="bottom-start" title="Disclose Corporate" className="ml_4">
                <ul className="body2 typo500">
                  {tool.toolExposureCorp.map((company, index) => (
                    <li className="mt_10" key={`${index}_company`}>
                      {company}
                    </li>
                  ))}
                </ul>
              </TooltipClick>
            )}
          </td>
          <td>{tool.toolRegisterDate.split(' ')[0]}</td>
        </tr>
      ))
    ) : (
      <tr className="nodata">
        <td colSpan={5}>
          <NoData text="There are no registered tools." className="full" />
        </td>
      </tr>
    )
  }

  return (
    <>
      {/* 페이지 상단 박스 케이스 */}
      {/* 헤더 */}
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          {/* lft/rgt 가 좌우로 정렬됩니다.  */}
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">Tools</h1>
          </div>
          <div className="rgt">
            <ButtonMui
              size="large"
              color="secondary"
              onClick={() => router.push('manage')}
              icon="SettingIcon"
              iconStyle={{ width: 15, height: 15 }}
              disabled={!update}
            >
              Manage
            </ButtonMui>
            <ButtonMui size="large" onClick={() => router.push('add')} icon="PlusIcon" iconStyle={{ width: 15, height: 15 }} disabled={!create}>
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
                onChangePickerDate={handleDatePickerChange}
                defaultDate={{ startDate: filterParam.displayStartDate, endDate: filterParam.displayEndDate }}
              />
            </FilterItem>

            <FilterItem label="Keyword">
              <InputGroup>
                <SearchIcoInput
                  uiType="addSelect"
                  placeholder="Enter keyword"
                  value={searchKeyword}
                  clearValue={() => setSearchKeyword('')}
                  onChangeSearch={handleKeywordChange}
                  onSearch={onSearch}
                  onSearchClick={onSearchClick}
                >
                  <SelectMui value={searchCategory} placeholder="Select" options={selectBoxOptions} uiType="multi" onChange={handleSearchCatogoryChange} />
                </SearchIcoInput>
              </InputGroup>
            </FilterItem>
            <ButtonMui
              size="xsmall"
              type="outlined"
              color="gray"
              uiType="reset_btn"
              icon="ResetIcon"
              iconStyle={{ width: 20, height: 20, fill: '#354165' }}
              onClick={handleResetBtnClick}
            />
          </div>
        </div>

        <BoardTable>
          <colgroup>
            <col style={{ width: '6%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: 'auto' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '13%' }} />
          </colgroup>
          <thead>
            <tr>
              <th>Icon</th>
              <th>Tool Name</th>
              <th>Description</th>
              <th>Open Level</th>
              <th>Registrated Date</th>
            </tr>
          </thead>
          <tbody>{createTableRows()}</tbody>
        </BoardTable>
      </ContentBox>
    </>
  )
}
