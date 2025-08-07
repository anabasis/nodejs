import { termsCategoryNameAtom, termsDataFamilyAtom } from '@store/client/terms'
import { DetailTable } from 'ui/components'
import { useAtomValue } from 'jotai'
import { createMarkup } from 'library/util'
import { TermsConditionsDetailType } from '@type/terms'

const LangauageTerms = ({ index }: { index: number }) => {
  const termsData = useAtomValue(termsDataFamilyAtom(index)) as TermsConditionsDetailType
  const termsCategoryName = useAtomValue(termsCategoryNameAtom)

  return (
    <>
      <div className="cont_title_box mb_1">
        {/* <p className="title1">{termsCategoryName}</p> */}
        {/* bug 25027 :: 버그 등록으로 수정  */}
        <p className="title1">Terms & Conditions Detail</p>
      </div>
      <DetailTable
        colgroup={
          <colgroup>
            <col style={{ width: '15%' }} />
            <col style={{ width: 'auto' }} />
          </colgroup>
        }
      >
        <tr>
          <th className="va_top ptb_9">Contents</th>
          <td>
            <div className="ck-content" dangerouslySetInnerHTML={createMarkup(termsData?.content)} />
          </td>
        </tr>
      </DetailTable>
    </>
  )
}

export default LangauageTerms
