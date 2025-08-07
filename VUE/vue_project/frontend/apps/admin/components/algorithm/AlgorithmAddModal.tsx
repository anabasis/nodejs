import { BaseInput, DetailTable, TextArea } from 'ui/components'
import { ButtonMui } from 'ui/mui'
import { isEmptyCheck, useModal } from 'library'
import { ChangeEvent, useState } from 'react'
type AlgorithmAddModalType = {
  title: string
  description: string
  add: (info: { name: string; type: string; desc: string }) => void
}

const initAlog = {
  name: '',
  type: 'DSP 1.0',
  desc: '',
}
const AlgorithmAddModal = ({ title, description, add }: AlgorithmAddModalType) => {
  const { modalClose } = useModal()
  const [libTypeInfo, setLibTypeInfo] = useState(initAlog)
  const { desc, name } = libTypeInfo
  const onChagneLibTitle = (event: React.ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    setLibTypeInfo((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      }
    })
  }

  return (
    <>
      <DetailTable
        colgroup={
          <colgroup>
            <col width="180px" />
            <col width="auto" />
          </colgroup>
        }
      >
        <tr>
          <th>{title}</th>
          <td>
            <BaseInput placeholder="placeholder" name="name" onChange={onChagneLibTitle} />
          </td>
        </tr>
        <tr>
          <th className="vt">{description}</th>
          <td>
            <TextArea maxLength={500} placeholder="placeholder" name="desc" onChange={onChagneLibTitle} />
          </td>
        </tr>
      </DetailTable>
      <div className="align center mt_30">
        <ButtonMui type="outlined" size="xlarge" onClick={() => modalClose()}>
          취소
        </ButtonMui>
        <ButtonMui size="xlarge" disabled={!name || !desc} onClick={() => add(libTypeInfo)}>
          버튼
        </ButtonMui>
      </div>
    </>
  )
}

export default AlgorithmAddModal
