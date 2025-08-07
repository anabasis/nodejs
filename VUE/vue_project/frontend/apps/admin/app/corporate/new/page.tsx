/**
 * 작성자 : 양수연
 * 화면 : AO.1.1 Corporate 추가
 * path : /corporate/new
 */
//TODO: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCorporateCommon } from '@store/server/useCorporateQuery'
import { CorporateCommonCodes } from '@type/corporate/corporateType'
import { levelState, roleLevel, schema } from 'lib/constant/corporateOption'
import { AlertType, apiAdmin, isEmptyAnyPropertyCheck, useAlert, useCode } from 'library'
import { useToastPopup } from 'library/hook/useToastPopup'
import { debounce as _debounce } from 'lodash-es'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import { AutoComplete, BaseInput, Breadcrumb, ButtonMui, ContentBox, DetailTable, InputDec, SelectMui, SwitchToggle, TextArea } from 'ui'
import * as yup from 'yup'

const pageTitleList = [`Corporate`, `Add Corporate`]
const commonCodes = {
  status: 'PFM048', //Corporate Status Code
}
const CorporateRegister = () => {
  const router = useRouter()
  const { countryList, managerUserId } = useCorporateCommon()

  type CorporateForm = yup.InferType<typeof schema>
  const { alertOpen, alertClose } = useAlert()
  const { toastOpen, getToastState } = useToastPopup()
  const { cCode } = useCode(commonCodes) as { cCode: CorporateCommonCodes }
  //버튼 로딩중?
  const [loading, isLoading] = useState<boolean>(false)

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid }, //isValid : 폼에 에러 없으면 true
  } = useForm({
    mode: 'onChange', //isValid 사용하려면 필요
    resolver: yupResolver(schema),
  })
  //useForm으로 {...register} 사용했을때 onSubmit안됨, useForm name 태그 사용못함 -> useController 사용
  const { field: corporationNameField, fieldState: corporationNameFieldState } = useController({ name: 'corporationName', control, defaultValue: '' })
  const { field: roleLevelField, fieldState: roleLevelFieldState } = useController({ name: 'roleLevel', control, defaultValue: 'B' })
  const { field: corporateStatusCodeField, fieldState: corporateStatusCodeFieldState } = useController({
    name: 'corporateStatusCode',
    control,
    defaultValue: '',
  })
  const { field: corporateLevelCodeField, fieldState: corporateLevelCodeFieldState } = useController({
    name: 'corporateLevelCode',
    control,
    defaultValue: 'Level2',
  })
  const { field: domainNameField, fieldState: domainNameFieldState } = useController({ name: 'domainName', control, defaultValue: '' })
  const { field: nationField, fieldState: nationFieldState } = useController({ name: 'nation', control, defaultValue: '' })
  const { field: representativeEmailAddressField, fieldState: representativeEmailAddressFieldState } = useController({
    name: 'representativeEmailAddress',
    control,
    defaultValue: '',
  })
  const { field: managerUserIdField, fieldState: managerUserIdFieldState } = useController({ name: 'managerUserId', control, defaultValue: '' })
  const { field: otpAuthYnField, fieldState: otpAuthYnFieldState } = useController({ name: 'otpAuthYn', control, defaultValue: 'Y' })
  const { field: descriptionField, fieldState: descriptionFieldState } = useController({ name: 'description', control, defaultValue: '' })

  const [otpAuthYn, setOtpAuthYn] = useState(true)

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

  const handleClick = () => {
    handleSubmit(onSubmit)()
  }

  const onSubmit = (data: CorporateForm) => {
    if (loading) {
      return
    }

    isLoading(true)

    const alertState: AlertType = {
      icon: 'info',
      title: 'Check domain',
      maxWidth: 's',
      textTitle: (
        <>
          <span>
            Domain and country information cannot be modified after being saved. <br />
            Please double check that the information below is correct.
            <hr className="mt_30" />
          </span>
        </>
      ),
      content: (
        <>
          <DetailTable
            colgroup={
              <colgroup>
                <col width="180px" />
                <col width="auto" />
              </colgroup>
            }
          >
            <tr>
              <th>Domain information</th>
              <td>{data.domainName}</td>
            </tr>
          </DetailTable>
          <div className="align center mt_30">
            <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
              Cancel
            </ButtonMui>
            <ButtonMui
              size="xlarge"
              onClick={_debounce(() => {
                //role, status 코드 변환
                //NewCo -> LV2
                setValue('corporateLevelCode', levelState[data.corporateLevelCode])
                //B -> LV2
                setValue('roleLevel', levelState[data.roleLevel])
                //이씨젠 시약개발 부서 -> uid
                setValue('managerUserId', selected.map((data) => data.value)[0])
                //otp ?
                otpAuthYn ? setValue('otpAuthYn', 'Y') : setValue('otpAuthYn', 'N')
                apiAdmin
                  .post(`/corporate/add`, data)
                  .then(() => {
                    isLoading(false)
                    toastOpen(getToastState({ content: 'Successfully added.', icon: 'success' }))
                    router.push(`/corporate`)
                  })
                  .catch((error) => {
                    isLoading(false)
                    console.error(error)
                    toastOpen(getToastState({ content: 'Add failed.', icon: 'warning' }))
                    setValue('corporateLevelCode', 'Level2')
                    setValue('roleLevel', 'B')
                  })
              }, 300)}
            >
              OK
            </ButtonMui>
          </div>
        </>
      ),
    }
    alertOpen(alertState)
  }

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
            <h1 className="headline1">Add Corporate</h1>
          </div>
        </ContentBox>
      </div>
      {/* 입력정보 */}
      <ContentBox>
        <form className="align flex1 column">
          <article>
            <div className="cont_title_box">
              <p className="title1 mb_8">Data Input</p>
              <p className="body2 typo500 mb_30">Items marked with * are required.</p>
            </div>
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
                <th>Corporate level</th>
                <td>
                  <BaseInput disabled {...corporateLevelCodeField} />
                </td>
                <th>
                  <span className="required">Role level</span>
                </th>
                <td>
                  <SelectMui size="full" options={roleLevel} {...roleLevelField} />
                </td>
              </tr>
              <tr>
                <th>
                  <span className="required">Corporate name</span>
                </th>
                <td>
                  {corporationNameFieldState.error?.type === 'max' ? (
                    <>
                      <BaseInput {...corporationNameField} placeholder="Please enter corporate name." error />
                      <InputDec msg="Corporate Name must be at most 100 characters" error />
                    </>
                  ) : corporationNameFieldState.error ? (
                    <>
                      <BaseInput {...corporationNameField} placeholder="Please enter corporate name." error />
                      <InputDec msg="Please enter corporate name." error />
                    </>
                  ) : (
                    <BaseInput {...corporationNameField} placeholder="Please enter corporate name." />
                  )}
                </td>
                <th>
                  <span className="required">Status</span>
                </th>
                <td>
                  <SelectMui size="full" options={selectData?.status} {...corporateStatusCodeField} placeholder="Please select corporate current status." />
                </td>
              </tr>

              <tr>
                <th className="va_top pt_10">
                  <span className="required">Domain information</span>
                </th>
                <td>
                  {domainNameFieldState.error ? (
                    <>
                      <BaseInput {...domainNameField} placeholder="Enter the domain information to use as corporate Email account." error />
                      <InputDec msg="Please enter a valid domain. ex) @seegene.com" error />
                    </>
                  ) : (
                    <BaseInput {...domainNameField} placeholder="Enter the domain information to use as corporate Email account." />
                  )}
                </td>
                <th>
                  <span className="required">Country</span>
                </th>
                <td>
                  {nationFieldState.error ? (
                    <>
                      <SelectMui size="full" options={countryList} {...nationField} placeholder="Please select country of corporate located." />{' '}
                      <InputDec msg="Please select country of corporate located." error />
                    </>
                  ) : (
                    <SelectMui size="full" options={countryList} {...nationField} placeholder="Please select country of corporate located." />
                  )}
                </td>
              </tr>
              <tr>
                <th className="va_top">
                  <span className="required">Contact</span>
                </th>
                <td>
                  {representativeEmailAddressFieldState.error ? (
                    <>
                      <BaseInput {...representativeEmailAddressField} placeholder="Please enter Email." error />
                      <InputDec msg="Please enter right Email address." error />
                    </>
                  ) : (
                    <BaseInput {...representativeEmailAddressField} placeholder="Please enter Email." />
                  )}
                </td>
                <th>
                  <span className="required">Representative(Seegene)</span>
                </th>
                <td>
                  <AutoComplete
                    size="full"
                    options={managerUserId}
                    selected={selected}
                    onChangeSelected={handleSelectedChange}
                    placeholder="Please choose corporate representative."
                    {...managerUserIdField}
                  />
                </td>
              </tr>
              <tr>
                <th className="va_top">
                  <span className="required">Two-factor authentication</span>
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
                <th className="va_top">Description</th>
                <td colSpan={3}>
                  {descriptionFieldState.error?.type === 'max' ? (
                    <>
                      <TextArea {...descriptionField} placeholder="Please enter content." error maxLength={500} />
                      <InputDec msg="Description must be at most 500 characters" error />
                    </>
                  ) : (
                    <TextArea {...descriptionField} placeholder="Please enter content." maxLength={500} />
                  )}
                </td>
              </tr>
            </DetailTable>
          </article>
          <div className="cont_bottom_box">
            <div className="align end">
              <ButtonMui type="outlined" size="xlarge" onClick={() => cancel()}>
                Cancel
              </ButtonMui>
              {/* disabled = 폼에 에러 없으면 false */}
              <ButtonMui
                type="contained"
                disabled={!isValid || selected.length === 0}
                uiType={loading ? 'loading' : ''}
                icon={loading ? 'Loading' : null}
                size="xlarge"
                onClick={() => handleClick()}
              >
                Add
              </ButtonMui>
            </div>
          </div>
        </form>
      </ContentBox>
    </>
  )
}
export default CorporateRegister
