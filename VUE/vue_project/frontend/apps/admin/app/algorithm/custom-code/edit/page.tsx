'use client'

import { ContentBox, ButtonMui, Breadcrumb, DetailTable, BaseInput, TextArea } from 'ui'
import { useRouter, useSearchParams } from 'next/navigation'
import { getAlgorithmCustomCodeDetail, putAlgoCustom } from '@api/algorithm/custom-code'
import { useEffect, useState } from 'react'
import { AlgoCodeDetailType } from '@type/algorithm/custom-code'
import { AlertType, useAlert, useToastPopup } from 'library'
import AlogorthmCodeVersionTable from '@components/algorithm/version/AlogorthmCodeVersionTable'
const pageTitleList = ['Algorithm', 'Custom Code Detail', 'Edit Custom Code']

const initData = {
  name: '',
  type: 'customcode',
  desc: '',
}

const AlgoLibraryEdit = () => {
  const searchParams = useSearchParams()
  const { toastOpen, getToastState } = useToastPopup()
  const router = useRouter()
  const PartialCodeId = searchParams.get('partialCodeId')
  const [algoCodeData, setAlgoCodeData] = useState<AlgoCodeDetailType>()
  const [algoDesc, setAlgoDesc] = useState('')
  const { alertOpen, alertClose } = useAlert()
  const [loading, setLoading] = useState(false)
  const init = async () => {
    try {
      const data = await getAlgorithmCustomCodeDetail({ PartialCodeId })
      setAlgoCodeData(data)
      setAlgoDesc(data.desc)
    } catch (e) {
      console.error(e)
    }
  }

  const save = async () => {
    setLoading(true)
    try {
      await putAlgoCustom({ params: { desc: algoCodeData.desc }, PartialCodeId })
      toastOpen(getToastState({ content: 'Successfully saved.', icon: 'success' }))
      router.push('/algorithm/custom-code')
    } catch (error) {
      console.error(error)
      toastOpen(getToastState({ content: 'Save failed.', icon: 'warning' }))
    } finally {
      setLoading(false)
    }
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

  useEffect(() => {
    init()
  }, [])

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          {/* lft/rgt 가 좌우로 정렬됩니다.  */}
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">{algoCodeData?.name}</h1>
          </div>
        </ContentBox>
      </div>

      <ContentBox>
        <article>
          <div className="cont_title_box">
            <p className="title1">Basic Information</p>
          </div>
          <DetailTable
            colgroup={
              <colgroup>
                <col width="220px" />
                <col width="auto" />
              </colgroup>
            }
          >
            <tr>
              <th className="">Custom code name</th>
              <td>
                <BaseInput maxLength={45} disabled value={algoCodeData?.name || ''} />
              </td>
            </tr>
            <tr>
              <th className="va_top pt_20">Description</th>
              <td className="va_top">
                {/* textarea로 작성된 내용이 들어갑니다  */}
                <TextArea
                  height={100}
                  value={algoCodeData?.desc}
                  onChange={(event) =>
                    setAlgoCodeData((prev) => {
                      return {
                        ...prev,
                        desc: event.target.value,
                      }
                    })
                  }
                  maxLength={256}
                />
              </td>
            </tr>
          </DetailTable>
        </article>

        <AlogorthmCodeVersionTable editState PartialCodeId={PartialCodeId} />
        <div className="cont_bottom_box">
          <div className="align end">
            <ButtonMui type="outlined" size="xlarge" onClick={() => cancel()}>
              Cancel
            </ButtonMui>

            <ButtonMui isLoading={loading} size="xlarge" onClick={save} disabled={algoCodeData?.desc.trim() === '' || algoDesc === algoCodeData?.desc}>
              Save
            </ButtonMui>
          </div>
        </div>
      </ContentBox>
    </>
  )
}
export default AlgoLibraryEdit
