'use client'
import { equipmentSchema } from '@constant/masterDataOption'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMasterMutation } from '@store/server/useMasterQuery'
import { EditEquipmentMasterData } from '@type/mater/masterDataType'
import { AlertType, useAlert } from 'library'
import { debounce as _debounce } from 'lodash-es'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import { BaseInput, DetailTable, InputDec, InputLabel } from 'ui/components'
import { ButtonMui } from 'ui/mui'

const EditEquipment = ({ masterData }) => {
  const router = useRouter()
  const masterId = useSearchParams().get('masterId') //id(PK)
  const path = useSearchParams().get('path')
  const { modifyMaster, modifyMasterIsLoading } = useMasterMutation()

  const equipmentData: EditEquipmentMasterData = masterData

  const { alertOpen, alertClose } = useAlert()
  //버튼 로딩중?
  const [loading, isLoading] = useState<boolean>(false)

  const {
    handleSubmit,
    control,
    reset,
    setValue,
    register,
    getValues,
    formState: { isDirty, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(equipmentSchema),
  })

  const { field: nameField, fieldState: nameFieldState } = useController({ name: 'instrmNm', control })
  const { field: codeField, fieldState: codeFieldState } = useController({ name: 'instrmCd', control })
  const { field: rowField, fieldState: rowFieldState } = useController({ name: 'rowCnt', control })
  const { field: columnField, fieldState: columnFieldState } = useController({ name: 'colCnt', control })

  useEffect(() => {
    equipmentData &&
      reset({
        instrmNm: equipmentData.instrmNm,
        instrmCd: equipmentData.instrmCd,
        rowCnt: equipmentData.rowCnt.toString(),
        colCnt: equipmentData.colCnt.toString(),
      })
  }, [masterData])

  const handleEditEquipment = _debounce(() => {
    handleSubmit(onSubmit)()
  }, 300)

  const onSubmit = async (data: EditEquipmentMasterData) => {
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
      <article>
        {/* 컨텐츠 간 간격은 article 로 묶습니다. */}
        <div className="cont_title_box">
          <div className="align start">
            <p className="title1 mr_10">Master Data Information</p>
          </div>
        </div>

        {masterData && (
          <form>
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
                  <BaseInput {...nameField} {...register} maxLength={100} />
                </td>
                <th>
                  <InputLabel labelText="Number of row" />
                </th>

                <td>
                  {rowFieldState.error ? (
                    <>
                      <BaseInput {...rowField} {...register} error />
                      <InputDec msg="Please enter Row." error />
                    </>
                  ) : (
                    <BaseInput {...rowField} {...register} />
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
                      <BaseInput {...columnField} {...register} error />

                      <InputDec msg="Please enter Column." error />
                    </>
                  ) : (
                    <BaseInput {...columnField} {...register} />
                  )}
                </td>
                <th>
                  <InputLabel labelText="Code" />
                </th>
                <td>
                  <BaseInput {...codeField} {...register} maxLength={20} />
                </td>
              </tr>
            </DetailTable>
          </form>
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
              handleEditEquipment()
            }}
          >
            Save
          </ButtonMui>
        </div>
      </div>
    </>
  )
}

export default EditEquipment
