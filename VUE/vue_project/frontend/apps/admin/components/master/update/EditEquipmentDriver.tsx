import { equipmentDriverSchema } from '@constant/masterDataOption'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMasterMutation } from '@store/server/useMasterQuery'
import { EditEquipmentDriverMasterData } from '@type/mater/masterDataType'
import { AlertType, useAlert } from 'library'
import { debounce as _debounce } from 'lodash-es'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import { BaseInput, DetailTable, InputDec, InputLabel, TextArea } from 'ui/components'
import { ButtonMui } from 'ui/mui'

const EditEquipmentDriver = ({ masterData }) => {
  const router = useRouter()
  const masterId = useSearchParams().get('masterId') //id(PK)
  const path = useSearchParams().get('path')
  const { modifyMaster, modifyMasterIsLoading } = useMasterMutation()

  const equipDriverData: EditEquipmentDriverMasterData = masterData

  const { alertOpen, alertClose } = useAlert()
  //버튼 로딩중?
  const [loading, isLoading] = useState<boolean>(false)

  const {
    handleSubmit,
    control,
    reset,
    register,
    formState: { isDirty, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(equipmentDriverSchema),
  })

  const { field: nameField, fieldState: nameFieldState } = useController({ name: 'instrmDrvNm', control })
  const { field: displayNameField, fieldState: displayNameFieldState } = useController({ name: 'dspNm', control })
  const { field: supportedWellField, fieldState: supportedWellFieldState } = useController({ name: 'suptWlCnt', control })
  const { field: instrmIDField, fieldState: instruIdFieldState } = useController({ name: 'instrmDrvId', control })
  const { field: descField, fieldState: descFieldState } = useController({ name: 'dscrp', control })

  useEffect(() => {
    equipDriverData &&
      reset({
        instrmDrvNm: equipDriverData.instrmDrvNm,
        dspNm: equipDriverData.dspNm,
        instrmDrvId: equipDriverData.instrmDrvId,
        suptWlCnt: equipDriverData.suptWlCnt,
        dscrp: equipDriverData.dscrp,
      })
  }, [equipDriverData])

  const handleEditEquipmentDriver = _debounce(() => {
    handleSubmit(onSubmit)()
  }, 300)

  const onSubmit = async (data: EditEquipmentDriverMasterData) => {
    if (loading) {
      return
    }
    isLoading(true)

    modifyMaster({ path, masterId, data })
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
      <article>
        {/* 컨텐츠 간 간격은 article 로 묶습니다. */}
        <div className="cont_title_box">
          <div className="align start">
            <p className="title1 mr_10">Master Data Information</p>
          </div>
        </div>
        {masterData && (
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
                <InputLabel labelText="Instrument driver name" id="ipt01" />
              </th>
              <td>
                <BaseInput {...nameField} {...register} maxLength={100} />
              </td>
              <th>
                <InputLabel labelText="Display name" id="ipt01" />
              </th>
              <td>
                <BaseInput {...displayNameField} {...register} maxLength={100} />
              </td>
            </tr>
            <tr>
              <th>
                <InputLabel labelText="Supported well" id="ipt01" />
              </th>
              <td>
                {supportedWellFieldState.error ? (
                  <>
                    <BaseInput {...supportedWellField} {...register} error />
                    <InputDec msg="Please enter the support plate well." error />
                  </>
                ) : (
                  <BaseInput {...supportedWellField} {...register} />
                )}
              </td>
              <th>
                <InputLabel labelText="Instrument driver ID" />
              </th>
              <td>
                <BaseInput {...instrmIDField} {...register} maxLength={20} />
              </td>
            </tr>
            <tr>
              <th>
                <InputLabel labelText="Description" id="ipt01" />
              </th>
              <td colSpan={3}>
                <TextArea {...descField} {...register} maxLength={500} />
              </td>
            </tr>
          </DetailTable>
        )}
      </article>
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
            disabled={!isDirty || !isValid}
            type="contained"
            size="xlarge"
            isLoading={modifyMasterIsLoading}
            onClick={() => {
              handleEditEquipmentDriver()
            }}
          >
            Save
          </ButtonMui>
        </div>
      </div>
    </>
  )
}

export default EditEquipmentDriver
