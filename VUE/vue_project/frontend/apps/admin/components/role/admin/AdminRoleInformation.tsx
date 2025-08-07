'use client'

import { AdminRoleInfoType } from '@type/role/adminRole'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { BaseInput, ButtonMui, DetailTable } from 'ui'
import { changeTimeLocal, useMenu } from 'library'
import { usePathname, useRouter } from 'next/navigation'

/**
 * 화면: 어드민 역할 - 역할 기본 정보 입력 구간
 */

interface AdminRoleInformationProps {
  purpose: string // 목적 - a: 추가 화면, d: 상세 화면, e: 수정 화면
  roleNumber?: string // 수정화면 시 해당 파라미터를 통해 이동
  roleInfo: AdminRoleInfoType // 역할 기본 정보
  setRoleInfo?: Dispatch<SetStateAction<AdminRoleInfoType>> // 역할 기본 정보 수정
}

const AdminRoleInformation = (props: AdminRoleInformationProps) => {
  const { purpose, roleNumber, roleInfo, setRoleInfo } = props

  const pathname = usePathname()
  const { getPathInfo } = useMenu()
  const route = useRouter()

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
          <th>Role name</th>
          <td>
            {purpose === 'd' ? (
              `${roleInfo.adminRoleName}`
            ) : (
              <BaseInput
                placeholder="Please enter the role name."
                maxLength={20}
                value={roleInfo.adminRoleName}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setRoleInfo({ ...roleInfo, adminRoleName: event.target.value })}
                size="lg"
              />
            )}
          </td>
          <th>Role code</th>
          <td>
            {purpose === 'd' ? (
              `${roleInfo.adminRoleCode}`
            ) : (
              <BaseInput
                placeholder="Please enter the role code."
                value={roleInfo.adminRoleCode}
                onChange={(event: ChangeEvent<HTMLInputElement>) => setRoleInfo({ ...roleInfo, adminRoleCode: event.target.value })}
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

export default AdminRoleInformation
