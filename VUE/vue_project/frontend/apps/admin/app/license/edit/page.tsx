'use client'

import { BaseInput, Breadcrumb, DetailTable } from 'ui/components'
import { ContentBox } from 'ui/layouts'
import { SelectMui, ButtonMui } from 'ui/mui'
import { useCallback, useState, useMemo, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useToastPopup } from 'library/hook/useToastPopup'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import DatePicker from 'ui/datepicker/DatePicker'
import { useAddLicenseMutation, useLicenseDetailData } from '@store/server/useLicenseQuery'
import { getCode } from 'library/util'
import { useQueries } from '@tanstack/react-query'
import { format } from 'date-fns'
import { useAlert } from 'library/hook/useAlert'
import { useMenu } from 'library'

export default function Page() {
  const { alertOpen, alertClose } = useAlert()
  const router = useRouter()
  const pathname = usePathname()
  const { getPathInfo } = useMenu()
  const commonCodes = { systemType: 'PFM031' }
  const codes = useQueries({
    queries: Object.values(commonCodes).map((v) => {
      return { queryKey: ['code', v], queryFn: () => getCode(v), staleTime: Infinity }
    }),
  })
  let cCode = {}
  Object.keys(commonCodes).forEach((v, i) => {
    cCode[v] = codes[i].data
  })
  const { toastOpen } = useToastPopup()
  const searchParams = useSearchParams()
  const [licenseId] = useState(searchParams.get('id'))

  const [licenseInfo, setLicenseInfo] = useState({ systemName: '', licenceNumber: '', systemType: '', modifyDate: null, contents: '' })
  const CKEditor = useMemo(() => dynamic(() => import('editor/CKEditor'), { ssr: false }), [])
  const [isDisabled, setDisabled] = useState(true)
  const { data: licenseDetailData } = useLicenseDetailData(licenseId)

  useEffect(() => {
    setLicenseInfo(licenseDetailData)
  }, [licenseDetailData])

  const mutateLicense = useAddLicenseMutation()

  const editCancel = useCallback(() => {
    alertClose()
    router.push(`/license/detail?id=${licenseId}`)
  }, [alertClose, router, licenseId])

  const handleCancel = useCallback(() => {
    if (isDisabled) {
      router.push(`/license/detail?id=${licenseId}`)
    } else {
      alertOpen({
        maxWidth: 's',
        title: 'Do you want to cancel writing?',
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
                editCancel()
              }}
            >
              OK
            </ButtonMui>
          </div>
        ),
        textTitle: `The contents you wrote will disappear and will not be registered.`,
        icon: 'info',
      })
    }
  }, [alertClose, alertOpen, editCancel, isDisabled, licenseId, router])

  const handleSave = useCallback(() => {
    mutateLicense.mutate(licenseInfo, {
      onSuccess: () => {
        toastOpen({ content: 'Successfully saved.', icon: 'success' })
        router.push(`/license`)
      },
      onError: () => {
        toastOpen({ content: 'Save failed.', icon: 'warning' })
      },
    })
  }, [licenseInfo, mutateLicense, router, toastOpen])

  const handleContentsChange = useCallback((data) => {
    setDisabled(false)
    setLicenseInfo((prev) => {
      return { ...prev, contents: data }
    })
  }, [])

  return (
    <>
      <div className="sticky_wrap">
        <ContentBox type="top_content">
          {/* lft/rgt 가 좌우로 정렬됩니다.  */}
          <div className="lft">
            <Breadcrumb pageTitleList={['License', 'License Detail', 'Edit License']} />
            <h1 className="headline1">{licenseInfo?.systemName}</h1>
          </div>
        </ContentBox>
      </div>
      <ContentBox>
        <article>
          <div className="cont_title_box">
            <p className="title1">Basic Information</p>
            <p className="body2">Please enter license basic information.</p>
          </div>
          <DetailTable
            colgroup={
              <colgroup>
                <col width="15%" />
                <col width="35%" />
                <col width="15%" />
                <col width="35%" />
              </colgroup>
            }
          >
            <tr>
              <th>No.</th>
              <td>
                <div className="grid6">
                  <BaseInput disabled value={`${licenseInfo?.licenceNumber}`} />
                </div>
              </td>
              <th>Uploaded date</th>
              <td>
                <div className="grid6">
                  <DatePicker disabled defaultDate={format(new Date(), 'yyyy-MM-dd')} />
                </div>
              </td>
            </tr>
            <tr>
              <th>System type</th>
              <td colSpan={3}>
                <div className="grid6">
                  <SelectMui size="full" options={cCode['systemType']} disabled value={licenseInfo?.systemType} />
                </div>
              </td>
            </tr>
          </DetailTable>
        </article>
        <article>
          <div className="cont_title_box">
            <p className="title1">License Detail Information</p>
            <p className="body2">Please enter contents.</p>
          </div>
          <div className="editor mt_20">
            <CKEditor onEditorChange={handleContentsChange} tableName="TSW_LICN" data={licenseInfo?.contents} />
          </div>
        </article>
        <div className="cont_bottom_box">
          <div className="align end">
            <ButtonMui type="outlined" size="xlarge" onClick={handleCancel}>
              Cancel
            </ButtonMui>
            <ButtonMui
              disabled={isDisabled || getPathInfo(pathname).uptYn !== 'Y'}
              type="contained"
              size="xlarge"
              onClick={handleSave}
              iconStyle={{ fill: '#fff' }}
              isLoading={mutateLicense.isLoading}
            >
              Save
            </ButtonMui>
          </div>
        </div>
      </ContentBox>
    </>
  )
}
