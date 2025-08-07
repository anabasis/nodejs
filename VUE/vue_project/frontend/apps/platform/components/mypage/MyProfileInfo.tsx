/**
 * 마이페이지 메인 및 수정 프로필 부분
 */
'use client'
import { findUserEmailCorp } from '@store/client/mypage'
import { MyInfoType } from '@type/mypage/myInfoType'
import { isEmptyCheck } from 'library'
import Image from 'next/image'
import { useState } from 'react'
import { BaseInput, DetailTable, Icons } from 'ui'
type ProfileResponse = {
  myInfo: MyInfoType
  isEdit?: boolean
}

const MyProfileInfo = (props: ProfileResponse) => {
  const { myInfo, isEdit } = props
  const [name, setName] = useState(myInfo?.usrNm)

  return (
    isEmptyCheck(props) && (
      <>
        <div className="cont_title_box">
          <p className="title1">User Information</p>
        </div>
        <DetailTable
          className="mt_0"
          colgroup={
            <colgroup>
              <col className="grid3" />
              <col style={{ width: ' auto' }} />
            </colgroup>
          }
        >
          <tr>
            <th className="va_top">My account</th>
            <td>
              <div className="align start">
                <div className="profile_img ovf_h">
                  <Image src={myInfo?.fileInfoPrvResponse?.preSignedUrl || '/images/no_icon.png'} alt="profile image" width="104" height="104" />
                </div>

                {isEdit && (
                  <div className="upload_btn">
                    <input type="file" id="profileUpload" />
                    <label htmlFor="profileUpload">
                      <Icons.CameraIcon />
                    </label>
                  </div>
                )}
                <div className="profile_info">
                  <div className="name mb_16">
                    {isEdit ? (
                      <BaseInput value={myInfo?.usrNm || ''} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value)} />
                    ) : (
                      <p className="headline3">{myInfo?.usrNm || ''}</p>
                    )}
                  </div>
                  <p className="body2 align start">
                    <i className="ico_mail"></i>
                    {myInfo?.emlId || ''}
                  </p>
                  <p className="body2 mt_10 align start">
                    <i className="ico_company"></i>
                    {/* {myInfo?.corpNm !== 'Seegene HQ' && myInfo?.cntryNm + ', '} */}
                    {findUserEmailCorp(myInfo?.emlId) !== 'seegene' && myInfo?.cntryNm + ', '}
                    {myInfo?.corpNm}, {myInfo?.orgnNm ? myInfo?.orgnNm : '-'}
                  </p>
                </div>
              </div>
            </td>
          </tr>
        </DetailTable>
      </>
    )
  )
}

export default MyProfileInfo
