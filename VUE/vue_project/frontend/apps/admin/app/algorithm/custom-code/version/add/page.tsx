// 작업자 : 최유희

'use client'
import { ContentBox, ButtonMui, ContentBoxWrap, DetailTable, BaseInput, TextArea, Breadcrumb, Dl } from 'ui'
import DatePicker from 'ui/datepicker/DatePicker'
import { useRouter, useSearchParams } from 'next/navigation'
import { AlgoCodeDetailType, CustomAddVerParamsType } from '@type/algorithm/custom-code'
import { AlertType, useAlert, useParamsData } from 'library'
import { useEffect, useMemo, useState } from 'react'
import { useAlogoCodeMutate } from '@store/server/algorithm/useAlogCodeQuery'
import { getAlgorithmCustomCodeDetail } from '@api/algorithm/custom-code'

declare const btoa: (data: string) => string

const initData = {
  note: '',
  src1: '',
  version: '0.1',
  releaseDt: '',
}

const AlgoCustomAddVersion = () => {
  const pageTitleList = ['Algorithm', 'Custom Code Detail', 'Add Custom Code Version']
  const searchParams = useSearchParams()
  const [algoCodeData, setAlgoCodeData] = useState<AlgoCodeDetailType>()
  const { alertOpen, alertClose } = useAlert()
  const router = useRouter()
  const PartialCodeId = searchParams.get('partialCodeId')
  const { addAlgoCustomVerMutate } = useAlogoCodeMutate(PartialCodeId)
  const { params, resetParams, setChangeParams, checkEmptyValue } = useParamsData<CustomAddVerParamsType>(initData)
  const [addForm, setAddForm] = useState(false)
  const defalutVersion = useMemo(() => ((+algoCodeData?.latestPartialCodeVer?.version || 0) + 0.1).toFixed(1), [algoCodeData])
  const init = async () => {
    try {
      const data = await getAlgorithmCustomCodeDetail({ PartialCodeId })
      setAlgoCodeData(data)
    } catch (e) {
      console.error(e)
    }
  }

  const add = () => {
    const param = {
      ...params,
      src1: btoa(params?.src1),
      src2: params?.src2 ? btoa(params?.src2) : '',
      version: defalutVersion,
    }
    addAlgoCustomVerMutate({ params: param, PartialCodeId })
  }

  const cancel = () => {
    const alertState: AlertType = {
      InfoType: 'cancel',
      content: (
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            Cancel
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={() => router.push(`/algorithm/custom-code/detail?partialCodeId=${PartialCodeId}`)}>
            OK
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
  }

  const deleteForm = () => {
    setAddForm(false)
    delete params?.src2
  }
  const addFormData = () => {
    setChangeParams('', 'src2')
    setAddForm(true)
  }

  useEffect(() => {
    init()
    return () => {
      resetParams()
    }
  }, [])

  return (
    <>
      {algoCodeData && (
        <>
          {/* 헤더 */}
          <div className="sticky_wrap">
            {/* 페이지 상단 박스 케이스 */}
            <ContentBox type="top_content">
              {/* lft/rgt 가 좌우로 정렬됩니다.  */}
              <div className="lft">
                <Breadcrumb pageTitleList={pageTitleList} />
                <h1 className="headline1">Add Custom Code Version</h1>
                <Dl listData={[{ listTitle: 'Custom Code Name', listInfo: algoCodeData?.name }]} />
              </div>
            </ContentBox>
          </div>
          <ContentBoxWrap>
            <ContentBox>
              {/* [s] Library Version Basic Information */}
              <>
                {/* Library Version 등록 페이지 */}
                <article>
                  <div className="cont_title_box">
                    <p className="title1">Basic Information</p>
                  </div>
                  <DetailTable
                    colgroup={
                      <colgroup>
                        <col style={{ width: '180px' }} />
                        <col style={{ width: 'calc(50% - 180px)' }} />
                        <col style={{ width: '180px' }} />
                        <col style={{ width: 'calc(50% - 180px)' }} />
                      </colgroup>
                    }
                  >
                    <tr>
                      <th>
                        <span className="required">Version</span>
                      </th>
                      <td>
                        <div className="grid6">{defalutVersion && <BaseInput disabled placeholder="placeholder" value={defalutVersion || ''} />}</div>
                      </td>
                      <th>
                        <span className="required">Release date</span>
                      </th>
                      <td>
                        <div className="grid6">
                          <DatePicker onChangePickerDate={(date) => setChangeParams(date, 'releaseDt')} />
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th className="vt">Release note</th>
                      <td colSpan={3}>
                        <TextArea height={150} placeholder="Please enter release note." onChange={(event) => setChangeParams(event, 'note')} />
                      </td>
                    </tr>
                  </DetailTable>
                </article>

                <article>
                  <div className="cont_title_box">
                    <p className="title1">Code Detail</p>
                  </div>
                  <DetailTable
                    colgroup={
                      <colgroup>
                        <col style={{ width: '180px' }} />
                        <col style={{ width: 'calc(100% - 210px)' }} />
                        <col style={{ width: '30px' }} />
                      </colgroup>
                    }
                  >
                    <tr>
                      <th className="vt">Code 1</th>
                      <td style={{ paddingRight: 0 }}>
                        <div className="align start top mb_10">
                          <TextArea
                            className="mr_10"
                            height="h200"
                            placeholder="Please enter wrapper code."
                            onChange={(event) => setChangeParams(event, 'src1')}
                          />
                        </div>
                      </td>
                      <td>{/* 디자인 맞추기 위한 빈영역 */}</td>
                    </tr>
                    {/* Add Code Contents 버튼 클릭 시 */}
                    {addForm && (
                      <tr>
                        <th className="vt">Code 2</th>
                        <td style={{ paddingRight: 0 }}>
                          <div className="align start top mb_10">
                            <TextArea
                              className="mr_10"
                              height="h200"
                              placeholder="Please enter wrapper code."
                              onChange={(event) => setChangeParams(event, 'src2')}
                            />
                          </div>
                        </td>
                        <td className="vt tc">
                          <ButtonMui type="text" size="xsmall" icon="DeleteIcon" iconStyle={{ fill: 'var(--typo900)' }} onClick={deleteForm} />
                        </td>
                      </tr>
                    )}
                  </DetailTable>
                  <div className="align start">
                    <div className="grid3">{/* 디자인된 영역을 맞추기 위한 빈 영역 */}</div>
                    <ButtonMui disabled={addForm} color="black" icon="PlusIcon" iconStyle={{ fill: '#fff' }} onClick={addFormData}>
                      Add Code
                    </ButtonMui>
                  </div>
                </article>
              </>

              <div className="cont_bottom_box">
                <div className="align end">
                  <ButtonMui type="outlined" size="xlarge" onClick={cancel}>
                    Cancel
                  </ButtonMui>

                  <ButtonMui disabled={checkEmptyValue()} size="xlarge" onClick={add}>
                    Add
                  </ButtonMui>
                </div>
              </div>
            </ContentBox>
          </ContentBoxWrap>
        </>
      )}
    </>
  )
}
export default AlgoCustomAddVersion
