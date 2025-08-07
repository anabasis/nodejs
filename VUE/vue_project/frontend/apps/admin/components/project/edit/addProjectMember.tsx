'use client'

import UserInnerTd from 'ui/molecules/UserInnerTd'
import { SearchIcoInput, BoardTable, Icons, Checkbox, Chip, DetailTable } from 'ui/components'
import { ButtonMui, SelectChangeEvent, SelectMui } from 'ui/mui'
import React, { ChangeEvent, KeyboardEvent, useCallback, useEffect, useState } from 'react'
import styles from 'ui/styles/mui/_popup.module.scss'
import { useCorporateListData, useUserListData } from '@store/server/useProjectQuery'
import { ProjectMemberType, UserType } from '@type/project/projectType'
import { getCdnFileUrl } from 'library/util'

export default function AddProjectMember({
  onClose,
  memberList,
  corporateName,
}: {
  onClose: (type: string, selectedMember?: ProjectMemberType[]) => void
  memberList: ProjectMemberType[]
  corporateName: string
}) {
  const [projectMemberList, setProjectMemberList] = useState<UserType[]>([])
  const [selectedMember, setSelectedMember] = useState<UserType[]>([])
  const [keyword, setKeyword] = useState<string>('')
  const [userFilter, setUserFilter] = useState({ corpNm: 'all', userNm: '' })

  const { data: corporateListData } = useCorporateListData(true, true)
  const { data: userList } = useUserListData(userFilter)

  useEffect(() => {
    if (!!userList && memberList.length > 0) {
      setProjectMemberList(userList.filter((item) => memberList.find((mem) => mem.usrUid === item.userUid) === undefined))
    }
  }, [userList, memberList])

  const isChecked = useCallback((row) => selectedMember.find((item) => item.userUid === row.userUid) !== undefined, [selectedMember])

  const handleCheckChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, row) => {
      setSelectedMember(
        event.target.checked && selectedMember.find((item) => item.userUid === row.userUid) === undefined
          ? [...selectedMember, row]
          : !event.target.checked && selectedMember.find((item) => item.userUid === row.userUid) !== undefined
          ? selectedMember.filter((item) => item.userUid !== row.userUid)
          : selectedMember
      )
    },
    [selectedMember]
  )

  const handleDeleteChip = useCallback(
    (data) => {
      setSelectedMember(selectedMember.filter((item) => item.userUid !== data.userUid))
    },
    [selectedMember]
  )

  const handleCancel = useCallback(() => {
    onClose('cancel')
  }, [onClose])

  const handleAdd = useCallback(() => {
    onClose(
      'add',
      selectedMember.map((item) => {
        return {
          usrUid: item.userUid,
          usrNm: item.fullName,
          orgnNm: item.organizationName,
          jobTitle: item.jobTitleName,
          projectManagerYn: 'N',
          prcsRolCd: [{ processRoleCode: '', processCodes: [] }],
          guestYn: corporateName === item.corporationName ? 'N' : 'Y',
          fileInfoResponse: item.filePath,
        }
      })
    )
  }, [corporateName, onClose, selectedMember])

  const handleCorporateChange = useCallback((event: SelectChangeEvent) => {
    setUserFilter((prev) => {
      return { ...prev, corpNm: event.target.value }
    })
  }, [])

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value)
  }, [])

  const handleSearchClick = useCallback(() => {
    setUserFilter((prev) => {
      return { ...prev, userNm: keyword }
    })
  }, [keyword])

  const handleSearchKeyEvent = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        setUserFilter((prev) => {
          return { ...prev, userNm: keyword }
        })
      }
    },
    [keyword]
  )

  return (
    <>
      <div className="mb_20">
        <SearchIcoInput
          uiType="addSelect"
          onSearchClick={handleSearchClick}
          onSearch={handleSearchKeyEvent}
          value={keyword}
          onChangeSearch={handleSearchChange}
          placeholder="Enter keyword"
        >
          <SelectMui value={userFilter.corpNm} placeholder="Select" size="full" onChange={handleCorporateChange} options={corporateListData} uiType="multi" />
        </SearchIcoInput>
      </div>
      <div className="bt max_h421 ovf_a">
        <div className="bb">
          <BoardTable className="max_h330">
            <colgroup>
              <col width="10%" />
              <col width="30%" />
              <col width="30%" />
              <col width="30%" />
            </colgroup>
            <thead className="sticky">
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Organization</th>
              </tr>
            </thead>
            <tbody>
              {projectMemberList.map((row, index) => (
                <tr key={row.userUid}>
                  <td>
                    <Checkbox
                      id={`${row.userUid}`}
                      name={`${row.userUid}`}
                      labelHide
                      labelText=" "
                      size="md"
                      value={isChecked(row)}
                      onChange={(event) => {
                        handleCheckChange(event, row)
                      }}
                    />
                  </td>
                  <td>
                    <UserInnerTd name={row.fullName} src={row.filePath?.preSignedUrl ?? null} />
                  </td>
                  <td>{row.emailId}</td>
                  <td className="pr_30">{row.organizationName}</td>
                </tr>
              ))}
            </tbody>
          </BoardTable>
        </div>
        <div className="align start top mt_20 gap_5">
          <div className="">
            <span className="title3 typo500">
              Selected<em className="ml_6 title2 typo800 tl in_block min_w20">{selectedMember.length}</em>
            </span>
          </div>
          <div className="align start wrap gap_10 flex1 min_h30">
            {selectedMember.map((item) => (
              <Chip key={item.userUid} onClick={() => handleDeleteChip(item)}>
                {item.fullName}
              </Chip>
            ))}
          </div>
        </div>
      </div>
      {/* 하단 버튼 예제 */}
      <div className={`align center pt_30 ${styles.modal_bottom_sticky}`}>
        <ButtonMui type="outlined" size="xlarge" onClick={handleCancel}>
          Cancel
        </ButtonMui>
        <ButtonMui size="xlarge" disabled={selectedMember.length === 0} onClick={handleAdd}>
          Add
        </ButtonMui>
      </div>
    </>
  )
}
