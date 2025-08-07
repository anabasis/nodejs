import { DetailTable, SelectMui, ButtonMui, SelectChangeEventType, InputDec } from 'ui'
import { useCode, useModal, useModuleSelectFilter } from 'library'
import { QnaCommonCodes } from '@type/qna'
import { useQnaMuate } from '@store/server/useQnaQuery'
import { useState } from 'react'

const commonCodes = { category: 'PFM008', module: 'PFM009' }

type QnaTransferParams = {
  category: string
  module: string
}

const QnaTransferModal = ({ qnaNum }: { qnaNum: string }) => {
  const { modalClose } = useModal()
  const [params, setChangeParams] = useState<QnaTransferParams>({ category: '', module: '' })
  const { cCode } = useCode(commonCodes) as { cCode: QnaCommonCodes }
  const { resetQnaManagerMutate } = useQnaMuate()
  const { selectData, changeSelectData } = useModuleSelectFilter<QnaTransferParams>({
    cCode,
    isInit: false,
    params,
  })

  const onChangeSelect = (event: SelectChangeEventType) => {
    const { name } = event.target
    changeSelectData(event, name)

    if (name === 'category') {
      setChangeParams({
        [name]: event.target.value,
        module: '',
      })
      return
    }

    setChangeParams((prev) => {
      return {
        ...prev,
        [name]: event.target.value,
      }
    })
  }

  const save = () => {
    resetQnaManagerMutate({ qnaNum, params })
  }

  return (
    <>
      <DetailTable
        colgroup={
          <colgroup>
            <col width="150px" />
            <col width="auto" />
          </colgroup>
        }
      >
        <tr>
          <th className="va_top pt_20">Category</th>
          <td className="pr_0">
            <SelectMui
              size="full"
              value={params.category || ''}
              options={selectData?.category}
              placeholder="Please choose a category."
              name="category"
              onChange={onChangeSelect}
            />
            <InputDec msg="Please select a category first and then select a module." />
          </td>
        </tr>
        <tr>
          <th>Module</th>
          <td className="pr_0">
            <SelectMui
              size="full"
              disabled={!params.category}
              value={params.module || ''}
              options={selectData?.module}
              placeholder="Please select a module."
              name="module"
              onChange={onChangeSelect}
            />
          </td>
        </tr>
      </DetailTable>
      <div className="mt_40 align center">
        <ButtonMui
          size="xlarge"
          type="outlined"
          onClick={() => {
            modalClose()
          }}
        >
          Cancel
        </ButtonMui>

        <ButtonMui disabled={!params.category || !params.module} size="xlarge" onClick={save}>
          Save
        </ButtonMui>
      </div>
    </>
  )
}

export default QnaTransferModal
