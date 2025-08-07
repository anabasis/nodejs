/**
 * 작성자 : 양수연
 * 화면 : AD1.1 공통 코드_공통 코드 추가
 * path : /common-code/new
 */

'use client'
import { getCommonLanguageList } from '@api/common'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCommonCodeMutation } from '@store/server/useCommonCodeQuery'
import { AllLanguage, schema } from 'lib/constant/commonCodeOption'
import { CommonCodeForm } from 'lib/type/common-code/commonCodeType'
import { AlertType, useAlert } from 'library'
import { standardCodeHeader } from 'library/constant/table'
import { debounce as _debounce } from 'lodash-es'
import { useRouter } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'
import { Controller, useController, useFieldArray, useForm } from 'react-hook-form'
import { Badge, BaseInput, BoardTable, Breadcrumb, DetailTable, InputLabel, RoundTab, SwitchToggle } from 'ui/components'
import { ContentBox } from 'ui/layouts'
import { ButtonMui } from 'ui/mui'

const pageTitleList = [`Standard Code`, `Add Standard Code`]

const NewCode = () => {
  const router = useRouter()
  const { alertOpen, alertClose } = useAlert()
  const [languageCode, setLanguageCode] = useState([])
  const [language, setLanguage] = useState(null)
  const [codeItemMultiLanguageList, setCodeItemMultiLanguageList] = useState(languageCode.map((code) => ({ languageCode: code.languageCode, codeName: '' })))
  const [useYn, setUseYn] = useState<boolean>(true)
  //버튼 로딩중?
  const [loading, isLoading] = useState<boolean>(false)

  const { addCommonCodeMutation, addCommonCodeIsLoading } = useCommonCodeMutation()

  //공통코드 폼 (react-hook-form)
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      codeGroupName: '',
      codeGroupId: '',
      codeItemList: [
        {
          sortNumber: 1,
          code: '',
          useYn: useYn ? 'Y' : 'N',
          codeItemMultiLanguageList: codeItemMultiLanguageList,
        },
      ],
    },
  })

  const { field: codeGroupField, fieldState: codeGroupFieldState } = useController({ name: 'codeGroupName', control })
  const { field: codeNameField, fieldState: codeNameFieldState } = useController({ name: 'codeGroupId', control })
  const { fields, append, remove, update } = useFieldArray({ name: 'codeItemList', control })

  //save[btn] click
  const handleClick = () => {
    handleSubmit(onSubmit)()
  }
  //공통코드 등록
  const onSubmit = _debounce(async (data: CommonCodeForm) => {
    if (loading) {
      return
    }
    isLoading(true)
    addCommonCodeMutation({ data })
    isLoading(false)
  }, 300)

  useEffect(() => {
    getCommonLanguageList().then((response) => {
      setLanguageCode(response)
      setLanguage(0)
      const updateList = response.map((language, index) => {
        return {
          languageCode: language.languageCode,
          codeName: '',
        }
      })
      setCodeItemMultiLanguageList([...updateList])
      update(0, { sortNumber: 1, code: '', useYn: 'Y', codeItemMultiLanguageList: updateList })
    })
  }, [])

  const languageCodeTab = languageCode?.map((language) => {
    return {
      tabName: language.languageName,
      value: language.languageCode,
    }
  })

  //폼 language 언어 변환 (ex. en -> english)
  const findLanguageNames = languageCodeTab.map((lang) => {
    const name = languageCode.find((item) => item.languageCode === lang.value)
    return name ? name.languageName : null
  })

  const itemCodeReSort = async (sortnumberToRemove: number) => {
    //삭제한 아이템코드 제외
    const afterRemoveFields = fields.filter((data) => data.sortNumber !== sortnumberToRemove)

    // 남아 있는 아이템들의 sortnumber 다시 정렬하기
    const updateFields = afterRemoveFields.map((data) => {
      if (data.sortNumber > sortnumberToRemove) {
        return {
          ...data,
          sortNumber: data.sortNumber - 1,
        }
      }
      return data
    })
    setValue('codeItemList', updateFields)
  }

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
            <h1 className="headline1">Add Standard Code</h1>
          </div>
        </ContentBox>
      </div>

      <ContentBox>
        <form className="align flex1 column">
          <article>
            {/* 컨텐츠 간 간격은 article 로 묶습니다. */}
            <div className="cont_title_box">
              <p className="title1">Basic Information</p>
              <p className="body2">Please enter the basic information of the standard code.</p>
            </div>
            <DetailTable
              colgroup={
                <colgroup>
                  <col style={{ width: '13%' }} />
                  <col style={{ width: '32%' }} />
                  <col style={{ width: '10%' }} />
                  <col style={{ width: '13%' }} />
                  <col style={{ width: '32%' }} />
                </colgroup>
              }
            >
              <tr>
                <th>
                  <InputLabel labelText="Code group name" id="ipt01" />
                </th>
                <td>
                  <BaseInput size="lg" placeholder="Please enter the code group name." {...codeGroupField} maxLength={40} />
                </td>
                <th>
                  <InputLabel labelText="Code" id="ipt01" />
                </th>
                <td>
                  <BaseInput size="lg" placeholder="Please register the code of the code group." {...codeNameField} maxLength={10} />
                </td>
              </tr>
            </DetailTable>
          </article>
          <article>
            {/* 컨텐츠 간 간격은 article 로 묶습니다. */}
            <div className="cont_title_box">
              <div className="align start">
                <p className="title1  mr_10">Item Information</p>
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
                  // onChange={() => {}} onTabClick={handleTabClick}
                />
              </div>
              <div className="rgt">
                <ButtonMui
                  color="black"
                  onClick={() => {
                    append(AllLanguage(fields.length + 1, codeItemMultiLanguageList, useYn))
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
                        {data.codeItemMultiLanguageList.length > 0 &&
                          data.codeItemMultiLanguageList?.map((item, i) => (
                            <tr key={`${index}-${i}`}>
                              {i === 0 && (
                                <td rowSpan={data.codeItemMultiLanguageList.length} className="vt">
                                  <Controller
                                    name={`codeItemList.${index}.useYn`}
                                    control={control}
                                    render={({ field }) => (
                                      <SwitchToggle
                                        {...field}
                                        id={`codeItemList.${index}.useYn`}
                                        color="primary"
                                        value={field.value === 'Y'}
                                        onChange={(e) => {
                                          field.onChange(e.target.checked === true ? 'Y' : 'N')
                                          fields[index].useYn = e.target.checked === true ? 'Y' : 'N'
                                        }}
                                      />
                                    )}
                                  />
                                </td>
                              )}
                              {i === 0 && (
                                <td rowSpan={data.codeItemMultiLanguageList.length} className="vt">
                                  <Controller
                                    name={`codeItemList.${index}.code`}
                                    control={control}
                                    render={({ field }) => (
                                      <BaseInput
                                        placeholder="Please enter item code."
                                        {...field}
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
                                  render={({ field }) => <BaseInput placeholder="Please enter item detail." {...field} maxLength={100} />}
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
                                      const sortnumberToRemove = fields[index].sortNumber
                                      remove(sortnumberToRemove)
                                      itemCodeReSort(sortnumberToRemove)
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
                disabled={!isValid}
                isLoading={addCommonCodeIsLoading}
                type="contained"
                size="xlarge"
                onClick={() => {
                  handleClick()
                }}
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
export default NewCode
