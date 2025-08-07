'use client'

import React from 'react'
import { Breadcrumb, ContentBox, ButtonMui, DetailTable, Icons } from 'ui'
import { AlertType, useAlert } from 'library/hook/useAlert'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useToolDetailQuery, useToolMutate } from '@store/server/useToolQuery'
import { pageTitle } from '@constant/toolManagement'
import { getCdnFileUrl, useMenu } from 'library'
import Image from 'next/image'
import { useMenuAuthority } from '@hook/useMenuAuthority'

const pageTitleList = pageTitle['detail']

export default function ToolDetail() {
  const { alertOpen, alertClose } = useAlert()

  const params = useSearchParams()
  const router = useRouter()

  const { getUserAuthority } = useMenuAuthority()
  const { update, delete: deleteAuth } = getUserAuthority()

  const [toolId] = useState(params.get('id'))
  const [iconURL, setIconURL] = useState<string>('')

  const { data: toolDetail } = useToolDetailQuery(toolId)
  const { deleteToolMutate } = useToolMutate()

  const handleEditButtonClick = () => {
    router.push(`/tools/edit?id=${toolId}`)
  }

  const handleDeleteTool = () => {
    deleteToolMutate(parseInt(toolId), { onSuccess: () => router.push('/tools/') })
    alertClose()
  }

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
        <ButtonMui size="xlarge" onClick={handleDeleteTool}>
          Delete
        </ButtonMui>
      </div>
    ),
  }

  useEffect(() => {
    setIconURL(getCdnFileUrl(toolDetail?.fileInfoResponse))
  }, [toolDetail])

  return (
    <>
      {/* 페이지 상단 박스 케이스 */}
      {/* 헤더 */}
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          {/* lft/rgt 가 좌우로 정렬됩니다.  */}
          <div className="lft">
            <Breadcrumb pageTitleList={pageTitleList} />
            <h1 className="headline1">{`${toolDetail?.toolName}`}</h1>
          </div>
          <div className="rgt">
            <ButtonMui
              color="secondary"
              icon="DeleteIcon"
              iconStyle={{ width: 20, height: 20, fill: '#3357FF' }}
              onClick={() => {
                alertOpen(alertState)
              }}
              size="large"
              type="contained"
              disabled={!deleteAuth}
            >
              Delete
            </ButtonMui>
            <ButtonMui
              color="primary"
              icon="EditIcon"
              iconStyle={{ width: 20, height: 20, fill: '#fff' }}
              onClick={handleEditButtonClick}
              size="large"
              type="contained"
              disabled={!update}
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
            <tr>
              <th>
                <span className="">Tool name</span>
              </th>
              <td>{toolDetail?.toolName}</td>
              <th>
                <span className="">Open level</span>
              </th>
              <td colSpan={3}>{(toolDetail?.toolExposure === 'PUB' && 'Public') || (toolDetail?.toolExposure === 'PTL' && 'Parially open') || 'Private'}</td>
            </tr>
            <tr>
              <th>
                <span className="">Launcher icon</span>
              </th>
              <td>
                {iconURL == null ? (
                  <div className="bg_icon_box square small gray">
                    <Icons.NoImg width={24} height={24} fill="#C6CDDA" icofill="#A2ADC1" />
                  </div>
                ) : (
                  <Image width={24} height={24} src={iconURL} alt="icon" />
                )}
              </td>
            </tr>
            <tr>
              <th>
                <span className="">Tool link</span>
              </th>
              <td colSpan={3}>{toolDetail?.toolUrl}</td>
            </tr>
            <tr>
              <th className="vt">
                <span className="">Description</span>
              </th>
              <td colSpan={3}>{toolDetail?.toolDescription}</td>
            </tr>
          </DetailTable>
        </article>
      </ContentBox>
    </>
  )
}
