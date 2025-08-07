'use client'

import AlogorthmLibVersionTable from '@components/algorithm/version/AlogorthmLibVersionTable'
import { ContentBox, ButtonMui, Breadcrumb, DetailTable, BaseInput, TextArea } from 'ui'
import { useRouter, useSearchParams } from 'next/navigation'
import { getAlgorithmLibListDetail, putAlgorithmLibVer } from '@api/algorithm/library'
import { useEffect, useMemo, useState } from 'react'
import { AlgoLibDetailType } from '@type/algorithm/library'
import { AlertType, useAlert, useToastPopup } from 'library'
const pageTitleList = ['Algorithm', 'Library Detail', 'Edit Library Detail']

const AlgoLibraryEdit = () => {
  const searchParams = useSearchParams()
  const { toastOpen, getToastState } = useToastPopup()
  const router = useRouter()
  const libId = searchParams.get('libId')
  const [algoLibData, setAlgoLibData] = useState<AlgoLibDetailType>()
  const [algoDesc, setAlgoDesc] = useState('')
  const { alertOpen, alertClose } = useAlert()
  const [loading, setLoading] = useState(false)
  const init = async () => {
    try {
      const data = await getAlgorithmLibListDetail({ libId })
      setAlgoLibData(data)
      setAlgoDesc(data.desc)
    } catch (e) {
      console.error(e)
    }
  }

  const save = async () => {
    setLoading(true)
    try {
      await putAlgorithmLibVer({ params: { desc: algoLibData.desc }, libId })
      toastOpen(getToastState({ content: 'Successfully saved.', icon: 'success' }))
      router.push('/algorithm/library-manage')
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
          <ButtonMui size="xlarge" onClick={() => router.push(`/algorithm/library-manage`)}>
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
            <h1 className="headline1">{algoLibData?.name}</h1>
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
              <th className="">Library name</th>
              <td>
                <BaseInput disabled value={algoLibData?.name || ''} />{' '}
              </td>
            </tr>
            <tr>
              <th className="va_top pt_20">Description</th>
              <td className="va_top">
                {/* textarea로 작성된 내용이 들어갑니다  */}
                <TextArea
                  height={100}
                  value={algoLibData?.desc}
                  onChange={(event) =>
                    setAlgoLibData((prev) => {
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

        <AlogorthmLibVersionTable editState libId={libId} />
        <div className="cont_bottom_box">
          <div className="align end">
            <ButtonMui type="outlined" size="xlarge" onClick={() => cancel()}>
              Cancel
            </ButtonMui>

            <ButtonMui isLoading={loading} size="xlarge" onClick={save} disabled={algoLibData?.desc.trim() === '' || algoDesc === algoLibData?.desc}>
              Save
            </ButtonMui>
          </div>
        </div>
      </ContentBox>
    </>
  )
}
export default AlgoLibraryEdit
