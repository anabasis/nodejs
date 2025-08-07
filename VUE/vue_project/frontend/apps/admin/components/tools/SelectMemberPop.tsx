'use client'

import UserInnerTd from 'ui/molecules/UserInnerTd'
import { BoardTable, SearchIcoInput, Checkbox, ButtonMui, Chip } from 'ui'
import { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useCallback, useEffect, useState } from 'react'
import { ICorporate, ITool } from '@type/tools/toolType'
import styles from 'ui/styles/mui/_popup.module.scss'
import { useCorporateListQuery } from '@store/server/useToolQuery'
import { isEqual, some } from 'lodash-es'

export default function SelectMemberPop({
  isAdd,
  onClose,
  newToolData,
  setNewToolData,
}: {
  isAdd: boolean
  onClose: () => void
  newToolData: ITool
  setNewToolData: Dispatch<SetStateAction<ITool>>
}) {
  const [selectedList, setSelectedList] = useState<{ name: string; id: number }[]>(isAdd ? [] : newToolData.toolExposureCorp)
  const [searchKeyword, setSearchKeyword] = useState('')

  const { data: corporateList, refetch } = useCorporateListQuery(searchKeyword)

  const handleCheckBoxClick = (e: ChangeEvent<HTMLInputElement>, newCorporateName, newCorporationId) => {
    if (e.target.checked) {
      setSelectedList((prev) => [...prev, { name: newCorporateName, id: newCorporationId }])
    } else {
      deleteCorpFromSelectedList(newCorporationId)
    }
  }

  const deleteCorpFromSelectedList = (newCorporationId) => {
    setSelectedList((prev) => {
      return prev.filter((corporate) => corporate.id !== newCorporationId)
    })
  }

  const createTableRow = () => {
    return corporateList?.map((company: ICorporate, index: number) => (
      <tr key={`${company.corporationName}_${index}`}>
        <td>
          <Checkbox
            id={company.corporationNum.toString()}
            value={some(selectedList, (corp) => corp.id === company.corporationNum)}
            name={company.corporationName}
            onChange={(e: ChangeEvent<HTMLInputElement>) => handleCheckBoxClick(e, company.corporationName, company.corporationNum)}
          />
        </td>
        <td>{company.corporationName}</td>
        <td>Level {company.corporateLevel[company.corporateLevel.length - 1]}</td>
        <td className="pr_30">{company.nation.split(':')[0]}</td>
      </tr>
    ))
  }

  const handleOKBtnClick = useCallback(() => {
    setNewToolData((prev) => ({ ...prev, toolExposureCorp: selectedList }))
    setSearchKeyword('')
    onClose()
  }, [selectedList])

  const handleSearchKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value)
  }

  const handleEnterKeyPressed = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') refetch()
  }

  const handleSearchClick = () => {
    refetch()
  }

  const isOkbtnDisabled = () => {
    return selectedList.length == 0
  }

  useEffect(() => {
    if (newToolData.toolExposureCorp.length != 0) {
      setSelectedList(newToolData.toolExposureCorp)
    }
  }, [newToolData])

  useEffect(() => {
    refetch()
  }, [])

  return (
    <>
      <div className="mb_20">
        <SearchIcoInput
          placeholder="Enter keyword"
          value={searchKeyword}
          onChangeSearch={handleSearchKeywordChange}
          onSearch={handleEnterKeyPressed}
          onSearchClick={handleSearchClick}
        />
      </div>
      <div className="">
        <div className="bb">
          <BoardTable className="max_h330" inner>
            <colgroup>
              <col width="10%" />
              <col />
              <col width="25%" />
              <col width="25%" />
            </colgroup>
            <thead className="sticky">
              <tr>
                <th></th>
                <th>Corporate Name</th>
                <th>Corporate Level</th>
                <th>Country</th>
              </tr>
            </thead>
            <tbody>{createTableRow()}</tbody>
          </BoardTable>
        </div>
        <div className="align start top mt_20 gap_5">
          <div className="">
            <span className="title3 typo500">
              Selected
              <em className="ml_6 title2 typo800 tl in_block min_w20">{selectedList?.length}</em>
            </span>
          </div>
          <div className="align start wrap gap_10 flex1 min_h30">
            {selectedList?.map((corporate) => (
              <Chip key={corporate.id} onClick={() => deleteCorpFromSelectedList(corporate.id)}>
                {corporate.name}
              </Chip>
            ))}
          </div>
        </div>
      </div>
      {/* 하단 버튼 예제 */}
      <div className={`align center pt_30 ${styles.modal_bottom_sticky}`}>
        <ButtonMui type="outlined" size="xlarge" onClick={() => onClose()}>
          Cancel
        </ButtonMui>
        <ButtonMui size="xlarge" onClick={handleOKBtnClick} disabled={isOkbtnDisabled()}>
          OK
        </ButtonMui>
      </div>
    </>
  )
}
