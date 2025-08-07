'use client'

import { corpLevelList, roleLevelList } from '@constant/selectList'
import { UserRoleInfoType } from '@type/role/userRole'
import { changeTimeLocal, useMenu } from 'library'
import { usePathname, useRouter } from 'next/navigation'

/**
 * 화면: 사용자 역할 - 역할 기본 정보 입력 구간
 */

import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react'
import { BaseInput, ButtonMui, DetailTable, SelectChangeEvent, SelectMui } from 'ui'
interface UserRoleInformationProps {
  roleNumber?: string
  purpose: string // 목적 - a: 추가 화면, d: 상세 화면, e: 수정 화면
  roleInfo: UserRoleInfoType // 역할 기본 정보
  setRoleInfo?: Dispatch<SetStateAction<UserRoleInfoType>>
}

const UserRoleInformation = (props: UserRoleInformationProps) => {
  const { roleNumber, purpose, roleInfo, setRoleInfo } = props

  const [selectedRoleLevelList, setSelectedRoleLevelList] = useState(roleLevelList.map((item) => ({ ...item, name: item.name })))

  const pathname = usePathname()
  const { getPathInfo } = useMenu()
  const route = useRouter()

  /**
   * handleList: 기업 레벨 조건 리스트에서 값 선택 시 동작하는 함수
   * - 기업 레벨의 값 따라 역할 레벨에서 보여줄 값이 다르다
   *   - All : A, B
   *   - LV1 : A
   *   - LV2 : B
   * @param input : 기업 레벨
   */
  const handleList = (input: string) => {
    if (input === 'LV1') {
      setSelectedRoleLevelList([{ name: 'Level A', value: 'A' }])
      setRoleInfo({ ...roleInfo, corpLvCode: input, roleLvCode: 'A' })
    } else if (input === 'LV2') {
      setSelectedRoleLevelList([{ name: 'Level B', value: 'B' }])
      setRoleInfo({ ...roleInfo, corpLvCode: input, roleLvCode: 'B' })
    }
  }

  return (
    <article>
      <div className="cont_title_box">
        <div className="align">
          <div className="lft">
            <p className="title1">Role Information</p>
          </div>
          {purpose === 'd' && (
            <div className="rgt">
              <ButtonMui color="black" icon="EditIcon" disabled={getPathInfo(pathname).uptYn !== 'Y'} onClick={() => route.push(`edit/?num=${roleNumber}`)}>
                Edit
              </ButtonMui>
            </div>
          )}
        </div>
      </div>
      <DetailTable
        colgroup={
          <colgroup>
            <col style={{ width: '15%' }} />
            <col style={{ width: '35%' }} />
            <col style={{ width: '15%' }} />
            <col style={{ width: '35%' }} />
          </colgroup>
        }
      >
        <tr>
          <th>Corporate level</th>
          <td>
            {purpose === 'd' ? (
              `${corpLevelList.find((item) => item.value === roleInfo.corpLvCode)?.name || '-'}`
            ) : purpose === 'a' ? (
              <SelectMui
                options={corpLevelList}
                value={roleInfo.corpLvCode}
                placeholder="Please select a corporate level."
                size="large"
                onChange={(e: SelectChangeEvent<string>) => handleList(e.target.value)}
              />
            ) : (
              <SelectMui options={corpLevelList} value={roleInfo.corpLvCode} size="large" disabled />
            )}
          </td>
          <th>Role level</th>
          <td>
            {purpose === 'd' ? (
              `${roleLevelList.find((item) => item.value === roleInfo.roleLvCode)?.name || '-'}`
            ) : purpose === 'a' ? (
              <SelectMui
                options={selectedRoleLevelList}
                value={roleInfo.roleLvCode}
                placeholder="Please select a role level."
                size="large"
                onChange={(e: SelectChangeEvent<string>) => setRoleInfo({ ...roleInfo, roleLvCode: e.target.value })}
              />
            ) : (
              <SelectMui options={selectedRoleLevelList} value={roleInfo.roleLvCode} size="large" disabled />
            )}
          </td>
        </tr>
        <tr>
          <th>Role name</th>
          <td>
            {purpose === 'd' ? (
              `${roleInfo.userRoleName}`
            ) : (
              <BaseInput
                placeholder="Please enter the role name."
                value={roleInfo.userRoleName}
                maxLength={20}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setRoleInfo({ ...roleInfo, userRoleName: e.target.value })}
                size="lg"
              />
            )}
          </td>
          <th>Role code</th>
          <td>
            {purpose === 'd' ? (
              `${roleInfo.usrRolCode}`
            ) : (
              <BaseInput
                placeholder="Please enter the role code."
                value={roleInfo.usrRolCode}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setRoleInfo({ ...roleInfo, usrRolCode: event.target.value })}
                size="lg"
              />
            )}
          </td>
        </tr>
        {purpose !== 'a' && (
          <tr>
            <th>Last update date</th>
            <td>{`${changeTimeLocal({ time: roleInfo.modifyDate, type: 'yyyy-MM-dd' }) || '-'}`}</td>
            <th></th>
            <td></td>
          </tr>
        )}
      </DetailTable>
    </article>
  )
}

export default UserRoleInformation
