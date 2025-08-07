/**
 * 마이페이지 메인 및 수정 프로필 부분
 */

import { findUserEmailCorp } from '@store/client/mypage'
import {
  AdminRequestRole,
  AdminRole,
  AdminRoleList,
  EditMyInfoType,
  EditUserRoleType,
  LoginLogList,
  MyInfoType,
  UserRequestRole,
  UserRole,
  UserRoleList,
} from '@type/mypage/myInfoType'
import { ModalType, ToastType, api, apiUploadFiles, changeTimeLocal, useToastPopup } from 'library'
import { debounce as _debounce } from 'lodash-es'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Badge, BaseInput, ButtonMui, DetailTable, Icons, MultiSelectMui, SelectChangeEvent, SelectMui } from 'ui'

type ProfileResponse = {
  userInfo: MyInfoType
  userRole?: UserRole
  userRoleChangeRequested?: UserRequestRole
  adminRole?: AdminRole[]
  adminRoleChangeRequested?: AdminRequestRole[]
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

const MySeegeneProfileEdit = (props: ProfileResponse) => {
  const { userInfo, userRole, userRoleChangeRequested, adminRole, adminRoleChangeRequested, loginList, popup } = props
  const router = useRouter()
  const { toastOpen } = useToastPopup()

  const [userRoleList, setUserRoleList] = useState<UserRoleList[]>()
  const [adminRoleList, setAdminRoleList] = useState<AdminRoleList[]>()
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
    prflFlNum: userInfo?.fileInfoPrvResponse?.fileNumber,
  })

  const [editUserRole, setEditUserRole] = useState<EditUserRoleType>({
    reqNum: userRole?.length > 0 ? userRole[0]?.usrRolNum : '',
  })

  const [editAdminRole, setEditAdminRole] = useState(adminRole?.map((item) => item.admRolNum))

  // User Role API
  const getRoles = async () => {
    const { data } = await api.get(`/common/usr-role/list`)
    setUserRoleList(data)
  }
  // Admin Role API
  const getAdminRoles = async () => {
    const { data } = await api.get(`/common/adm-role/list`)
    setAdminRoleList(data)
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

  const adminRoleListSelect = adminRoleList?.map((item) => {
    return {
      name: item.admRolNm,
      value: item.admRolNum.toString(),
    }
  })

  //요청된 userRole
  const requestUserRole = userRoleListSelect?.find((item) => item.value === (userRole?.length > 0 ? userRole[0]?.usrRolReqNum : null))

  //요청된 adminRole
  const requestAdminRole = adminRoleChangeRequested?.map((item) => item.admRolNm).join(',')

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
    getAdminRoles()
  }, [])

  useEffect(() => {
    setEditAdminRole(adminRole?.map((item) => item.admRolNum))
  }, [adminRole])

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

  //요청할 adminRole
  const existAdminRole = adminRole?.map((item) => item.admRolNum).join(',')

  //기존 어드민 권한 취소 요청할 경우
  const requestAdminRoleNum = () => {
    if (editAdminRole.length === 0) {
      //none요청
      return { reqNum: '' }
    } else {
      return { reqNum: editAdminRole?.join(',') }
    }
  }

  const handleEdit = _debounce(() => {
    if (loading) {
      return
    }
    isLoading(true)

    if (!userInfoValid || !imgValid) {
      if (editUserRole.reqNum !== userRole[0]?.usrRolNum) {
        //수정사항 O, user O, admin O
        if (editAdminRole?.join(',') !== existAdminRole) {
          api.post(`/mypage/myinfo/modify`, newUserInfo).then((response) => {
            response.status === 200
              ? api.post(`/mypage/myinfo/admin-rule/request`, requestAdminRoleNum()).then((response) => {
                  response.status === 200
                    ? api.post(`/mypage/myinfo/user-rule/request`, editUserRole).then(() => {
                        isLoading(false)
                        toastOpen(toastRoleState)
                        router.push(`/mypage`)
                      })
                    : false
                })
              : false
          })
        }
        //수정사항 O, user O, admin X
        else if (!(editAdminRole?.join(',') !== existAdminRole)) {
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
      }
      //수정사항 O, user X, admin O
      else if (!editUserRole.reqNum !== userRole[0]?.usrRolNum) {
        if (editAdminRole?.join(',') !== existAdminRole) {
          api.post(`/mypage/myinfo/modify`, newUserInfo).then((response) => {
            response.status === 200
              ? api.post(`/mypage/myinfo/admin-rule/request`, requestAdminRoleNum()).then(() => {
                  isLoading(false)
                  toastOpen(toastRoleState)
                  router.push(`/mypage`)
                })
              : false
          })
        } else if (!(editAdminRole?.join(',') !== existAdminRole)) {
          //수정사항 O, user X, admin X
          api.post(`/mypage/myinfo/modify`, newUserInfo).then(() => {
            isLoading(false)
            toastOpen(toastState)
            router.push(`/mypage`)
          })
        }
      }
    }
    //수정사항 X, user O, admin O
    else if (editUserRole.reqNum !== userRole[0]?.usrRolNum) {
      if (editAdminRole?.join(',') !== existAdminRole) {
        api.post(`/mypage/myinfo/admin-rule/request`, requestAdminRoleNum()).then((response) => {
          response.status === 200
            ? api.post(`/mypage/myinfo/user-rule/request`, editUserRole).then(() => {
                isLoading(false)
                toastOpen(toastRoleState)
                router.push(`/mypage`)
              })
            : false
        })
      } else if (!(editAdminRole?.join(',') !== existAdminRole)) {
        //수정사항 X, user O, admin X
        api.post(`/mypage/myinfo/user-rule/request`, editUserRole).then(() => {
          isLoading(false)
          toastOpen(toastRoleState)
          router.push(`/mypage`)
        })
      }
    } else if (!(editUserRole.reqNum !== userRole[0]?.usrRolNum)) {
      //수정사항 X, user X, admin O
      if (editAdminRole?.join(',') !== existAdminRole) {
        api.post(`/mypage/myinfo/admin-rule/request`, requestAdminRoleNum()).then(() => {
          isLoading(false)
          toastOpen(toastRoleState)
          router.push(`/mypage`)
        })
      }
    }
  }, 300)

  //user information 변화 감지
  const userInfoValid = newUserInfo.jobNm === userInfo?.jobNm

  //이미지 변화 감지
  const [imgValid, setImgValid] = useState(true)

  useEffect(() => {
    if (userInfo?.fileInfoPrvResponse?.fileNumber !== newUserInfo?.prflFlNum) {
      // newUserInfo?.prflFlNum 값이 변화 했음
      setImgValid(false)
      if (newUserInfo?.prflFlNum === null) {
        //기본 프로필
        setImgValid(true)
      }
    }
  }, [newUserInfo?.prflFlNum])

  const adminRoleString = adminRole?.map((item) => item.admRolNum).join(',')
  // const adminRequestRoleString = adminRoleChangeRequested?.map((item) => item.admRolNum).join(',')
  const adminRequestRoleName = adminRoleChangeRequested?.map((item) => item.admRolNm).join(', ')

  useEffect(() => {
    //role 변화 감지
    const userRoleValid = () => {
      //요청한userRole 없을 때 원래role인 editUserRole과 userRole은 같음 = true
      if (!requestUserRole) {
        if (editUserRole?.reqNum === userRole[0]?.usrRolNum) return true
        else {
          return false
        }
      } else {
        return true
      }
    }

    const adminRoleValid = () => {
      // return editAdminRole?.join(',') === existAdminRole
      //기존 role과 변경 role이 같은지 체크
      const newAdmin = editAdminRole.map(Number).sort()
      const oldAdmin = existAdminRole.split(',').map(Number).sort()
      return JSON.stringify(newAdmin) === JSON.stringify(oldAdmin)
    }

    if (userInfoValid && imgValid && userRoleValid() && adminRoleValid()) {
      isDisableButton(true)
    } else {
      isDisableButton(false)
    }
  }, [userInfoValid, imgValid, requestUserRole, editUserRole?.reqNum, userRole, editAdminRole, existAdminRole])

  return (
    <>
      <article>
        <div className="cont_title_box">
          <p className="title1">User Information</p>
        </div>
        <DetailTable
          colgroup={
            <colgroup>
              <col style={{ width: '12%' }} />
              <col style={{ width: '38%' }} />
              <col style={{ width: '12%' }} />
              <col style={{ width: '38%' }} />
            </colgroup>
          }
        >
          <tr>
            {/* className="required" */}
            <th>Name</th>
            <td className="pr_150">
              {findUserEmailCorp(userInfo?.emlId) === 'seegene' ? (
                <BaseInput value={userInfo?.usrNm || ''} disabled />
              ) : (
                <BaseInput
                  name="usrNm"
                  value={newUserInfo?.usrNm || ''}
                  onChange={(event) => {
                    handleChange(event)
                  }}
                />
              )}
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
              <BaseInput value={userInfo?.orgnNm || ''} disabled />
            </td>
          </tr>
          <tr>
            <th>Job title</th>
            <td className="pr_150">
              <BaseInput value={userInfo?.jobTitl || ''} disabled />
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
                maxLength={20}
                name="jobNm"
                value={newUserInfo?.jobNm || ''}
                onChange={(event) => {
                  handleChange(event)
                }}
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
              <div className="cont_title_box pt_60">
                <p className="title1">Roles</p>
              </div>
            </th>
          </tr>
          <tr>
            <th className="va_top">
              <p className="required pt_8">User role</p>
            </th>
            <td className="va_top pr_150">
              {userRole?.length > 0 ? (
                userRoleChangeRequested && userRoleChangeRequested[0]?.userRolNm ? (
                  <>
                    <SelectMui
                      disabled
                      name="reqNum"
                      options={userRoleListSelect}
                      value={editUserRole?.reqNum}
                      size="large"
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
                    size="full"
                    onChange={(event) => {
                      handleUserRoleChange(event)
                    }}
                  />
                )
              ) : null}
            </td>

            <th className="va_top">
              <p className=" pt_8">Admin Role</p>
            </th>
            <td className="va_top">
              {adminRoleChangeRequested?.length === undefined || (adminRoleChangeRequested && adminRoleChangeRequested === null) ? ( //admin role x, request admin role x
                <MultiSelectMui
                  options={adminRoleListSelect}
                  value={editAdminRole}
                  size="large"
                  placeholder={adminRole?.length > 0 ? '-' : 'Please select admin roles.'}
                  onChange={(e: SelectChangeEvent<string[]>) => {
                    const tgt = e.target.value
                    editAdminRole.find((v) => !tgt.includes(v))
                      ? setEditAdminRole(editAdminRole.filter((v) => tgt.includes(v)))
                      : setEditAdminRole([...editAdminRole, tgt.at(-1)])
                  }}
                />
              ) : adminRoleChangeRequested?.length === 0 ? ( //admin === request admin => none
                <>
                  <MultiSelectMui
                    disabled
                    options={adminRoleListSelect}
                    value={editAdminRole}
                    size="large"
                    placeholder="-"
                    onChange={(e: SelectChangeEvent<string[]>) => {
                      const tgt = e.target.value
                      editAdminRole.find((v) => !tgt.includes(v))
                        ? setEditAdminRole(editAdminRole.filter((v) => tgt.includes(v)))
                        : setEditAdminRole([...editAdminRole, tgt.at(-1)])
                    }}
                  />
                  <div className="ptb_6 mt_10">
                    <Badge uiType="solid">Change requested</Badge>
                    {/* <span className="ml_10">{adminRoleString === adminRequestRoleString ? '-' : requestAdminRole}</span> */}
                    <span className="ml_10">-</span>
                  </div>
                </>
              ) : (
                //adminrole o, request role o
                <>
                  <MultiSelectMui
                    disabled
                    options={adminRoleListSelect}
                    value={editAdminRole}
                    size="large"
                    placeholder="-"
                    onChange={(e: SelectChangeEvent<string[]>) => {
                      const tgt = e.target.value
                      editAdminRole.find((v) => !tgt.includes(v))
                        ? setEditAdminRole(editAdminRole.filter((v) => tgt.includes(v)))
                        : setEditAdminRole([...editAdminRole, tgt.at(-1)])
                    }}
                  />
                  <div className="ptb_6 mt_10">
                    <Badge uiType="solid">Change requested</Badge>
                    <span className="ml_10">{adminRequestRoleName}</span>
                  </div>
                </>
              )}
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
              router.push(`/mypage`)
            }}
          >
            Cancel
          </ButtonMui>
          <ButtonMui
            // disabled={userInfoValid && imgValid && userRoleValid() && adminRoleValid()}
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

export default MySeegeneProfileEdit
