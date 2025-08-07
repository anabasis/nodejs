import { useQuery } from '@tanstack/react-query'
import { CorporateMember } from 'lib/type/corporate/corporateType'
import { apiAdmin, changeTimeLocal } from 'library/util'
import { Badge, BoardTable, NoData } from 'ui'

//기업관리id(corpNum)과 멤버수(탈퇴회원은 세지 않음)
const CorporateMemberBoard = ({ id, memberCount }: { id: string; memberCount: number }) => {
  //3.Corporate 멤버 상세 API
  const getCorporateMember = async () => {
    const response = await apiAdmin.get(`/corporate/${id}/user/detail`)
    return response.data
  }

  /**
  휴면 : 1년 로그인 기록 없는 회원
    ----1년 후----
  탈퇴 : 1) 휴면 후 1년 지난 회원, 탈퇴 회원
        2) 탈퇴한 지 5년 지난 회원
    ----5년 후----
  -> 폐기
 */
  const { data: users } = useQuery(['users', id], () => getCorporateMember())
  return (
    <>
      <p className="align start title1">
        Corporate Members
        <span className="ml_10">
          <Badge uiType="solid" color="blue" style="count" size="md">
            {memberCount}
          </Badge>
        </span>
      </p>
      <BoardTable>
        <thead>
          <tr>
            {/* <th>No.</th> */}
            <th>Name</th>
            <th>Email</th>
            <th>Organization</th>
            <th>Job Title</th>
            <th>User Role</th>
            <th>Date of Registration</th>
          </tr>
        </thead>
        <tbody>
          {users?.length > 0 ? (
            users.map((corp: CorporateMember, index: number) => {
              //휴면계정(10/12 기준 피그마 미반영으로 주석)
              // return corp.userStatusCode === 'DMT' ? (
              //   <tr key={index}>
              //     <td>
              //       <span className="typo500">{corp.userUid}</span>
              //     </td>
              //     <td>
              //       <span className="typo500">{corp.fullName}</span> <Badge>Sleeper account</Badge>
              //     </td>
              //     <td>
              //       <span className="typo500">{corp.emailId}</span>
              //     </td>
              //     <td>
              //       <span className="typo500">{corp.organizationName}</span>
              //     </td>
              //     <td>
              //       <span className="typo500">{corp.jobTitleName}</span>
              //     </td>
              //     <td>
              //       <span className="typo500">{corp.userRoleName}</span>
              //     </td>
              //     <td>
              //       <span className="typo500">{changeTimeLocal({ time: corp.createDate, type: 'yyyy-MM-dd' })}</span>
              //     </td>
              //   </tr>
              // ) :
              return corp.userStatusCode === 'WDR' ? (
                <tr>
                  {/* <td>
                    <span className="typo500">{corp.userUid}</span>
                  </td> */}
                  <td>
                    <span className="typo500">{corp.fullName?.startsWith('*') || corp.fullName === '' ? '***' : corp.fullName}</span>{' '}
                    <Badge>Withdrawal member</Badge>
                  </td>
                  <td>
                    <span className="typo500">{corp.emailId?.startsWith('*') || corp.emailId === '' ? '***@***.***.***' : corp.emailId}</span>
                  </td>
                  <td>
                    <span className="typo500">{corp.organizationName?.startsWith('*') || corp.organizationName === '' ? '***' : corp.organizationName}</span>
                  </td>
                  <td>
                    <span className="typo500">{corp.jobTitleName?.startsWith('*') || corp.jobTitleName === '' ? '***' : corp.jobTitleName} </span>
                  </td>
                  <td>
                    <span className="typo500">{corp.userRoleName?.startsWith('*') || corp.userRoleName === '' ? '***' : corp.userRoleName}</span>
                  </td>
                  <td>
                    <span className="typo500">
                      {corp.createDate.startsWith('*') || '' ? '***' : changeTimeLocal({ time: corp?.createDate, type: 'yyyy-MM-dd' })}
                    </span>
                  </td>
                </tr>
              ) : (
                <tr key={index}>
                  {/* <td>{corp.userUid}</td> */}
                  <td>{corp.fullName}</td>
                  <td>{corp.emailId}</td>
                  <td>{corp.organizationName}</td>
                  <td>{corp.jobTitleName}</td>
                  <td>{corp.userRoleName}</td>
                  <td>{changeTimeLocal({ time: corp.createDate, type: 'yyyy-MM-dd' })}</td>
                </tr>
              )
            })
          ) : (
            <tr className="nodata">
              <td colSpan={6}>
                <NoData size="md" text="There are no registered Corporate members." />
              </td>
            </tr>
          )}
        </tbody>
      </BoardTable>
    </>
  )
}
export default CorporateMemberBoard
