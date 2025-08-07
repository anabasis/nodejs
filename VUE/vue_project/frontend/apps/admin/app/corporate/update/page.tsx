/**
 * 작성자 : 양수연
 * 화면 : AO1.2.1 Corporate_ Corporate 수정
 * path : /corporate/update?id=${id}
 */
'use client'
import { getCorporateDetail } from '@api/corporate'
import { corporateLevelState, levelState, roleLevel, schema, statusDetailState } from '@constant/corporateOption'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCorporateCommon, useCorporateMutation } from '@store/server/useCorporateQuery'
import { CorporateBasicInfo, CorporateCommonCodes, CorporateForm } from '@type/corporate/corporateType'
import { AlertType, isEmptyAnyPropertyCheck, useAlert, useCode } from 'library'
import { useToastPopup } from 'library/hook/useToastPopup'
import { debounce as _debounce } from 'lodash-es'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import { AutoComplete, BaseInput, Breadcrumb, ButtonMui, ContentBox, DetailTable, InputDec, InputLabel, SelectMui, SwitchToggle, TextArea } from 'ui'

const pageTitleList = [`Corporate`, `Corporate Detail`, `Edit Corporate`]
const commonCodes = {
  status: 'PFM048', //Corporate Status Code
}

const authOnOff = {
  Y: true,
  N: false,
}

