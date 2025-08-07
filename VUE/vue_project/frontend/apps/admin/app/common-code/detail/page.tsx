/**
 * 작성자 : 양수연
 * 화면 : AD1.2 공통 코드_공통 코드 상세
 * path : /common-code/detail?id=${id}
 */
'use client'
import { getCommonLanguageList } from '@api/common'
import { getCommonCodeBasicInfo, getCommonCodeItemInfo } from '@api/common-code'
import ItemInformationTable from '@components/common-code/ItemInformationTable'
import { useCommonCodeMutation } from '@store/server/useCommonCodeQuery'
import { CCBasicInformation, CCItemInformation } from 'lib/type/common-code/commonCodeType'
import { changeTimeLocal, useMenu } from 'library'
import { AlertType, useAlert } from 'library/hook/useAlert'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Badge, Breadcrumb, ButtonMui, ContentBox, DetailTable, RoundTab } from 'ui'

const pageTitleList = ['Standard Code', 'Standard Code Detail']
const colGroupStyle = (
  <colgroup>
    <col style={{ width: '15%' }} />
    <col style={{ width: '35%' }} />
    <col style={{ width: '15%' }} />
    <col style={{ width: '35%' }} />
  </colgroup>
)

export default function CommonCodeDetail() {
  const router = useRouter()
  const pathname = usePathname()
  const { getPathInfo } = useMenu()
  const searchParam = useSearchParams()
  const id = searchParam.get('id')

  const [basicInfo, setBasicInfo] = useState<CCBasicInformation>() //기본정보
  const [itemInfoList, setItemInfoList] = useState<CCItemInformation[]>() //아이템정보
  const [itemCount, setItemCount] = useState<number>(0) //아이템정보 개수
  const [languageCode, setLanguageCode] = useState<{ languageCode: string; languageName: string }[]>([])
  const [selectedTab, setSelectedTab] = useState<number>(0)

  const { deleteCommonCodeMutation } = useCommonCodeMutation()

  const init = () => {
    getCommonCodeBasicInfo({ id }).then((response) => {
      console.log(response)
      setBasicInfo(response.data)
    })
    getCommonCodeItemInfo({ id })
      .then((response) => {
        console.log(response)
        if (response.data.statusCode === 400160) {
          router.push(`/common-code`)
        }
        setItemCount(response.data.length)
        setItemInfoList(response.data)
      })
      .catch((error) => {
        console.log(error)
        router.push(`/common-code`)
      })
    getCommonLanguageList().then((response) => {
      console.log(response)
      setLanguageCode(response)
    })
  }

  useEffect(() => {
    init()
  }, [])

  const languageCodeTab = languageCode.map((item) => {
    return {
      tabName: item?.languageName,
      value: item?.languageCode,
    }
  })

  const handleClickDeleteCode = async () => {
    deleteCommonCodeMutation({ id })
  }

  //삭제 팝업
  const { alertOpen, alertClose } = useAlert()
  const alertState: AlertType = {
    title: 'Are you sure to delete?',
    textTitle: <span>If you click the delete button, it cannot be recovered.</span>,
    maxWidth: 'xs', // maxwidth 없을 시 기본값 적용 (xs)
    icon: 'info',
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
            handleClickDeleteCode()
          }}
        >
          Delete
        </ButtonMui>
      </div>
    ),
  }

  return (
    <>
      {/* 헤더 */}
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          {/* lft/rgt 가 좌우로 정렬됩니다.  */}
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">{basicInfo && basicInfo.codeGroupName}</h1>
          </div>
          <div className="rgt">
            {/* alert */}
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
                router.push(`/common-code/update?id=${id}`)
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
          {basicInfo && (
            <DetailTable colgroup={colGroupStyle}>
              <tr>
                <th>Code</th>
                <td>{basicInfo.code}</td>
              </tr>
              <tr>
                <th>Code group name</th>
                <td>{basicInfo.codeGroupName}</td>
                <th>Date of creation</th>
                <td>{changeTimeLocal({ time: basicInfo.createDateTime, type: 'yyyy-MM-dd' })}</td>
              </tr>
              <tr>
                <th>Last modified date</th>
                <td>{changeTimeLocal({ time: basicInfo.modifyDateTime, type: 'yyyy-MM-dd' })}</td>
                <th>Editor</th>
                <td>{basicInfo.editor}</td>
              </tr>
            </DetailTable>
          )}
        </article>
        <article>
          {/* 컨텐츠 간 간격은 article 로 묶습니다. */}
          <div className="cont_title_box">
            <div className="align start">
              <p className="title1 mr_10">Item Information</p>
              <Badge uiType="solid" color="blue" style="count" size="sm">
                {itemCount}
              </Badge>
            </div>
            <p className="body2">Please enter code item information.</p>
          </div>
          <div className="align">
            <div className="lft">
              {languageCode && (
                <RoundTab
                  tabData={[{ tabName: 'All', value: 'all' }].concat(languageCodeTab)}
                  value={selectedTab}
                  onChange={({ oldIndex, newIndex }) => setSelectedTab(newIndex)}
                />
              )}
            </div>
          </div>
          <ItemInformationTable itemInfoList={itemInfoList} languageCode={languageCode} selectedLanguageIndex={selectedTab - 1} />
        </article>
      </ContentBox>
    </>
  )
}
