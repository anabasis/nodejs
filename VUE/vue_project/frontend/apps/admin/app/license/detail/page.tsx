'use client'

import { Breadcrumb, DetailTable, Dl } from 'ui/components'
import { ContentBox } from 'ui/layouts'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'
import { ButtonMui } from 'ui/mui'
import { useDeleteLicenseMutation, useLicenseDetailData } from '@store/server/useLicenseQuery'
import { changeTimeLocal } from 'library/util/time'
import { createMarkup } from 'library/util'
import { useAlert } from 'library/hook/useAlert'
import { useToastPopup } from 'library/hook/useToastPopup'
import { useMenu } from 'library'

export default function DetailPage() {
  const router = useRouter()
  const { toastOpen } = useToastPopup()
  const { alertOpen, alertClose } = useAlert()
  const pathname = usePathname()
  const { getPathInfo } = useMenu()
  const searchParams = useSearchParams()
  const [licenseId] = useState(searchParams.get('id'))

  const { data: licenseDetailData } = useLicenseDetailData(licenseId)

  const handleEdit = useCallback(() => {
    router.push(`/license/edit?id=${licenseId}`)
  }, [licenseId, router])

  const licenseMutation = useDeleteLicenseMutation()

  const deleteLicense = useCallback(() => {
    licenseMutation.mutate(licenseId, {
      onSuccess: () => {
        toastOpen({ content: 'Successfully deleted.', icon: 'success' })
        router.push(`/license`)
      },
      onError: () => {
        toastOpen({ content: 'Delete failed.', icon: 'error' })
      },
    })
  }, [licenseId, licenseMutation, router, toastOpen])

  const handleDelete = useCallback(() => {
    alertOpen({
      maxWidth: 's',
      title: 'Are you sure to delete?',
      content: (
        <div className="align center mt_30">
          <ButtonMui
            type="outlined"
            size="xlarge"
            onClick={() => {
              alertClose()
            }}
          >
            Cancel
          </ButtonMui>
          <ButtonMui
            size="xlarge"
            onClick={() => {
              deleteLicense()
            }}
          >
            Delete
          </ButtonMui>
        </div>
      ),
      textTitle: `If you click the delete button, it cannot be recovered.`,
      icon: 'info',
    })
  }, [alertClose, alertOpen, deleteLicense])

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          {/* lft/rgt 가 좌우로 정렬됩니다.  */}
          <div className="lft">
            <Breadcrumb pageTitleList={['License', 'License Detail']} />
            <h1 className="headline1">{licenseDetailData?.systemName}</h1>
            <Dl
              listData={[
                { listTitle: 'No.', listInfo: licenseDetailData?.licenceNumber },
                { listTitle: 'Upload Date', listInfo: changeTimeLocal({ time: licenseDetailData?.modifyDate, type: 'yyyy-MM-dd' }) },
              ]}
            />
          </div>
          <div className="rgt">
            <ButtonMui color="secondary" icon="DeleteIcon" onClick={handleDelete} size="large" type="contained" disabled={getPathInfo(pathname).delYn !== 'Y'}>
              Delete
            </ButtonMui>
            <ButtonMui color="primary" icon="EditIcon" size="large" onClick={handleEdit} disabled={getPathInfo(pathname).uptYn !== 'Y'}>
              Edit
            </ButtonMui>
          </div>
        </ContentBox>
      </div>
      <ContentBox>
        <div className="cont_title_box">
          <p className="title1">License Detail Information</p>
        </div>
        <DetailTable
          colgroup={
            <colgroup>
              <col width="180px" />
              <col width="auto" />
            </colgroup>
          }
        >
          <tr>
            <th className="vt">Contents</th>
            <td>
              <div className="ck-content" dangerouslySetInnerHTML={createMarkup(licenseDetailData?.contents)} />
            </td>
          </tr>
        </DetailTable>
      </ContentBox>
    </>
  )
}
