import { ContentBox, ButtonMui, DetailTable, BaseInput, TextArea } from 'ui'
import { AlertType, useAlert, useParamsData } from 'library'
import { useRouter } from 'next/navigation'
type AlogoAddInfoType = {
  name: string
  desc: string
  placeholder: string
}

type AlogoAddFormType = {
  cancel: () => void
  add: () => void
  info: AlogoAddInfoType
  algoAddLoading: boolean
}

const AlogoAddForm = ({ cancel, add, info, algoAddLoading }: AlogoAddFormType) => {
  const router = useRouter()
  const { setChangeParams, checkEmptyValue } = useParamsData()
  const { alertOpen, alertClose } = useAlert()

  const cancelCustom = () => {
    const alertState: AlertType = {
      InfoType: 'cancel',
      content: (
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            Cancel
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={() => router.replace('/algorithm/custom-code')}>
            OK
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
  }

  return (
    <ContentBox>
      <article>
        <div className="cont_title_box">
          <p className="title1">Basic Information</p>
        </div>
        <DetailTable
          colgroup={
            <colgroup>
              <col width="220px" />
              <col width="auto" />
            </colgroup>
          }
        >
          <tr>
            <th>{info?.name}</th>
            <td>
              <BaseInput maxLength={45} placeholder={info.placeholder} onChange={(event) => setChangeParams(event, 'name')} />
            </td>
          </tr>
          <tr>
            <th className="va_top pt_20">{info?.desc}</th>
            <td className="va_top">
              <TextArea maxLength={256} height={100} placeholder="Please enter description." onChange={(event) => setChangeParams(event, 'desc')} />
            </td>
          </tr>
        </DetailTable>
      </article>

      <div className="cont_bottom_box">
        <div className="align end">
          <ButtonMui type="outlined" size="xlarge" onClick={info.name === 'Custom code name' ? cancelCustom : cancel}>
            Cancel
          </ButtonMui>

          <ButtonMui size="xlarge" isLoading={algoAddLoading} onClick={add} disabled={checkEmptyValue()}>
            Add
          </ButtonMui>
        </div>
      </div>
    </ContentBox>
  )
}

export default AlogoAddForm
