'use client'

import { useRouter } from 'next/navigation'
import { useTermsListData } from '@store/server/useTermsQuery'
import { termsHeader, changeTimeLocal } from 'library'
import { TermsParamsType } from '@type/terms'
import { Badge, BoardTable, NoData, Pagenation } from 'ui'
import { useSearchFilter } from '@hook/useSearchFIlter'
const TermsTable = () => {
  const { searchFilterParams, currentPage, onPageChange } = useSearchFilter<TermsParamsType>()
  const { termsList, isSuccess } = useTermsListData({ searchFilterParams, currentPage })

  const router = useRouter()

  return (
    <>
      <BoardTable>
        <colgroup>
          <col style={{ width: '5%' }} />
          <col style={{ width: '15%' }} />
          <col style={{ width: '20%' }} />
          <col style={{ width: '30%' }} />
          <col style={{ width: '10%' }} />
          <col style={{ width: '8%' }} />
        </colgroup>
        <thead>
          <tr>
            {termsHeader.map((theader, i) => (
              <th key={i}>{theader}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isSuccess && termsList?.content?.length === 0 ? (
            <tr className="nodata">
              <td colSpan={6}>
                <NoData text="There are no registered terms & conditions." className="full" />
              </td>
            </tr>
          ) : (
            termsList?.content?.map((terms, index) => (
              <tr key={index} onClick={() => router.push(`/terms/detail?versionNum=${terms.termsVersionNum}`)}>
                <td>{index + 1 + searchFilterParams.size * currentPage}</td>
                <td>{terms.termsCategoryName}</td>
                <td>{terms.countryName}</td>

                <td style={{ display: 'flex', gap: '10px' }}>
                  {terms?.langName?.split(',').map((lang, i) => (
                    <div key={i}>
                      <Badge uiType="solid">{lang}</Badge>
                    </div>
                  ))}
                </td>
                <td>{terms.version}</td>
                <td>{changeTimeLocal({ time: terms?.applyDate, type: 'yyyy-MM-dd' })}</td>
              </tr>
            ))
          )}
        </tbody>
      </BoardTable>
      <Pagenation
        currentPage={currentPage}
        onPageChange={onPageChange}
        totalPage={termsList?.totalPages}
        totalCount={termsList?.totalElements}
        pageSize={searchFilterParams?.size}
      />
    </>
  )
}

export default TermsTable
