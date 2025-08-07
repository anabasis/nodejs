/**
 * 마이페이지 메인 및 수정 프로필 부분
 */

import { findUserEmailCorp } from '@store/client/mypage'
import { EditMyInfoType, EditUserRoleType, LoginLogList, MyInfoType, UserRequestRole, UserRole, UserRoleList } from '@type/mypage/myInfoType'
import { ModalType, ToastType, api, apiUploadFiles, changeTimeLocal, useModal, useToastPopup } from 'library'
import { debounce as _debounce } from 'lodash-es'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Badge, BaseInput, ButtonMui, DetailTable, Icons, SelectMui } from 'ui'

type ProfileResponse = {
  userInfo: MyInfoType
  userRole?: UserRole
  userRoleChangeRequested?: UserRequestRole
  loginList: LoginLogList
  popup: ModalType
}
const toastRoleState: ToastType = {
  icon: 'success',
  content: 'Request completed.',
  autoHideDuration: 3000,
}

const toastState: ToastType = {
  icon: 'success',
  content: 'Successfully saved.',
  autoHideDuration: 3000,
}

const MyNewCoProfileEdit = (props: ProfileResponse) => {
  const { userInfo, userRole, userRoleChangeRequested, loginList, popup } = props
  const router = useRouter()
  const { modalOpen, modalClose } = useModal()
  const { toastOpen } = useToastPopup()

  const [userRoleList, setUserRoleList] = useState<UserRoleList[]>()
  const [preview, setPreview] = useState<string | null>(null)
  const [disableButton, isDisableButton] = useState<boolean>(true)

  //버튼 로딩중?
  const [loading, isLoading] = useState<boolean>(false)

  //수정된 정보
  const [newUserInfo, setNewUserInfo] = useState<EditMyInfoType>({
    usrNm: userInfo?.usrNm,
    orgnNm: userInfo?.orgnNm,
    jobNm: userInfo?.jobNm,
    jobTitl: userInfo?.jobTitl,
    prflFlNum: userInfo?.fileInfoPrvResponse?.fileNumber ?? null,
  })

  const [editUserRole, setEditUserRole] = useState<EditUserRoleType>({
    reqNum: userRole?.length > 0 ? userRole[0]?.usrRolNum : '',
  })

  // User Role API
  const getRoles = async () => {
    const { data } = await api.get(`/common/usr-role/list`)
    setUserRoleList(data)
  }

  const userRoleListSelect = userRoleList
    // ?.filter((data) => data.corpLv === (userInfo?.corpNm === 'Seegene HQ' ? 'LV1' : 'LV2'))
    ?.filter((data) => data.corpLv === (findUserEmailCorp(userInfo?.emlId) === 'seegene' ? 'LV1' : 'LV2'))
    .map((item) => {
      return {
        name: item.name,
        value: String(item.id),
      }
    })

  //요청된 userRole
  const requestUserRole = userRoleListSelect?.find((item) => item.value === (userRole?.length > 0 ? userRole[0]?.usrRolReqNum : null))

  const changeProfileImage = async (e) => {
    const files = e.target.files

    if (files[0]) {
      const reader = new FileReader()
      reader.onload = function (e) {
        setPreview(e.target.result as string)
      }
      reader.readAsDataURL(files[0])

      const info = await apiUploadFiles(files, { tableName: 'TUS_USR' })

      setNewUserInfo({
        ...newUserInfo,
        prflFlNum: info[0]?.fileNumber ?? null,
      })
    }
  }

  useEffect(() => {
    getRoles()
  }, [])

  useEffect(() => {
    setNewUserInfo({
      ...newUserInfo,
      usrNm: userInfo?.usrNm,
      orgnNm: userInfo?.orgnNm,
      jobNm: userInfo?.jobNm,
      jobTitl: userInfo?.jobTitl,
      prflFlNum: userInfo?.fileInfoPrvResponse?.fileNumber ?? null,
    })
    setEditUserRole({
      ...editUserRole,
      reqNum: userRole?.length > 0 ? userRole[0]?.usrRolNum : '',
    })
  }, [userInfo])

  //user information onChange
  const handleChange = (event) => {
    const { name, value } = event.target
    setNewUserInfo({
      ...newUserInfo,
      [name]: value,
    })
  }
  //Role-user role onChange
  const handleUserRoleChange = (event) => {
    const { name, value } = event.target

    setEditUserRole({
      ...editUserRole,
      [name]: value,
    })
  }

  const handleEdit = _debounce(() => {
    if (loading) {
      return
    }
    isLoading(true)

    //수정사항, role변경 있을때
    if ((!userInfoValid || !newCoImgValid) && editUserRole.reqNum !== userRole[0]?.usrRolNum) {
      api.post(`/mypage/myinfo/modify`, newUserInfo).then((response) => {
        response.status === 200
          ? api.post(`/mypage/myinfo/user-rule/request`, editUserRole).then(() => {
              isLoading(false)
              toastOpen(toastRoleState)
              router.push(`/mypage`)
            })
          : false
      })
    }

    //수정사항은 없고 role변경 있을때
    else if (userInfoValid && editUserRole.reqNum !== userRole[0]?.usrRolNum) {
      api.post(`/mypage/myinfo/user-rule/request`, editUserRole).then((response) => {
        isLoading(false)
        toastOpen(toastRoleState)
        router.push(`/mypage`)
      })
      return
    }

    //수정사항은 있고 role변경 없을때
    else if ((!userInfoValid || !newCoImgValid) && !(editUserRole.reqNum !== userRole[0]?.usrRolNum)) {
      api.post(`/mypage/myinfo/modify`, newUserInfo).then((response) => {
        isLoading(false)
        toastOpen(toastState)
        router.push(`/mypage`)
      })
      return
    }
  }, 300)

  //user information 변화 감지
  const userInfoValid =
    (newUserInfo.usrNm === userInfo?.usrNm &&
      newUserInfo.orgnNm === userInfo?.orgnNm &&
      newUserInfo.jobTitl === userInfo?.jobTitl &&
      newUserInfo.jobNm === userInfo?.jobNm) ||
    newUserInfo.usrNm?.length === 0

  //이미지 변화 감지
  const [newCoImgValid, setNewCoImgValid] = useState(true)
  const prevPrflFlNumRef = useRef(null)

  useEffect(() => {
    if (userInfo?.fileInfoPrvResponse?.fileNumber !== newUserInfo?.prflFlNum) {
      // newUserInfo?.prflFlNum 값이 변화 했음
      setNewCoImgValid(false)
      if (newUserInfo?.prflFlNum === null) {
        //기본 프로필
        setNewCoImgValid(true)
      }
    }
  }, [newUserInfo?.prflFlNum])

  useEffect(() => {
    //role 변화 감지
    const roleValid = () => {
      //요청한userRole 없을 때 원래role인 editUserRole과 userRole은 같음 = true
      if (!requestUserRole) {
        if (editUserRole?.reqNum === (userRole && userRole[0]?.usrRolNum)) return true
        else {
          return false
        }
      } else {
        return true
      }
    }

    if (userInfoValid && newCoImgValid && roleValid()) {
      isDisableButton(true)
    } else {
      isDisableButton(false)
    }
  }, [userInfoValid, newCoImgValid, editUserRole?.reqNum, userRole, requestUserRole])

  return (
    <>
      <article>
        <div className="cont_title_box">
          <p className="title1">User Information</p>
        </div>
        <DetailTable
          colgroup={
            <colgroup>
              <col style={{ width: '10%' }} />
              <col style={{ width: '40%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '40%' }} />
            </colgroup>
          }
        >
          <tr>
            {/* className="required" */}
            <th>
              <span className="required">Name</span>
            </th>
            <td className="pr_150">
              <BaseInput
                name="usrNm"
                value={newUserInfo?.usrNm || ''}
                onChange={(event) => {
                  handleChange(event)
                }}
                maxLength={20}
              />
            </td>
            <th rowSpan={3} className="va_top">
              <span className="pt_10">Profile image</span>
            </th>
            <td rowSpan={3} className="va_top">
              <div className="profile_img">
                <div className="upload_img">
                  <Image src={preview || userInfo?.fileInfoPrvResponse?.preSignedUrl || '/images/no_icon.png'} alt="preview" width="104" height="104" />
                </div>
                <div className="upload_btn">
                  <input type="file" id="profileUpload" accept="image/png, image/jpg, image/jpeg" onChange={changeProfileImage} />
                  <label htmlFor="profileUpload">
                    <Icons.CameraIcon />
                  </label>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <th>Email</th>
            <td className="pr_150">
              <BaseInput value={userInfo?.emlId || ''} disabled />
            </td>
          </tr>
          <tr>
            <th>Corporate</th>
            <td className="pr_150">
              <BaseInput value={userInfo?.corpNm || ''} disabled />
            </td>
          </tr>
          <tr>
            <th>Organization</th>
            <td className="pr_150">
              <BaseInput
                name="orgnNm"
                value={newUserInfo?.orgnNm || ''}
                onChange={(event) => {
                  handleChange(event)
                }}
                maxLength={20}
              />
            </td>
            <th>Password</th>
            <td>
              <ButtonMui
                color="black"
                onClick={() => {
                  modalOpen(popup)
                }}
              >
                Change Password
              </ButtonMui>
            </td>
            <th></th>
          </tr>
          <tr>
            <th>Job title</th>
            <td className="pr_150">
              <BaseInput
                name="jobTitl"
                value={newUserInfo?.jobTitl || ''}
                onChange={(event) => {
                  handleChange(event)
                }}
                maxLength={20}
              />
            </td>
            <th>
              <span>Date of registration</span>
            </th>
            <td>
              <BaseInput value={changeTimeLocal({ time: userInfo?.crtDt, type: 'yyyy-MM-dd' }) || ''} disabled />
            </td>
          </tr>
          <tr>
            <th>Job</th>
            <td className="pr_150">
              <BaseInput
                name="jobNm"
                value={newUserInfo?.jobNm || ''}
                onChange={(event) => {
                  handleChange(event)
                }}
                maxLength={20}
              />
            </td>
            <th>Last access date</th>
            <td>
              <ButtonMui disabled type="text" icon="AngleIcon" iconStyle={{ fill: 'var(--navy800)' }} positions="right" onClick={() => {}} className="tl">
                {loginList &&
                  `${changeTimeLocal({ time: loginList.loginDt })} / ${loginList.ipAddr} / ${
                    loginList.cntryNm === 'Korea (the Republic of)' ? 'REPUBLIC OF KOREA' : loginList.cntryNm
                  }`}
              </ButtonMui>
            </td>
          </tr>
          <tr>
            <th colSpan={4}>
              <div className="cont_title_box pt_30 mb_20">
                <p className="title1">Role</p>
              </div>
            </th>
          </tr>
          <tr>
            <th className="va_top">
              <p className="required pt_11">User Role</p>
            </th>
            <td className="va_top pr_150">
              {userRole?.length > 0 ? (
                userRoleChangeRequested && userRoleChangeRequested[0]?.userRolNm ? (
                  <>
                    <SelectMui
                      disabled
                      className="w100"
                      name="reqNum"
                      options={userRoleListSelect}
                      value={editUserRole?.reqNum}
                      size="full"
                      onChange={(event) => {
                        handleUserRoleChange(event)
                      }}
                    />
                    <div className="ptb_6 mt_10">
                      <Badge uiType="solid">Change requested</Badge>
                      <span className="ml_10">{userRoleChangeRequested[0]?.userRolNm}</span>
                    </div>
                  </>
                ) : (
                  <SelectMui
                    name="reqNum"
                    options={userRoleListSelect}
                    value={editUserRole?.reqNum}
                    size="large"
                    onChange={(event) => {
                      handleUserRoleChange(event)
                    }}
                  />
                )
              ) : null}
            </td>
          </tr>
        </DetailTable>
      </article>
      <div className="cont_bottom_box">
        <div className="align end">
          <ButtonMui
            type="outlined"
            size="xlarge"
            onClick={() => {
              router.replace(`/mypage`)
            }}
          >
            Cancel
          </ButtonMui>
          <ButtonMui
            disabled={disableButton}
            type="contained"
            size="xlarge"
            uiType={loading ? 'loading' : ''}
            icon={loading ? 'Loading' : null}
            onClick={() => {
              handleEdit()
            }}
          >
            Save
          </ButtonMui>
        </div>
      </div>
    </>
  )
}

export default MyNewCoProfileEdit
