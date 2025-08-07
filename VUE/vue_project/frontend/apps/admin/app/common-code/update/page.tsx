/**
 * 작성자 : 양수연
 * 화면 : AD1.2.1 공통 코드_공통 코드 상세_공통 코드 수정
 * path : /common-code/detail?id=${id}
 */

'use client'
import { getCommonLanguageList } from '@api/common'
import { getCommonCodeBasicInfo, getCommonCodeItemInfo } from '@api/common-code'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCommonCodeMutation } from '@store/server/useCommonCodeQuery'
import { AllLanguage, changeLanguage, schema } from 'lib/constant/commonCodeOption'
import { CCBasicInformation, CommonCodeForm, CCItemInformation } from 'lib/type/common-code/commonCodeType'
import { AlertType, changeTimeLocal, useAlert } from 'library'
import { standardCodeHeader } from 'library/constant/table'
import { useToastPopup } from 'library/hook/useToastPopup'
import { debounce as _debounce } from 'lodash-es'
import { useRouter, useSearchParams } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'
import { Controller, useController, useFieldArray, useForm } from 'react-hook-form'
import { Badge, BaseInput, BoardTable, Breadcrumb, DetailTable, InputLabel, RoundTab, SwitchToggle } from 'ui/components'
import { ContentBox } from 'ui/layouts'
import { ButtonMui } from 'ui/mui'

const pageTitleList = [`Standard Code`, `Edit Standard Code`]

