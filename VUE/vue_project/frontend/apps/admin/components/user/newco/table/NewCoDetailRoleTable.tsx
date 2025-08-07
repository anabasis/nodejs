import { Badge, ButtonMui, DetailTable, SelectMui, TooltipHover } from 'ui'
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { AlertType, useAlert, useMenu } from 'library'
import { useApproveNewCoUserRole, useNewCoUserRoleData } from '@store/server/useNewCoUserQuery'
import { useUserRoleData } from '@store/server/useCommonQuery'
import { useQueryClient } from '@tanstack/react-query'
import { NewCoDetailInfo } from '@type/user/user'
import DeclineRole from '@components/user/popup/DeclineRole'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'library/i18n/client'

interface NewCoDetailRoleTableProps {
  data: NewCoDetailInfo
  isRoleChangeSuccess: Dispatch<SetStateAction<boolean>>
  isRoleChangeDeclined: Dispatch<SetStateAction<boolean>>
}

const NewCoDetailRoleTable = (props: NewCoDetailRoleTableProps) => {
  const { data, isRoleChangeSuccess, isRoleChangeDeclined } = props
  const { t } = useTranslation('platform')

  const [userRoleChange, setUserRoleChnage] = useState<string>('')

  const newCoUserRoleList = useNewCoUserRoleData()
  const userRoleList = useUserRoleData()
  const queryClient = useQueryClient()
  const mutateApproveUserRole = useApproveNewCoUserRole()

  const pathname = usePathname()
  const { getPathInfo } = useMenu()

  const { alertOpen } = useAlert()

  // roleDeclineAlert: 역할 거절 alert -> TODO. 현재는 큰 틀만 잡음 newco는 user만 있지만 역할 변경 요청에 대해 정해지면 제대로 코딩할 것.
  const roleDeclineAlert: AlertType = {
    icon: 'info',
    title: t('PCyN'),
    textTitle: t('yEhH', { name: data.fullName }),
    content: <DeclineRole level={'newco'} uid={data.userUid} userRoleChange={userRoleChange} isRoleChangeDeclined={isRoleChangeDeclined} />,
  }

  const apprvoeChangeUserRole = () => {
    let param = {
      userUid: data.userUid,
      userRolNum: Number(userRoleChange),
    }
    mutateApproveUserRole.mutate(param, {
      onSuccess: () => {
        isRoleChangeSuccess(true)
        queryClient.invalidateQueries(['newCoDetailData'])
      },
    })
  }

  /**
   * showRequestUserRole : 요청하고자 하는 사용자 역할 이름을 보여주는 함수
   * @returns
   * - 없을 때 : -
   * - 값은 있으나 역할 자체가 없을 때 : No Role
   * - 있을 때 : 역할 이름
   */
  const showRequestUserRole = () => {
    let roleNumber = userRoleList.find((item) => item.value === data.roleRequest)
    if (data.roleRequestYn === 'N') {
      return t('xUqk')
    } else {
      if (roleNumber === undefined) {
        return 'No role'
      }
      return roleNumber.name
    }
  }

  // 유저의 사용자 역할과 어드민 역할을 select box에 초기값으로 넣기 위한 렌더링
  useEffect(() => {
    const init = () => {
      setUserRoleChnage(data.usrRolId.toString())
    }
    init()
  }, [data])

  return (
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
        <th className="va_top">
          <span>{t('WObJ')}</span>
          <TooltipHover placements="top-start">
            <p>{t('UfQN')}</p>
          </TooltipHover>
        </th>
        <td className="va_top">
          <div className="w100">
            <div className="align start top gap_10 round8 mb_10">
              <p className="max_w368 min_w368">
                <Badge uiType="solid" disabled={data.roleRequestYn === 'N'}>
                  {t('VycD')}
                </Badge>
                <span className="ml_6">{showRequestUserRole()}</span>
              </p>
              {data.roleRequestYn === 'Y' && getPathInfo(pathname).uptYn === 'Y' && (
                <ButtonMui type="outlined" size="small" onClick={() => alertOpen(roleDeclineAlert)}>
                  {t('guSK')}
                </ButtonMui>
              )}
            </div>
            <div className="align start gap_10">
              <div className=" max_w330 min_w330">
                <SelectMui
                  size="full"
                  options={newCoUserRoleList}
                  value={userRoleChange}
                  onChange={(event: ChangeEvent<HTMLInputElement>) => setUserRoleChnage(event.target.value)}
                />
              </div>
              <ButtonMui
                color="black"
                size="medium"
                disabled={data.usrRolId === Number(userRoleChange) || getPathInfo(pathname).uptYn !== 'Y' || mutateApproveUserRole.isLoading}
                uiType={mutateApproveUserRole.isLoading ? 'loading' : ''}
                onClick={() => apprvoeChangeUserRole()}
              >
                {t('VAXY')}
              </ButtonMui>
            </div>
          </div>
        </td>
      </tr>
    </DetailTable>
  )
}

export default NewCoDetailRoleTable
