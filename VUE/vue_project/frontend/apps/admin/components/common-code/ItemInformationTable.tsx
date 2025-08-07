import { Fragment } from 'react'
import { BoardTable, SwitchToggle } from 'ui'
import { standardCodeHeader } from 'library/constant/table'
import { CCItemInformation } from '@type/common-code/commonCodeType'
import { useCommonCode } from '@hook/useCommonCode'

export default function ItemInformationTable({
  itemInfoList,
  languageCode,
  selectedLanguageIndex,
}: {
  itemInfoList: CCItemInformation[]
  languageCode: { languageCode: string; languageName: string }[]
  selectedLanguageIndex: number
}) {
  const { findCodeNameByLangCode } = useCommonCode()

  return (
    <BoardTable>
      <colgroup>
        <col width="12%" />
        <col width="20%" />
        <col width="19%" />
        <col width="auto" />
      </colgroup>
      <thead>
        <tr>
          {standardCodeHeader.map((theader, i) => (
            <th key={i}>{theader}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {itemInfoList &&
          itemInfoList.map((data, index) => {
            return (
              <Fragment key={index}>
                {selectedLanguageIndex > -1 ? (
                  <tr>
                    <td rowSpan={1} className="vt">
                      <SwitchToggle disabled id={data.useYn} color="primary" value={data.useYn === 'Y'} />
                    </td>
                    <td rowSpan={1} className="vt">
                      {data.code}
                    </td>
                    <td className="pl_12">{languageCode[selectedLanguageIndex].languageName}</td>
                    <td>{findCodeNameByLangCode(data.codeItemMultiLanguageList, languageCode[selectedLanguageIndex].languageCode)}</td>
                  </tr>
                ) : (
                  languageCode.map((codeItem, i) => (
                    <tr key={`${index}-${i}`}>
                      {i === 0 && (
                        <>
                          <td rowSpan={languageCode.length} className="vt">
                            <SwitchToggle disabled id={data.useYn} color="primary" value={data.useYn === 'Y'} />
                          </td>
                          <td rowSpan={languageCode.length} className="vt">
                            {data.code}
                          </td>
                        </>
                      )}
                      <td className="pl_12">{codeItem.languageName}</td>
                      <td>{findCodeNameByLangCode(data.codeItemMultiLanguageList, codeItem.languageCode)}</td>
                    </tr>
                  ))
                )}
              </Fragment>
            )
          })}
      </tbody>
    </BoardTable>
  )
}
