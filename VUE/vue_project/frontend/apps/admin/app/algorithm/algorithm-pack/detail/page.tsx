// 작업자 : 최유희

'use client'
import { useEffect, useState } from 'react'
import { ContentBox, Breadcrumb, ButtonMui } from 'ui'
import AlgoPackDetailForm from '@components/algorithm/AlgoPackDetailForm'
import { getAlgorithmPackDetail } from '@api/algorithm/pack'
import { AlertType, useAlert, useMenu, useParamsData } from 'library'
import { AlgoPackAddParamsType, PackDetailType } from '@type/algorithm/pack'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { pick } from 'lodash-es'
import { useAlogoPackMutate } from '@store/server/algorithm/useAlogPackQuery'
const keyArr = ['BPN', 'DSP', 'PostProcess', 'CtCalc', 'MuDT', 'Crosstalk']

const AlgorithmPackDetailPage = () => {
  const router = useRouter()
  const { alertOpen, alertClose } = useAlert()
  const searchParams = useSearchParams()
  const algoPackId = searchParams.get('algoPackId')
  const pageTitleList = ['Algorithm', 'Algorithm Pack Detail']
  const [packDetailData, setPackDetailData] = useState<PackDetailType>()
  const { resetParams } = useParamsData<AlgoPackAddParamsType>()
  const { algohmLibVerDelete } = useAlogoPackMutate()
  const pathname = usePathname()
  const { getPathInfo } = useMenu()
  const releasedProcess = () => {
    const alertState: AlertType = {
      icon: 'warning',
      title: 'Essay packs in use cannot be deleted',
      textTitle: 'This essay pack is in use.',
      content: (
        <div className="align center mt_30">
          <ButtonMui size="xlarge" onClick={() => alertClose()}>
            OK
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
  }

  const developProcess = () => {
    const alertState: AlertType = {
      InfoType: 'delete',
      content: (
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            Cancel
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={() => algohmLibVerDelete({ algoPackId })}>
            Delete
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
  }

  const deletedProcess = () => {
    packDetailData.status === 'Developed' ? developProcess() : releasedProcess()
  }

  const init = async () => {
    try {
      const data = await getAlgorithmPackDetail({ algoPackId })
      const { PostProc, ...rest } = data.algoType
      const newData = {
        ...data,
        algoType: {
          ...rest,
          PostProcess: PostProc,
        },
      }
      const sortedRes = pick(newData.algoType, keyArr)
      setPackDetailData({
        ...newData,
        algoType: {
          ...sortedRes,
        },
      })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    init()
    return () => {
      resetParams()
    }
  }, [])

  return (
    <>
      {/* 헤더 */}
      <div className="sticky_wrap">
        {/* 페이지 상단 박스 케이스 */}
        <ContentBox type="top_content">
          {/* lft/rgt 가 좌우로 정렬됩니다.  */}
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">Algorithm</h1>
            {/* <Dl listData={descListData} /> */}
          </div>
          <div className="rgt">
            {/* top_content btn size :: large */}
            <ButtonMui
              disabled={getPathInfo(pathname).crtYn !== 'Y'}
              type="contained"
              size="large"
              color="secondary"
              icon="DeleteIcon"
              onClick={deletedProcess}
            >
              Delete
            </ButtonMui>
            <ButtonMui
              disabled={getPathInfo(pathname).crtYn !== 'Y'}
              type="contained"
              size="large"
              icon="EditIcon"
              onClick={() => router.push(`/algorithm/algorithm-pack/edit?algoPackId=${algoPackId}`)}
            >
              Edit
            </ButtonMui>
          </div>
        </ContentBox>
      </div>

      <ContentBox>{packDetailData && <AlgoPackDetailForm packDetailData={packDetailData} />}</ContentBox>
    </>
  )
}

export default AlgorithmPackDetailPage
