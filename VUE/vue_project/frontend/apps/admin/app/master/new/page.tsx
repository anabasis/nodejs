/**
 * 작성자 : 양수연
 * 화면 : AD.2.1 마스터 데이터_데이터 추가
 * path : /master/new
 */
'use client'
import AddCapFilm from '@components/master/new/AddCapFilm'
import AddEquipment from '@components/master/new/AddEquipment'
import AddEquipmentDriver from '@components/master/new/AddEquipmentDriver'
import AddPlate from '@components/master/new/AddPlate'
import AddProduct from '@components/master/new/AddProduct'
import { useSearchParams } from 'next/navigation'
import { Breadcrumb } from 'ui/components'
import { ContentBox } from 'ui/layouts'

const New = () => {
  const searchParam = useSearchParams()
  //첫 글자 대문자
  // const path = searchParam.get('path').replace(/\b[a-z]/, (pathName) => pathName.toUpperCase())
  const path = searchParam.get('path')

  //마스터 데이터 별 header
  const masterDataHeader = (tabName: string) => {
    switch (tabName) {
      case 'product': {
        return `Add Product Master Data`
      }
      case 'equipment': {
        return `Add Instrument Master Data`
      }
      case 'equipment-driver': {
        return `Add Instrument Driver Master Data`
      }
      case 'cap-film': {
        return `Add Cap/Film Master Data`
      }
      case 'plate': {
        return `Add Plate Master Data`
      }
    }
  }

  //마스터 데이터 별 content
  const addForm = (tabName: string) => {
    switch (tabName) {
      case 'product': {
        return <AddProduct />
      }
      case 'equipment': {
        return <AddEquipment />
      }
      case 'equipment-driver': {
        return <AddEquipmentDriver />
      }
      case 'cap-film': {
        return <AddCapFilm />
      }
      case 'plate': {
        return <AddPlate />
      }
    }
  }
  const pageTitleList = [`Master Data`, `${masterDataHeader(path)}`]

  return (
    <>
      {/* 헤더 */}
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">{masterDataHeader(path)}</h1>
          </div>
        </ContentBox>
      </div>
      <ContentBox>{addForm(path)}</ContentBox>
    </>
  )
}

export default New
