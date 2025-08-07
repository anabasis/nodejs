/**
 * 작성자 : 양수연
 * 화면 : AD.2.2 마스터 데이터 상세
 * path : /master/detail?path={마스터데이터명}&id={id}
 */
'use client'
import { getMasterDataDetail } from '@api/master'
import CapFilmDetail from '@components/master/detail/CapFilmDetail'
import EquipmentDetail from '@components/master/detail/EquipmentDetail'
import EquipmentDriverDetail from '@components/master/detail/EquipmentDriverDetail'
import PlateDetail from '@components/master/detail/PlateDetail'
import ProductDetail from '@components/master/detail/ProductDetail'
import { firstUpperCase, masterDataDetails, tabData } from '@constant/masterDataOption'
import { useMasterMutation } from '@store/server/useMasterQuery'
import { MasterDataBasicInfo } from '@type/mater/masterDataType'
import { AlertType, useAlert, changeTimeLocal, useMenu } from 'library'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Breadcrumb, DetailTable } from 'ui/components'
import { ContentBox } from 'ui/layouts'
import { ButtonMui } from 'ui/mui'

const MasterDetail = () => {
  const router = useRouter()

  const pathname = usePathname()
  const { getPathInfo } = useMenu()

  const search = useSearchParams()
  const masterId = search.get('masterId') //id(PK)
  const path = search.get('path') //product or equipment or equipment-driver ...
  const [masterData, setMasterData] = useState<MasterDataBasicInfo>()

  const { alertOpen, alertClose } = useAlert()
  const { deleteMaster } = useMasterMutation()

  //1. 마스터 데이터 상세 조회 API
  const init = async () => {
    const response = await getMasterDataDetail({ path, masterId })
    setMasterData(response)
  }

  //삭제 팝업
  const alertState: AlertType = {
    InfoType: 'delete',
    content: (
      // 버튼 센터 정렬 및 마진 class 입니다.
      <div className="align center mt_30">
        {/* 팝업의 버튼은 xlarge 사이즈 입니다.  */}
        <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
          Cancel
        </ButtonMui>
        <ButtonMui
          size="xlarge"
          onClick={() => {
            handleClickDeleteMasterData()
          }}
        >
          Delete
        </ButtonMui>
      </div>
    ),
  }

  const handleClickDeleteMasterData = async () => {
    deleteMaster({ path, masterId })
  }

  //마스터 데이터 별 header
  const masterDataHeader = (tabName: string) => {
    const masterHeaderName = tabData
      .filter((data, i) => data.addName === firstUpperCase(tabName?.replace(/-/g, ' ')))
      .map((data) => data.tabName)
      .toString()
    return `${masterHeaderName} ${masterDataDetails}`
  }

  //마스터 데이터 별 content
  //상세, 수정페이지의 상세정보를 component 하나로 공유
  //pathname에 따라 수정 화면으로 보여줄 것인지, 상세 화면으로 보여줄 것인지의 props
  const detailInformation = (tabName: string) => {
    switch (tabName) {
      case 'product': {
        return <ProductDetail masterData={masterData} />
      }
      case 'equipment': {
        return <EquipmentDetail masterData={masterData} />
      }
      case 'equipment-driver': {
        return <EquipmentDriverDetail masterData={masterData} />
      }
      case 'cap-film': {
        return <CapFilmDetail masterData={masterData} />
      }
      case 'plate': {
        return <PlateDetail masterData={masterData} />
      }
    }
  }
  const pageTitleList = [`Master Data`, `${masterDataHeader(path)}`]

  useEffect(() => {
    init()
  }, [])

  const masterDataName = () => {
    if (path === 'product') {
      return masterData.prdNm
    } else if (path === 'equipment') {
      return masterData.instrmNm
    } else if (path === 'equipment-driver') {
      return masterData.instrmDrvNm
    } else if (path === 'cap-film') {
      return masterData.capFilmName
    } else return masterData.plateName
  }
  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">{masterData && masterDataName()}</h1>
          </div>
          <div className="rgt">
            <ButtonMui
              color="secondary"
              icon="DeleteIcon"
              onClick={() => {
                alertOpen(alertState)
              }}
              size="large"
              type="contained"
              disabled={getPathInfo(pathname).crtYn !== 'Y'}
            >
              Delete
            </ButtonMui>
            <ButtonMui
              color="primary"
              icon="EditIcon"
              onClick={() => {
                router.push(`/master/update?path=${path}&masterId=${masterId}`)
              }}
              size="large"
              disabled={getPathInfo(pathname).crtYn !== 'Y'}
            >
              Edit
            </ButtonMui>
          </div>
        </ContentBox>
      </div>
      <ContentBox>
        <article>
          {/* 컨텐츠 간 간격은 article 로 묶습니다. */}
          <div className="cont_title_box">
            <p className="title1">Basic Information</p>
          </div>
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
            {masterData && (
              <>
                <tr>
                  <th>No.</th>
                  <td>{masterData.id}</td>
                  <th>Uploader</th>
                  <td>{masterData.memberName}</td>
                </tr>
                <tr>
                  <th>Added date</th>
                  <td>{changeTimeLocal({ time: masterData.createDate, type: 'yyyy-MM-dd' })}</td>
                  <th>Last modified date</th>
                  <td>{changeTimeLocal({ time: masterData.lastUpdateDate, type: 'yyyy-MM-dd' })}</td>
                </tr>
              </>
            )}
          </DetailTable>
        </article>
        {/* 마스터 데이터 별 상세 정보 */}
        {detailInformation(path)}
      </ContentBox>
    </>
  )
}

export default MasterDetail
