'use client'

import { Breadcrumb, DetailTable } from 'ui/components'
import { ContentBox } from 'ui/layouts'
import { ButtonMui, SelectChangeEvent, SelectMui } from 'ui/mui'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback, useEffect, useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { useToastPopup } from 'library/hook/useToastPopup'
import DatePicker from 'ui/datepicker/DatePicker'
import { useAddLicenseMutation, useExistSystemCodeData } from '@store/server/useLicenseQuery'
import { getCode, changeTimeLocal } from 'library/util'
import { useQueries } from '@tanstack/react-query'
import { LicenseType } from '@type/license/licenseType'
import { format } from 'date-fns'
import { useAlert } from 'library/hook/useAlert'
import { useMenu } from 'library'

export default function AddPage() {
  const CKEditor = useMemo(() => dynamic(() => import('editor/CKEditor'), { ssr: false }), [])
  const { alertOpen, alertClose } = useAlert()
  const pathname = usePathname()
  const { getPathInfo } = useMenu()
  //공통코드
  let systemType: Array<{ name: string; value: string }> = []
  const { data: existSystemCode } = useExistSystemCodeData()
  const commonCodes = { systemType: 'PFM031' }
  const codes = useQueries({
    queries: Object.values(commonCodes).map((v) => {
      return { queryKey: ['code', v], queryFn: () => getCode(v), staleTime: Infinity }
    }),
  })
  Object.keys(commonCodes).forEach((v, i) => {
    if (typeof codes[i].data === 'object' && typeof existSystemCode === 'object') {
      systemType = codes[i].data.filter((item) => existSystemCode.includes(item.value))
    }
  })
  const mutateLicense = useAddLicenseMutation()

  const router = useRouter()
  const { toastOpen } = useToastPopup()

  const [licenseInfo, setLicenseInfo] = useState<LicenseType>({ systemType: '', contents: '' })

  const isDisabled = useMemo(() => {
    return licenseInfo.systemType == '' || licenseInfo.contents == ''
  }, [licenseInfo])

  const addCancel = useCallback(() => {
    alertClose()
    router.push('/license')
  }, [alertClose, router])

  const handleCancel = useCallback(() => {
    if (isDisabled) {
      router.push('/license')
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
                addCancel()
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
  }, [addCancel, alertClose, alertOpen, isDisabled, router])

  //라이선스 저장
  const handleSave = useCallback(() => {
    mutateLicense.mutate(licenseInfo, {
      onSuccess: () => {
        toastOpen({ content: 'Successfully added.', icon: 'success' })
        router.push(`/license`)
      },
      onError: () => {
        toastOpen({ content: 'Add failed.', icon: 'warning' })
      },
    })
  }, [licenseInfo, mutateLicense, router, toastOpen])

  const handleSystemTypeChange = useCallback((e: SelectChangeEvent) => {
    setLicenseInfo((prev) => {
      return { ...prev, systemType: e.target.value }
    })
  }, [])

  const handleContentsChnage = useCallback((data: string) => {
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
            <Breadcrumb pageTitleList={['License', 'Add License']} />
            <h1 className="headline1">License</h1>
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
              <th>System type</th>
              <td>
                <div className="grid6">
                  <SelectMui size="full" options={systemType} placeholder="Select" value={licenseInfo.systemType} onChange={handleSystemTypeChange} />
                </div>
              </td>
              <th>Uploaded date</th>
              <td>
                <div className="grid6">
                  <DatePicker disabled defaultDate={format(new Date(), 'yyyy-MM-dd')} placeholderText="Select date" />
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
            <CKEditor onEditorChange={handleContentsChnage} tableName="TSW_LICN" data={licenseInfo.contents} placeholder="Please enter contents." />
          </div>
        </article>
        <div className="cont_bottom_box">
          <div className="align end">
            <ButtonMui type="outlined" size="xlarge" onClick={handleCancel}>
              Cancel
            </ButtonMui>
            <ButtonMui
              disabled={isDisabled || getPathInfo(pathname).crtYn !== 'Y'}
              type="contained"
              size="xlarge"
              onClick={handleSave}
              iconStyle={{ fill: '#fff' }}
              isLoading={mutateLicense.isLoading}
            >
              Add
            </ButtonMui>
          </div>
        </div>
      </ContentBox>
    </>
  )
}