const CommonCodeEdit = () => {
  const router = useRouter()
  const [basicInfo, setBasicInfo] = useState<CCBasicInformation>() //기본정보
  const [detailMessage, setDetailMessage] = useState<CCItemInformation[]>() //아이템정보
  const [languageCode, setLanguageCode] = useState([])
  const [useYn, setUseYn] = useState(true)
  //버튼 로딩중?
  const [loading, isLoading] = useState(false)

  const [languageIndex, setLanguageIndex] = useState(0)
  const { toastOpen, getToastState } = useToastPopup()
  const { alertOpen, alertClose } = useAlert()

  //codeGroupId
  const searchParam = useSearchParams()
  const id = searchParam.get('id')

  //공통코드 폼 (react-hook-form)
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    register,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    //2. 아이템 정보 API
    getCommonCodeItemInfo({ id }).then((response) => {
      setDetailMessage(response.data)
      reset((prev) => ({
        ...prev,
        codeItemList: response.data,
      }))
    })
  }, [reset, id])

  useEffect(() => {
    //1. 코드 기본 정보 API
    getCommonCodeBasicInfo({ id }).then((response) => {
      setBasicInfo(response.data)
      reset({
        codeGroupName: response.data.codeGroupName,
        codeGroupId: response.data.code,
        codeItemList: detailMessage,
      })
    })
  }, [reset, id, detailMessage])

  useEffect(() => {
    // detailMessage 배열이 유효한 경우에만 실행
    if (Array.isArray(detailMessage)) {
      const generatedChipNumber = detailMessage
        .map((item) => (item.codeItemMultiLanguageList.length === 2 ? [0] : item.codeItemMultiLanguageList.map((data) => (data.languageCode === 'en' ? 1 : 2))))
        .flat()
      // chipNumber 배열이 비어있지 않은 경우에만 languageIndex 초기값 설정
      if (generatedChipNumber.length > 0) {
        setLanguageIndex(generatedChipNumber[0])
      }
    }
  }, [detailMessage])

  useEffect(() => {
    getCommonLanguageList().then((response) => {
      setLanguageCode(response)
      basicInfo
      detailMessage
      changeLanguage
    })
  }, [])

  const { field: codeGroupField, fieldState: codeGroupFieldState } = useController({ name: 'codeGroupName', control })
  const { field: codeNameField, fieldState: codeNameFieldState } = useController({ name: 'codeGroupId', control })
  const { fields, append, remove, update } = useFieldArray({ name: 'codeItemList', control })
  const { modifyCommonCodeMutation, modifyCommonCodeIsLoading } = useCommonCodeMutation()

  //sortnumber재정렬
  fields.map((data, i) => {
    data.sortNumber = i + 1
  })

  //언어탭 이동시 기본 데이터 남기기
  const existCommonCodeForm = () => {
    return detailMessage?.map((item, index) => ({
      sortNumber: item.sortNumber,
      code: item.code,
      codeItemMultiLanguageList: [
        { languageCode: 'en', codeName: item.codeItemMultiLanguageList[index]?.codeName },
        { languageCode: 'ko', codeName: item.codeItemMultiLanguageList[index]?.codeName },
      ],
    }))
  }

  //공통코드 수정
  const onSubmit = _debounce(async (data: CommonCodeForm) => {
    if (loading) {
      return
    }
    isLoading(true)
    modifyCommonCodeMutation({ data })
    isLoading(false)
  }, 300)

  //언어 칩
  const languageCodeTab =
    detailMessage &&
    detailMessage[0].codeItemMultiLanguageList.map((item) => {
      const name = languageCode.find((code) => code.languageCode === item.languageCode)
      return {
        tabName: name?.languageName,
        value: name?.languageCode,
      }
    })

  //입력 폼의 language
  const findLanguageNames =
    detailMessage &&
    detailMessage[0]?.codeItemMultiLanguageList.map((item) => {
      const name = languageCode.find((code) => code.languageCode === item.languageCode)
      return name ? name.languageName : null
    })

  //add item 기본 폼(언어코드 api 전부)
  const codeItemMultiLanguageList = Array.from({ length: languageCode.length }, () => ({ languageCode: '', codeName: '' }))
  languageCode.forEach((language, index) => {
    codeItemMultiLanguageList[index].languageCode = language.languageCode
  })
  //languageCodeTab value(ex. 'en','ko')
  const existArrayForm = new Set(languageCodeTab?.map((item) => item.value))
  //languageCodeTab value에 있는 것만 남기기
  const addForm = codeItemMultiLanguageList.filter((item) => existArrayForm.has(item.languageCode))

  const cancel = () => {
    const alertState: AlertType = {
      InfoType: 'cancel',
      content: (
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            Cancel
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={() => router.push(`/common-code`)}>
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
            <h1 className="page_title">{basicInfo && basicInfo.codeGroupName}</h1>
          </div>
        </ContentBox>
      </div>
      <ContentBox>
        <form className="align flex1 column">
          <article>
            {/* 컨텐츠 간 간격은 article 로 묶습니다. */}
            <div className="cont_title_box">
              <p className="title1">Basic Information</p>
              {/* <p className="body2">공통 코드의 기본 정보를 입력해주세요.</p> */}
            </div>
            {basicInfo && (
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
                  <th>
                    <InputLabel labelText="Code" />
                  </th>
                  <td>
                    <BaseInput size="lg" {...codeNameField} disabled />
                  </td>
                </tr>
                <tr>
                  <th>
                    <InputLabel labelText="Code group name" />
                  </th>
                  <td>
                    <BaseInput size="lg" {...codeGroupField} maxLength={40} />
                  </td>
                  <th>
                    <InputLabel labelText="Date of creation" />
                  </th>
                  <td>
                    <BaseInput size="lg" value={changeTimeLocal({ time: basicInfo.createDateTime, type: 'yyyy-MM-dd' })} disabled />
                  </td>
                </tr>
                <tr>
                  <th>
                    <InputLabel labelText="Last modified date" />
                  </th>
                  <td>
                    <BaseInput size="lg" value={changeTimeLocal({ time: basicInfo.modifyDateTime, type: 'yyyy-MM-dd' })} disabled />
                  </td>
                  <th>
                    <InputLabel labelText="Editor" />
                  </th>
                  <td>
                    <BaseInput size="lg" value={basicInfo.editor} disabled />
                  </td>
                </tr>
              </DetailTable>
            )}
          </article>
          {detailMessage && languageCode && (
            <article>
              {/* 컨텐츠 간 간격은 article 로 묶습니다. */}
              <div className="cont_title_box">
                <div className="align start">
                  <p className="title1 mr_10">Item Information</p>
                  <Badge uiType="solid" color="blue" style="count" size="sm">
                    {fields.length}
                  </Badge>
                </div>
                <p className="body2">Please enter code item information.</p>
              </div>
              <div className="align">
                <div className="lft">
                  <RoundTab
                    tabData={[{ tabName: 'All', value: 'all' }].concat(languageCodeTab)}
                    value={0}
                    isDisabledTab={true}
                    // onChange={() => {}}
                    // onTabClick={handleTabClick}
                  />
                </div>
                <div className="rgt">
                  <ButtonMui
                    color="black"
                    onClick={() => {
                      append(AllLanguage(fields.length + 1, addForm, useYn))
                    }}
                    size="medium"
                    type="contained"
                  >
                    Add Item
                  </ButtonMui>
                </div>
              </div>
              <BoardTable>
                <colgroup>
                  <col width="10%" />
                  <col width="22%" />
                  <col width="18%" />
                  <col width="auto" />
                  <col width="4%" />
                </colgroup>
                <thead>
                  <tr>
                    {standardCodeHeader.map((theader, i) => (
                      <th key={i}>{theader}</th>
                    ))}
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {fields.map((data, index) =>
                    //tab변경(언어 종류)에 따라 화면 다름
                    {
                      return (
                        <Fragment key={data.id}>
                          {data.codeItemMultiLanguageList.map((item, i) => (
                            <tr key={`${index}-${i}`}>
                              {i === 0 && (
                                <td rowSpan={data.codeItemMultiLanguageList.length} className="vt">
                                  <Controller
                                    name={`codeItemList.${index}.useYn`}
                                    control={control}
                                    render={({ field }) => (
                                      <SwitchToggle
                                        {...field}
                                        {...register}
                                        id={`codeItemList.${index}.useYn`}
                                        color="primary"
                                        value={field.value === 'Y'}
                                        onChange={() => {
                                          field.onChange(field.value === 'Y' ? 'N' : 'Y')
                                        }}
                                      />
                                    )}
                                  />
                                </td>
                              )}
                              {i === 0 && (
                                <td rowSpan={data.codeItemMultiLanguageList.length} className="vt pr_12">
                                  <Controller
                                    // name={`codeItemList.${index}.code`}
                                    name={`codeItemList.${index}.code`}
                                    control={control}
                                    render={({ field }) => (
                                      <BaseInput
                                        {...field}
                                        {...register}
                                        maxLength={20}
                                        onChange={(e) => {
                                          //중간 데이터 삭제시 바로 밑 하단 데이터 item code삭제 방지
                                          field.onChange(e)
                                          fields[index].code = e.target.value
                                        }}
                                      />
                                    )}
                                  />
                                </td>
                              )}
                              {/* <td>{chageLanguage(item.languageCode)}</td> */}
                              <td className="pl_12">
                                <Controller
                                  name={`codeItemList.${index}.codeItemMultiLanguageList.${i}.languageCode`}
                                  control={control}
                                  render={({ field }) => {
                                    const code = findLanguageNames
                                    return <span>{code[i]}</span>
                                  }}
                                />
                              </td>
                              <td>
                                <Controller
                                  name={`codeItemList.${index}.codeItemMultiLanguageList.${i}.codeName`}
                                  control={control}
                                  render={({ field }) => <BaseInput {...field} maxLength={100} />}
                                />
                              </td>
                              {i === 0 && (
                                <td className="vt" rowSpan={data.codeItemMultiLanguageList.length}>
                                  <ButtonMui
                                    disabled={fields.length === 1} //아이템 코드가 하나면 삭제 못함
                                    type="text"
                                    size="xsmall"
                                    color="error"
                                    icon="DeleteIcon"
                                    iconStyle={{
                                      width: 20,
                                      height: 20,
                                      fill: fields.length === 1 ? 'var(--navy100)' : 'var(--navy800)',
                                    }}
                                    onClick={() => {
                                      // 선택한 아이템의 sortnumber 가져오기
                                      // const sortnumberToRemove = fields[index].sortNumber
                                      remove(index)
                                      // itemCodeReSort(sortnumberToRemove)
                                    }}
                                  />
                                </td>
                              )}
                            </tr>
                          ))}
                        </Fragment>
                      )
                    }
                  )}
                </tbody>
              </BoardTable>
            </article>
          )}
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
                disabled={!isDirty || !isValid} //변경사항이 있을 경우 활성화
                type="contained"
                size="xlarge"
                isLoading={modifyCommonCodeIsLoading}
                onClick={async () => {
                  await handleSubmit(onSubmit)()
                }}
              >
                Save
              </ButtonMui>
            </div>
          </div>
        </form>
      </ContentBox>
    </>
  )
}
export default CommonCodeEdit
