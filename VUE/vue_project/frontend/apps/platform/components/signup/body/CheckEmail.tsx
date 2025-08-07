import { Dispatch, SetStateAction, useEffect } from 'react'
import { DetailTable } from 'ui'

/**
 * 화면: JO.2.1 이메일 주소 입력 및 확인
 * 경로: /signup
 * 조건: newco 회원가입 초대 가입 1번째 단게
 */

interface CheckEmailProps {
  email: string // 초대된 메일
  isDisabled: Dispatch<SetStateAction<boolean>>
}

const CheckEmail = (props: CheckEmailProps) => {
  const { email, isDisabled } = props

  useEffect(() => {
    isDisabled(false) // 입력할 것이 없으므로 Next 버튼 무조건 활성화
  }, [isDisabled])

  return (
    <>
      <div className="cont_title_box mb_0">
        <p className="title1">Email</p>
        <p className="body2 typo500">Create system account with the Email address used for invitation. Please check your Email address below.</p>
      </div>

      <DetailTable
        colgroup={
          <colgroup>
            <col style={{ width: '15%' }} />
            <col style={{ width: '75%' }} />
          </colgroup>
        }
      >
        {/* 초대 메일 노출 */}
        <tr>
          <th>Email</th>
          <td>{email}</td>
        </tr>
      </DetailTable>
    </>
  )
}

export default CheckEmail
