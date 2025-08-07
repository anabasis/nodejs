'use client'

import { MemberType, MyCorporateMemberType, OtherCorporateMemberType } from '@type/project/projectType'
import UserInnerTd from 'ui/molecules/UserInnerTd'
import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { BaseInput, BoardTable, ButtonMui, Checkbox, Chip, InputDec, InputGroup, InputLabel, LineTab, SearchIcoInput } from 'ui'
import { useCheckOtherCorporationMemberMutation, useMyCorporateMemberData } from '@store/server/useProjectQuery'
import { useUser } from 'library/hook'
import styles from 'ui/styles/mui/_popup.module.scss'

export default function AddProjectMember({
  onClose,
  memberList,
}: {
  memberList: MemberType[]
  onClose: (list: MyCorporateMemberType[], otherList: OtherCorporateMemberType[]) => void
}) {
  const { userInfo, userRole } = useUser()

  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(0)
  const [selectedMember, setSelectedMember] = useState<MyCorporateMemberType[]>([])
  const [corporateList, setCorporateList] = useState<OtherCorporateMemberType[]>([{ email: '', error: undefined, msg: '' }])
  const [myCorporateList, setMyCorporateAllList] = useState<MyCorporateMemberType[]>([])
  const [keywordInfo, setKeywordInfo] = useState<{ keyword: string; enabled: boolean }>({ keyword: '', enabled: true })
  const [tabList, setTabList] = useState([
    {
      tabName: 'My Corporate',
    },
  ])

  const { data: myCorporateAllList } = useMyCorporateMemberData(keywordInfo)

  const checkOtherCorporationMutation = useCheckOtherCorporationMemberMutation()

  useEffect(() => {
    if (keywordInfo.enabled) {
      setKeywordInfo((prev) => {
        return { ...prev, enabled: false }
      })
    }
  }, [keywordInfo])

  useEffect(() => {
    if (!!userRole) {
      setTabList(
        userRole?.corpLv === 'LV1'
          ? [
              {
                tabName: 'My Corporate',
              },
            ]
          : [
              {
                tabName: 'My Corporate',
              },
              { tabName: 'Other Corporate' },
            ]
      )
    }
  }, [userRole])

  useEffect(() => {
    if (!!myCorporateAllList) {
      setMyCorporateAllList(myCorporateAllList.filter((item) => memberList.find((m) => m.memberId === item.usrUid) === undefined))
    }
  }, [memberList, myCorporateAllList])

  const handleTab = useCallback(({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    setSelectedTabIndex(newIndex)
    setSelectedMember([])
    setCorporateList([{ email: '', error: undefined, msg: '' }])
  }, [])

  const handleCheckChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, row) => {
      setSelectedMember(
        event.target.checked && selectedMember.find((item) => item.usrUid === row.usrUid) === undefined
          ? [...selectedMember, row]
          : !event.target.checked && selectedMember.find((item) => item.usrUid === row.usrUid) !== undefined
          ? selectedMember.filter((item) => item.usrUid !== row.usrUid)
          : selectedMember
      )
    },
    [selectedMember]
  )

  const handleKeywordChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setKeywordInfo((prev) => {
      return { ...prev, keyword: e.target.value }
    })
  }, [])

  const handleKeywordKeyEvent = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setKeywordInfo((prev) => {
        return { ...prev, enabled: true }
      })
    }
  }, [])

  const handleKeywordClick = useCallback(() => {
    setKeywordInfo((prev) => {
      return { ...prev, enabled: true }
    })
  }, [])

  const isChecked = useCallback((row) => selectedMember.find((item) => item.usrUid === row.usrUid) !== undefined, [selectedMember])

  const handleChipDelete = useCallback((row: MyCorporateMemberType) => {
    setSelectedMember((prev) => {
      return prev.filter((item) => item.usrUid !== row.usrUid)
    })
  }, [])

  const myCorporate = () => {
    return (
      <>
        <div className="ps_st top_81 zidx20">
          <SearchIcoInput
            placeholder="Enter keyword"
            value={keywordInfo.keyword}
            onChangeSearch={handleKeywordChange}
            onSearch={handleKeywordKeyEvent}
            onSearchClick={handleKeywordClick}
          />
        </div>
        <div className="mt_10">
          <BoardTable className="max_h330 bb">
            <colgroup>
              <col width="10%" />
              <col width="30%" />
              <col width="auto" />
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
              {myCorporateList?.map((row, index) => (
                <tr key={row.usrUid}>
                  <td>
                    <Checkbox
                      id={`${row.usrUid}`}
                      name={`${row.usrUid}`}
                      value={isChecked(row)}
                      onChange={(event) => {
                        handleCheckChange(event, row)
                      }}
                    />
                  </td>
                  <td>
                    <UserInnerTd name={row.usrNm} src={row.fileInfoResponse?.preSignedUrl ?? null} />
                  </td>
                  <td>{row.emlId}</td>
                  <td className="pr_30">{row.orgnNm || '-'}</td>
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
              <Chip key={item.usrUid} onClick={() => handleChipDelete(item)}>
                {item.usrNm}
              </Chip>
            ))}
          </div>
        </div>
      </>
    )
  }

  const handleAddEmail = useCallback(() => {
    if (corporateList.length < 5) {
      setCorporateList((prev) => prev.concat([{ email: '', error: undefined, msg: '' }]))
    }
  }, [corporateList.length])

  const handleDeleteEmail = useCallback((data, index) => {
    setCorporateList((prev) => prev.filter((item, pIndex) => pIndex !== index))
  }, [])

  const handleEmailChagne = useCallback((event: ChangeEvent<HTMLInputElement>, index: number) => {
    setCorporateList((prev) => prev.map((item, i) => (index === i ? { ...item, email: event.target.value, error: undefined } : item)))
  }, [])

  const checkedOherCorporate = useCallback(
    (index) => {
      const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

      if (corporateList[index].email === '') {
        setCorporateList((prev) => prev.map((item, i) => (index === i ? { ...item, msg: 'Please enter Email.', error: true } : item)))
      } else if (!pattern.test(corporateList[index].email)) {
        setCorporateList((prev) => prev.map((item, i) => (index === i ? { ...item, msg: 'Please enter valid Email.', error: true } : item)))
      } else if (!!corporateList.find((item, i) => i !== index && item.email === corporateList[index].email)) {
        setCorporateList((prev) => prev.map((item, i) => (index === i ? { ...item, msg: 'Member already has been added.', error: true } : item)))
      } else if (corporateList[index].error === undefined) {
        checkOtherCorporationMutation.mutate(corporateList[index].email, {
          onError(error, variables, context) {
            setCorporateList((prev) => prev.map((item, i) => (index === i ? { ...item, msg: 'Unverified user.', error: true } : item)))
          },
          onSuccess(data, variables, context) {
            if (memberList.find((member) => member.memberId === data.data.usrUid) !== undefined) {
              setCorporateList((prev) => prev.map((item, i) => (index === i ? { ...item, msg: 'Member already has been added.', error: true } : item)))
            } else {
              setCorporateList((prev) => prev.map((item, i) => (index === i ? { ...item, msg: '', error: false, ...data.data } : item)))
            }
          },
        })
      }
    },
    [checkOtherCorporationMutation, corporateList, memberList]
  )

  const handleEmailBlur = useCallback(
    (index) => {
      checkedOherCorporate(index)
    },
    [checkedOherCorporate]
  )

  const handleEmailKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>, index: number) => {
      if (event.key === 'Enter') {
        checkedOherCorporate(index)
      }
    },
    [checkedOherCorporate]
  )

  const corporate = () => {
    return (
      <>
        {corporateList.map((item, index) => (
          <InputGroup key={index} className="mb_10">
            <InputLabel labelText="Email" />
            <BaseInput
              className="mt_6"
              placeholder="Please enter Email."
              value={item.email}
              error={item.error}
              onChange={(event) => handleEmailChagne(event, index)}
              onBlur={() => handleEmailBlur(index)}
              onKeyDown={(event) => handleEmailKeyDown(event, index)}
            >
              <ButtonMui
                type="text"
                size="xsmall"
                color="error"
                icon="DeleteIcon"
                disabled={corporateList.length === 1}
                iconStyle={{
                  width: 20,
                  height: 20,
                  fill: 'var(--navy800)',
                }}
                onClick={() => {
                  handleDeleteEmail(item.email, index)
                }}
              />
            </BaseInput>
            <InputDec msg={item.msg} error={item.error} />
          </InputGroup>
        ))}
        <div className="align mt_20">
          <ButtonMui color="secondary" size="large" onClick={handleAddEmail} disabled={corporateList.length >= 5}>
            Add List
          </ButtonMui>
        </div>
      </>
    )
  }

  const handleCancel = useCallback(() => {
    onClose([], [])
  }, [onClose])

  const handleAdd = useCallback(() => {
    selectedTabIndex === 0
      ? onClose(
          selectedMember.map((item) => {
            return { ...item, memberProcess: [{ processRoleCode: '', processCodes: [] }] }
          }),
          []
        )
      : onClose(
          [],
          corporateList
            .filter((item) => item.email !== '')
            .map((item) => {
              return { ...item, memberProcess: [{ processRoleCode: '', processCodes: [] }] }
            })
        )
  }, [onClose, corporateList, selectedMember, selectedTabIndex])

  const isDisabledAdd = useMemo(() => {
    return selectedTabIndex === 0 ? selectedMember.length === 0 : corporateList.find((item) => item.error !== false) !== undefined
  }, [corporateList, selectedMember, selectedTabIndex])

  return (
    <>
      <div className="ps_st top_0 bg_white zidx20">
        <LineTab tabData={tabList} value={selectedTabIndex} onChange={handleTab} />
      </div>
      {selectedTabIndex === 0 ? myCorporate() : corporate()}
      <div className={`align center pt_30 ${styles.modal_bottom_sticky}`}>
        <ButtonMui type="outlined" size="xlarge" onClick={handleCancel}>
          Cancel
        </ButtonMui>
        <ButtonMui size="xlarge" onClick={handleAdd} disabled={isDisabledAdd}>
          Add
        </ButtonMui>
      </div>
    </>
  )
}
