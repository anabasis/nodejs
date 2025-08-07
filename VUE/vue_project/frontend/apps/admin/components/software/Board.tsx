'use client'
import { useSearchFilter } from '@hook/useSearchFIlter'
import { useSoftwareList } from '@store/server/useSoftwareQuery'
import { useQuery } from '@tanstack/react-query'
import { SoftwareParamsType, SoftwareReturnType } from '@type/software/softwareType'
import { getPrvFileUrl, softwareHeader, apiAdmin, changeTimeLocal, getCdnFileUrl } from 'library'
import { FileResType } from 'library/type/common'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { AvatarMui, BoardTable, ButtonMui, EllipsisTypo, NoData, Pagenation } from 'ui'

const Board = () => {
  const router = useRouter()
  const { onPageChange, currentPage, searchFilterParams } = useSearchFilter<SoftwareParamsType>()
  const { softwareList, isSuccess } = useSoftwareList({ searchFilterParams, currentPage })

  const [filePath, setFilePath] = useState('')

  const setFileUrl = (file: FileResType) => {
    if (!file) return null
    if (file.storageTypeCode === 'PRV') {
      getPrvFileUrl(file).then((res) => {
        setFilePath(res)
      })
    } else {
      setFilePath(getCdnFileUrl(file) ?? '')
    }
  }

  //상세페이지 이동
  const handleClick = (appsId) => {
    router.push(`/software/detail?appsId=${appsId}`)
  }

  return (
    <>
      <BoardTable>
        <colgroup>
          <col style={{ width: '20%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: 'auto' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '10%' }} />
        </colgroup>
        <thead>
          <tr>
            {softwareHeader.map((theader, i) => (
              <th key={i}>{theader}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isSuccess && softwareList?.content?.length === 0 ? (
            <tr className="nodata">
              <td colSpan={6}>
                <NoData text="There are no registered apps." />
              </td>
            </tr>
          ) : (
            softwareList?.content.map((apps, index) => {
              return (
                <tr key={index} onClick={() => handleClick(apps.softwareNumber)}>
                  <td>
                    {/* 앱 이미지 아이콘 -> 컴포넌트로 변경 */}
                    <div className="align start gap_10">
                      <AvatarMui
                        size="medium"
                        type="circular"
                        data={[
                          {
                            src: getCdnFileUrl(apps.iconFile) === null ? '/images/no_icon.png' : getCdnFileUrl(apps.iconFile),
                            alt: 'Profile',
                          },
                        ]}
                      />
                      <EllipsisTypo>{apps.softwareName}</EllipsisTypo>
                    </div>
                  </td>
                  <td>{apps.ivdRuoCode}</td>
                  {/* <td>{product.description.length > 31 ? product.description.substring(0, 30).concat('...') : product.description}</td> */}
                  <td>
                    {/* 최유희 : 일립시스 필요 시 사용 */}
                    <EllipsisTypo>{apps.description}</EllipsisTypo>
                  </td>
                  <td>{changeTimeLocal({ time: apps.createDateTime, type: 'yyyy-MM-dd' })}</td>
                  {/* <td>{Array.isArray(apps) && apps.softwareRelease.map((data) => data.version)}</td> */}
                  <td>{apps.softwareRelease.version}</td>
                  <td onClick={(event) => event.stopPropagation()} onMouseEnter={() => setFileUrl(apps.softwareRelease.softwareFile)}>
                    {/* disabled 스타일 반영 */}
                    <ButtonMui
                      disabled={apps.softwareRelease.softwareReleaseNumber === 0}
                      color="black"
                      uiType="etc"
                      className="round8"
                      icon="FileDownloadIcon"
                      iconStyle={{ fill: apps.softwareRelease.softwareReleaseNumber === 0 ? 'var(--typo500)' : 'var(--navy800)', width: 16, height: 16 }}
                      onClick={() => {}}
                      size="small"
                      type="outlined"
                    >
                      <a className={apps.softwareRelease.softwareReleaseNumber === 0 ? 'typo500' : 'navy800'} href={filePath} download target="_blank">
                        Download
                      </a>
                    </ButtonMui>
                  </td>
                </tr>
              )
            })
          )}
        </tbody>
      </BoardTable>
      <Pagenation
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPage={softwareList?.totalPages}
        pageSize={searchFilterParams?.size}
        totalCount={softwareList?.totalElements}
      />
    </>
  )
}

export default Board
