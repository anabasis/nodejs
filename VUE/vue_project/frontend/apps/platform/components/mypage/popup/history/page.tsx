'use client'

import { LoginLogList } from '@type/mypage/myInfoType'
import { changeTimeLocal } from 'library'
/**
 * 화면: 로그인 이력 팝업
 */

import { BoardTable } from 'ui'

const LoginHistory = ({ loginHistory }: { loginHistory: LoginLogList[] }) => {
  return (
    <BoardTable className="h330">
      <colgroup>
        <col style={{ width: 'auto' }} />
        <col style={{ width: 'auto' }} />
        <col style={{ width: 'auto' }} />
      </colgroup>
      <thead className="sticky">
        <tr>
          <th>Date</th>
          <th>IP</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {loginHistory &&
          loginHistory.map((myhistory, index) => {
            return (
              <tr key={index}>
                <td>{changeTimeLocal({ time: myhistory.loginDt })}</td>
                <td>{myhistory.ipAddr}</td>
                <td>{myhistory.cntryNm === 'Korea (the Republic of)' ? 'REPUBLIC OF KOREA' : myhistory.cntryNm}</td>
              </tr>
            )
          })}
      </tbody>
    </BoardTable>
  )
}

export default LoginHistory
