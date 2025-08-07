import { SignUpType } from '@type/signup/SignUpType'
import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { BaseInput, DetailTable, InputDec, InputGroup, InputLabel } from 'ui'

/**
 * 화면: JO.2.4 회원 정보 입력
 * 경로: /signup
 */

interface inputInfoProps {
  data: SignUpType
  setData: Dispatch<SetStateAction<SignUpType>>
  isDisabled: Dispatch<SetStateAction<boolean>>
}

const UserInformation = (props: inputInfoProps) => {
  const { data, setData, isDisabled } = props

  /**
   * handleName: 이름 input 입력 시 동작하는 함수.
   * 1. 회원 정보에 임시로 저장
   * 2. 이름이 한 자라도 입력이 되어있는 경우, 다음 버튼 활성화
   * @param value: 이름 input
   */
  const handleName = (value: string) => {
    //
    setData({ ...data, userName: value })

    // 이름 입력 확인. 1글자 이상 입력 시 다음 버튼 활성화
    if (value !== '') {
      isDisabled(false) // 다음 버튼 활성화
    } else {
      isDisabled(true) // 다음 버튼 비활성화
    }
  }

  return (
    <>
      <div className="cont_title_box mb_0">
        <p className="title1">Enter Member Information</p>
        <p className="body2 typo500">Please enter detailed information for approval.</p>
      </div>

      <DetailTable
        colgroup={
          <colgroup>
            <col style={{ width: '15%' }} />
            <col style={{ width: '75%' }} />
          </colgroup>
        }
      >
        {/* name input - 필수 */}
        <tr>
          <th>
            <InputLabel labelText="Name" id="name" required />
          </th>
          <td>
            <BaseInput id="ipt01" size="lg" onChange={(event: ChangeEvent<HTMLInputElement>) => handleName(event.target.value)} placeholder="Seegene Kim" />
          </td>
        </tr>

        {/* organization input */}
        <tr>
          <th>
            <InputLabel labelText="Organization" id="organization" />
          </th>
          <td>
            <InputGroup>
              <BaseInput
                id="ipt02"
                size="lg"
                onChange={(event: ChangeEvent<HTMLInputElement>) => setData({ ...data, organization: event.target.value })}
                placeholder="Reagent Development Team"
              />
              <InputDec msg="Please enter detailed organization information for approval." />
            </InputGroup>
          </td>
        </tr>

        {/* job input */}
        <tr>
          <th>
            <InputLabel labelText="Job title" id="job" />
          </th>
          <td>
            <InputGroup>
              <BaseInput
                id="ipt03"
                size="lg"
                onChange={(event: ChangeEvent<HTMLInputElement>) => setData({ ...data, jobTitle: event.target.value })}
                placeholder="대리"
              />
              <InputDec msg="Please enter detailed job title information for approval." />
            </InputGroup>
          </td>
        </tr>
      </DetailTable>
    </>
  )
}

export default UserInformation
