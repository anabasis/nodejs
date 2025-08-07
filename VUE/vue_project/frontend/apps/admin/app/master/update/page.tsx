/**
 * 작성자 : 양수연
 * 화면 : AD.2.2.1 마스터 데이터 수정
 * path : /master/update?path={마스터데이터명}&id=${id}
 */
'use client'
import { getMasterDataDetail } from '@api/master'
import EditCapFilm from '@components/master/update/EditCapFilm'
import EditEquipment from '@components/master/update/EditEquipment'
import EditEquipmentDriver from '@components/master/update/EditEquipmentDriver'
import EditPlate from '@components/master/update/EditPlate'
import EditProduct from '@components/master/update/EditProduct'
import { firstUpperCase, masterDataDetails, tabData } from '@constant/masterDataOption'
import { MasterDataBasicInfo } from '@type/mater/masterDataType'
import { apiAdmin, changeTimeLocal } from 'library/util'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { BaseInput, Breadcrumb, ContentBox, DetailTable } from 'ui'

const MasterDataUpdate = () => {
  const search = useSearchParams()
  const masterId = search.get('masterId')
  const path = search.get('path')
  const [masterData, setMasterData] = useState<MasterDataBasicInfo>()

  //1. 마스터 데이터 상세 조회 API
  const init = async () => {
    const response = await getMasterDataDetail({ path, masterId })
    setMasterData(response)
  }

  //마스터 데이터 별 header
  const masterDataSecondHeader = (tabName: string) => {
    const masterHeaderName = tabData
      .filter((data, i) => data.addName === firstUpperCase(tabName.replace(/-/g, ' ')))
      .map((data) => data.tabName)
      .toString()
    return `${masterHeaderName} ${masterDataDetails}`
  }

  //마스터 데이터 별 마지막 header
  const masterDataThirdHeader = (tabName: string) => {
    const masterHeaderName = tabData
      .filter((data, i) => data.addName === firstUpperCase(tabName.replace(/-/g, ' ')))
      .map((data) => data.tabName)
      .toString()
    return `Edit ${masterHeaderName} Master Data`
  }

  //마스터 데이터 별 content
  //상세, 수정페이지의 상세정보를 component 하나로 공유
  //pathname에 따라 수정 화면으로 보여줄 것인지, 상세 화면으로 보여줄 것인지의 props
  const updateInformation = (tabName: string) => {
    switch (tabName) {
      case 'product': {
        return <EditProduct masterData={masterData} />
      }
      case 'equipment': {
        return <EditEquipment masterData={masterData} />
      }
      case 'equipment-driver': {
        return <EditEquipmentDriver masterData={masterData} />
      }
      case 'cap-film': {
        return <EditCapFilm masterData={masterData} />
      }
      case 'plate': {
        return <EditPlate masterData={masterData} />
      }
    }
  }
  const pageTitleList = [`Master Data`, `${masterDataSecondHeader(path)}`, `${masterDataThirdHeader(path)}`]

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
        </ContentBox>
      </div>

      <ContentBox>
        <article>
          {/* 컨텐츠 간 간격은 article 로 묶습니다. */}
          <div className="cont_title_box">
            <p className="title1">Basic Information</p>
          </div>
          {masterData && (
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
                <th>No.</th>
                <td>
                  <BaseInput disabled value={masterData.id.toString() || ''} />
                </td>
                <th>Uploader</th>
                <td>
                  <BaseInput disabled value={masterData.memberName || ''} />
                </td>
              </tr>
              <tr>
                <th>Added date</th>
                <td>
                  <BaseInput disabled value={changeTimeLocal({ time: masterData.lastUpdateDate, type: 'yyyy-MM-dd' }) || ''} />
                </td>
                <th>Last modified date</th>
                <td>
                  <BaseInput disabled value={changeTimeLocal({ time: masterData.lastUpdateDate, type: 'yyyy-MM-dd' }) || ''} />
                </td>
              </tr>
            </DetailTable>
          )}
        </article>

        {/* 마스터 데이터 상세 정보 수정화면 */}
        {updateInformation(path)}
      </ContentBox>
    </>
  )
}
export default MasterDataUpdate
