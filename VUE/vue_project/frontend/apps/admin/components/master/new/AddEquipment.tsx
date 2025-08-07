import { equipmentSchema } from '@constant/masterDataOption'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMasterMutation } from '@store/server/useMasterQuery'
import { NewEquipmentMasterData } from '@type/mater/masterDataType'
import { AlertType, useAlert } from 'library'
import { debounce as _debounce } from 'lodash-es'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import { BaseInput, DetailTable, InputDec, InputLabel } from 'ui/components'
import { ButtonMui } from 'ui/mui'

const AddEquipment = () => {
  const router = useRouter()
  const path = useSearchParams().get('path')

  const { alertOpen, alertClose } = useAlert()
  const { addMaster, addMasterIsLoading } = useMasterMutation()

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(equipmentSchema),
  })

  const { field: nameField, fieldState: nameFieldState } = useController({ name: 'instrmNm', control })
  const { field: codeField, fieldState: codeFieldState } = useController({ name: 'instrmCd', control })
  const { field: rowField, fieldState: rowFieldState } = useController({ name: 'rowCnt', control })
  const { field: columnField, fieldState: columnFieldState } = useController({ name: 'colCnt', control })
  //버튼 로딩중?
  const [loading, isLoading] = useState<boolean>(false)

  const handleAddEquipment = _debounce(() => {
    handleSubmit(onSubmit)()
  }, 300)

  const onSubmit = async (data: NewEquipmentMasterData) => {
    if (loading) {
      return
    }
    isLoading(true)

    addMaster({ path, data })
    isLoading(false)
  }

  const cancel = () => {
    const alertState: AlertType = {
      InfoType: 'cancel',
      content: (
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            Cancel
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={() => router.push(`/master/equipment`)}>
            OK
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
  }

  return (
    <>
      <form>
        {/* 컨텐츠 간 간격은 article 로 묶습니다. */}
        <div className="cont_title_box">
          <div className="align start">
            <p className="title1 mr_10">Master Data Information</p>
          </div>
        </div>
        <DetailTable
          colgroup={
            <colgroup>
              <col style={{ width: '15%' }} />
              <col style={{ width: '35%' }} />
              <col style={{ width: '15%' }} />
              <col style={{ width: '35%' }} />
            </colgroup>
          }
        >
          <tr>
            <th>
              <InputLabel labelText="Instrument name" />
            </th>
            <td>
              <BaseInput size="lg" placeholder="Please enter the instrument name." onChange={(event) => nameField.onChange(event)} maxLength={100} />
            </td>
            <th>
              <InputLabel labelText="Number of row" />
            </th>
            <td>
              {rowFieldState.error ? (
                <>
                  <BaseInput size="lg" placeholder="Please enter row." onChange={(event) => rowField.onChange(event)} error />
                  <InputDec msg="Please enter row." error />
                </>
              ) : (
                <BaseInput size="lg" placeholder="Please enter row." onChange={(event) => rowField.onChange(event)} />
              )}
            </td>
          </tr>
          <tr>
            <th>
              <InputLabel labelText="Number of colum" />
            </th>
            <td>
              {columnFieldState.error ? (
                <>
                  <BaseInput size="lg" placeholder="Please enter column." onChange={(event) => columnField.onChange(event)} error />
                  <InputDec msg="Please enter column." error />
                </>
              ) : (
                <BaseInput size="lg" placeholder="Please enter column." onChange={(event) => columnField.onChange(event)} />
              )}
            </td>
            <th>
              <InputLabel labelText="Code" />
            </th>
            <td>
              <BaseInput size="lg" placeholder="Please enter the code." onChange={(event) => codeField.onChange(event)} maxLength={20} />
            </td>
          </tr>
        </DetailTable>
      </form>
      <div className="cont_bottom_box">
        <div className="align end">
          <ButtonMui
            type="outlined"
            size="xlarge"
            onClick={() => {
              cancel()
            }}
          >
            Cancel
          </ButtonMui>
          <ButtonMui
            disabled={!isValid}
            type="contained"
            size="xlarge"
            isLoading={addMasterIsLoading}
            onClick={() => {
              handleAddEquipment()
            }}
          >
            Add
          </ButtonMui>
        </div>
      </div>
    </>
  )
}
export default AddEquipment
