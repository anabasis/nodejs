import { equipmentDriverSchema } from '@constant/masterDataOption'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMasterMutation } from '@store/server/useMasterQuery'
import { NewEquipmentDriverMasterData } from '@type/mater/masterDataType'
import { AlertType, useAlert } from 'library'
import { debounce as _debounce } from 'lodash-es'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import { BaseInput, DetailTable, InputDec, InputLabel, TextArea } from 'ui/components'
import { ButtonMui } from 'ui/mui'

const AddEquipmentDriver = () => {
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
    resolver: yupResolver(equipmentDriverSchema),
  })

  const { field: nameField, fieldState: nameFieldState } = useController({ name: 'instrmDrvNm', control })
  const { field: displayNameField, fieldState: displayNameFieldState } = useController({ name: 'dspNm', control })
  const { field: supportedWellField, fieldState: supportedWellFieldState } = useController({ name: 'suptWlCnt', control })
  const { field: instrmIDField, fieldState: instruIdFieldState } = useController({ name: 'instrmDrvId', control })
  const { field: descField, fieldState: descFieldState } = useController({ name: 'dscrp', control })

  //버튼 로딩중?
  const [loading, isLoading] = useState<boolean>(false)

  const handleAddEquipmentDriver = _debounce(() => {
    handleSubmit(onSubmit)()
  }, 300)

  const onSubmit = async (data: NewEquipmentDriverMasterData) => {
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
          <ButtonMui size="xlarge" onClick={() => router.push(`/master/equipment-driver`)}>
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
          <tr id="tableHeader">
            <th>
              <InputLabel labelText="Instrument driver name" />
            </th>
            <td>
              <BaseInput size="lg" placeholder="Please enter the Parser name." onChange={(event) => nameField.onChange(event)} maxLength={100} />
            </td>
            <th>
              <InputLabel labelText="Display name" />
            </th>
            <td>
              <BaseInput
                size="lg"
                placeholder="Please enter the notational instrument name."
                onChange={(event) => displayNameField.onChange(event)}
                maxLength={100}
              />
            </td>
          </tr>
          <tr>
            <th>
              <InputLabel labelText="Supported well" />
            </th>
            <td>
              {supportedWellFieldState.error ? (
                <>
                  <BaseInput size="lg" placeholder="Please enter the support plate well." onChange={(event) => supportedWellField.onChange(event)} error />
                  <InputDec msg="Please enter the support plate well." error />
                </>
              ) : (
                <BaseInput size="lg" placeholder="Please enter the support plate well." onChange={(event) => supportedWellField.onChange(event)} />
              )}
            </td>
            <th>
              <InputLabel labelText="Instrument driver ID" />
            </th>
            <td>
              <BaseInput size="lg" placeholder="Please enter the instrument driver ID." onChange={(event) => instrmIDField.onChange(event)} maxLength={20} />
            </td>
          </tr>
          <tr>
            <th>
              <InputLabel labelText="Description" />
            </th>
            <td colSpan={3}>
              <TextArea placeholder="Please enter description." onChange={(event) => descField.onChange(event)} maxLength={500} />
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
              handleAddEquipmentDriver()
            }}
          >
            Add
          </ButtonMui>
        </div>
      </div>
    </>
  )
}
export default AddEquipmentDriver