const CorporateUpdate = () => {
  const router = useRouter()
  const [basicInfo, setBasicInfo] = useState<CorporateBasicInfo>() //기본정보
  const searchParams = useSearchParams()
  const corporateId = searchParams.get('id')
  const { userList, managerUserId } = useCorporateCommon()
  const { modifyCorporateMutation, modifyCorporateIsLoading } = useCorporateMutation()

  const { toastOpen, getToastState } = useToastPopup()
  const { alertOpen, alertClose } = useAlert()
  const { cCode } = useCode(commonCodes) as { cCode: CorporateCommonCodes }
  //버튼 로딩중?
  const [loading, isLoading] = useState<boolean>(false)

  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const findRepresentative =
    Array.isArray(userList) &&
    userList
      .filter((user) => user.userUid === basicInfo?.managerUserUuId)
      .map((user) => {
        return `${user.fullName} ${user.organizationName}`
      })
  const manager = findRepresentative[0]

  //useForm으로 {...register} 사용했을때 onSubmit안됨, useForm name 태그 사용못함 -> useController 사용
  const { field: corporationNameField, fieldState: corporationNameFieldState } = useController({ name: 'corporationName', control })
  const { field: roleLevelField, fieldState: roleLevelFieldState } = useController({ name: 'roleLevel', control })
  const { field: corporateStatusCodeField, fieldState: corporateStatusCodeFieldState } = useController({
    name: 'corporateStatusCode',
    control,
    defaultValue: basicInfo?.corporateStatusCode,
  })
  const { field: corporateLevelCodeField, fieldState: corporateLevelCodeFieldState } = useController({ name: 'corporateLevelCode', control })
  const { field: domainNameField, fieldState: domainNameFieldState } = useController({ name: 'domainName', control })
  const { field: nationField, fieldState: nationFieldState } = useController({ name: 'nation', control })
  const { field: representativeEmailAddressField, fieldState: representativeEmailAddressFieldState } = useController({
    name: 'representativeEmailAddress',
    control,
  })
  const { field: managerUserIdField, fieldState: managerUserIdFieldState } = useController({ name: 'managerUserId', control })
  const { field: otpAuthYnField, fieldState: otpAuthYnFieldState } = useController({ name: 'otpAuthYn', control, defaultValue: 'Y' })
  const { field: descriptionField, fieldState: descriptionFieldState } = useController({ name: 'description', control })

  const [otpAuthYn, setOtpAuthYn] = useState(basicInfo?.otpAuthYn === 'Y')

  //status
  const selectData = useMemo(() => {
    if (!cCode || isEmptyAnyPropertyCheck(cCode)) {
      return []
    }
    const { status } = cCode
    return { status }
  }, [cCode]) as CorporateCommonCodes

  const [selected, setSelected] = useState([])

  const handleSelectedChange = (newSelected) => {
    setSelected(newSelected)
  }

  const changeTwoFactor = authOnOff[basicInfo?.otpAuthYn] === otpAuthYn

  //등록했을 때와 같은 직원인지, two factor가 같은지
  const isRepresentativeChange = () => {
    return basicInfo?.managerUserUuId === selected[0]?.value && changeTwoFactor
  }

  useEffect(() => {
    //1. 코드 기본 정보 API
    getCorporateDetail(corporateId).then((response) => {
      setBasicInfo(response)

      reset({
        roleLevel: response.roleLevel,
        corporationName: response.corporationName,
        corporateStatusCode: statusDetailState[response.corporateStatusCode],
        representativeEmailAddress: response.representativeEmailAddress,
        description: response.description,
        domainName: response.domain,
        nation: response.nation,
        corporateLevelCode: corporateLevelState[response.corporateLevelCode],
        // otpAuthYn: authOnOff[response.data.otpAuthYn],
      })
    })
  }, [reset])

  useEffect(() => {
    if (basicInfo?.otpAuthYn) setOtpAuthYn(basicInfo?.otpAuthYn === 'Y')
  }, [basicInfo])

  useEffect(() => {
    if (manager) {
      const managerOption = managerUserId.find((option) => option.label === manager)
      if (managerOption) {
        setSelected([managerOption])
      }
    }
  }, [manager]) //Representative(Seegene)읽기위해 필요

  const handleClick = () => {
    handleSubmit(onSubmit)()
  }

  const onSubmit = _debounce((modifyData: CorporateForm) => {
    if (loading) {
      return
    }
    isLoading(true)

    //role, status 코드 변환
    modifyData.corporateLevelCode = levelState[modifyData.corporateLevelCode]
    modifyData.roleLevel = levelState[modifyData.roleLevel]
    modifyData.managerUserId = selected.map((data) => data.value)[0]
    modifyData.otpAuthYn = otpAuthYn ? 'Y' : 'N'

    //수정api
    modifyCorporateMutation({ corporateId, modifyData })
    isLoading(false)
    reset()
  }, 300)

  const cancel = () => {
    const alertState: AlertType = {
      InfoType: 'cancel',
      content: (
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            Cancel
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={() => router.push(`/corporate`)}>
            OK
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
  }

  return (
    <>
      {/* 헤더 */}
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">{`${basicInfo && basicInfo.corporationName}`}</h1>
          </div>
        </ContentBox>
      </div>
      <ContentBox>
        <p className="title1 mb_8">Basic Information</p>
        <p className="body2 typo500">Items marked with * are required.</p>
        {basicInfo && (
          <>
            <form className="mt_30">
              <DetailTable
                colgroup={
                  <colgroup>
                    <col width="180px" />
                    <col width="auto" />
                    <col width="180px" />
                    <col width="auto" />
                  </colgroup>
                }
              >
                <tr>
                  <th>
                    <InputLabel labelText="No" />
                  </th>
                  <td>
                    <BaseInput disabled value={basicInfo.corporationNum.toString()} />
                  </td>
                  <th></th>
                  <td></td>
                </tr>

                <tr>
                  <th>
                    <InputLabel labelText="Corporate level" />
                  </th>
                  <td>
                    <BaseInput disabled {...corporateLevelCodeField} />
                  </td>
                  <th>
                    <InputLabel labelText="Role Level" required />
                  </th>
                  <td>
                    <SelectMui size="full" options={roleLevel} {...roleLevelField} {...register} />
                  </td>
                </tr>
                <tr>
                  <th>
                    <InputLabel labelText="Corporate Name" required />
                  </th>
                  <td>
                    {corporationNameFieldState.error?.type === 'max' ? (
                      <>
                        <BaseInput {...corporationNameField} {...register} error />
                        <InputDec msg="Corporate Name must be at most 100 characters" error />
                      </>
                    ) : corporationNameFieldState.error ? (
                      <>
                        <BaseInput {...corporationNameField} {...register} error />
                        <InputDec msg="Please enter corporate name." error />
                      </>
                    ) : (
                      <BaseInput {...corporationNameField} {...register} />
                    )}
                  </td>
                  <th>
                    <InputLabel labelText="Status" required />
                  </th>
                  <td>
                    <SelectMui size="full" options={selectData?.status} {...corporateStatusCodeField} />
                  </td>
                </tr>
                <tr>
                  <th>
                    <InputLabel labelText="Domain Information" required />
                  </th>
                  <td>
                    <BaseInput disabled {...domainNameField} />
                  </td>
                  <th>
                    <InputLabel labelText="Country" required />
                  </th>
                  <td>
                    <BaseInput disabled {...nationField} />
                  </td>
                </tr>
                <tr>
                  <th>
                    <InputLabel labelText="Contact" required />
                  </th>
                  <td>
                    <BaseInput {...representativeEmailAddressField} {...register} />
                  </td>
                  <th>
                    <InputLabel labelText="Representative(Seegene)" required />
                  </th>
                  <td>
                    <AutoComplete
                      placeholder={manager}
                      options={managerUserId}
                      selected={selected}
                      onChangeSelected={handleSelectedChange}
                      size="full"
                      {...managerUserIdField}
                      {...register}
                    />
                  </td>
                </tr>
                <tr>
                  <th className="">
                    <InputLabel labelText="Two-factor authentication" required />
                  </th>
                  <td colSpan={3}>
                    <SwitchToggle
                      id={otpAuthYnField.name}
                      color="primary"
                      text="ON"
                      value={otpAuthYn}
                      onChange={() => {
                        setOtpAuthYn(!otpAuthYn)
                      }}
                    />
                  </td>
                </tr>
                <tr>
                  <th className="va_top">
                    <InputLabel labelText="Description" />
                  </th>
                  <td colSpan={3}>
                    <TextArea placeholder="Please enter content." {...descriptionField} {...register} />
                  </td>
                </tr>
              </DetailTable>
            </form>
            <div className="cont_bottom_box">
              <div className="align end">
                <ButtonMui
                  type="outlined"
                  size="xlarge"
                  onClick={() => {
                    cancel()
                  }}
                >
                  Cancel
                </ButtonMui>
                <ButtonMui
                  disabled={(!isDirty && isRepresentativeChange()) || !isValid}
                  type="contained"
                  size="xlarge"
                  // uiType={loading ? 'loading' : ''}
                  // icon={loading ? 'Loading' : null}
                  isLoading={modifyCorporateIsLoading}
                  onClick={() => {
                    handleClick()
                  }}
                >
                  Save
                </ButtonMui>
              </div>
            </div>
          </>
        )}
      </ContentBox>
    </>
  )
}
export default CorporateUpdate
