/**
 * 회원 탈퇴 동의란 체크
 */

import { ChangeEvent, Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react'
import { Checkbox } from 'ui'

const testParagraph = {
  first: 'I agree that all personal information and service use records will be deleted after withdrawal.',
  second: 'I agree to keep business records and post registered in the service even after withdrawal.',
  third: 'I agree to collectively withdraw from other service (system tools such as ODS and SG-IDEA) using my account.',
  fourth: 'I have read all instructions and agree to them.',
}

interface SecessionInfo {
  checked: boolean
  isChecked: Dispatch<SetStateAction<boolean>>
}

// RadioBox onChange와 checked 속성 추가 요청
const SecessionCheck = (props: SecessionInfo) => {
  const { checked, isChecked } = props

  const [checkList, setCheckedList] = useState<boolean[]>([false, false, false, false])

  const handleList = useCallback(
    (id: string) => {
      checkList[Number(id) - 1] = !checkList[Number(id) - 1]
      setCheckedList([...checkList])
    },
    [checkList, setCheckedList]
  )

  useEffect(() => {
    if (!checkList.includes(false)) {
      isChecked(true)
    } else isChecked(false)
  }, [isChecked, checkList])

  return (
    <article>
      {/* 최유희 : 전체적으로 마크업 정리 진행했습니다. 더 필요한 부분 있으면 이야기 주세요. */}
      <ul>
        <li className="body1 typo700">
          {/* <RadioBox id="1" text={testParagraph.first} type="check" onChange={(event: ChangeEvent<HTMLInputElement>) => handleList(event.target.id)} /> */}
          <Checkbox uiType="round" id="1" labelText={testParagraph.first} onChange={(event: ChangeEvent<HTMLInputElement>) => handleList(event.target.id)} />
        </li>
        <li className="body1 typo700 mt_10">
          {/* <RadioBox id="2" text={testParagraph.second} type="check" onChange={(event: ChangeEvent<HTMLInputElement>) => handleList(event.target.id)} /> */}
          <Checkbox uiType="round" id="2" labelText={testParagraph.second} onChange={(event: ChangeEvent<HTMLInputElement>) => handleList(event.target.id)} />
        </li>
        <li className="body1 typo700 mt_10">
          {/* <RadioBox id="3" text={testParagraph.third} type="check" onChange={(event: ChangeEvent<HTMLInputElement>) => handleList(event.target.id)} /> */}
          <Checkbox uiType="round" id="3" labelText={testParagraph.third} onChange={(event: ChangeEvent<HTMLInputElement>) => handleList(event.target.id)} />
        </li>
        <li className="body1 typo700 mt_10">
          {/* <RadioBox id="4" text={testParagraph.fourth} type="check" onChange={(event: ChangeEvent<HTMLInputElement>) => handleList(event.target.id)} /> */}
          <Checkbox uiType="round" id="4" labelText={testParagraph.fourth} onChange={(event: ChangeEvent<HTMLInputElement>) => handleList(event.target.id)} />
        </li>
      </ul>
    </article>
  )
}

export default SecessionCheck
