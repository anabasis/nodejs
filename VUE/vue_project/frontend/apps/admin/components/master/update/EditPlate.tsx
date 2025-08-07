import { plateSchema } from '@constant/masterDataOption'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMasterMutation } from '@store/server/useMasterQuery'
import { EditPlateMasterData } from '@type/mater/masterDataType'
import { AlertType, useAlert } from 'library'
import { debounce as _debounce } from 'lodash-es'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import { BaseInput, DetailTable, InputLabel, RadioBox } from 'ui/components'
import { ButtonMui } from 'ui/mui'

const EditPlate = ({ masterData }) => {
  const router = useRouter()
  const masterId = useSearchParams().get('masterId') //id(PK)
  const path = useSearchParams().get('path')
  const { modifyMaster, modifyMasterIsLoading } = useMasterMutation()

  const plateData: EditPlateMasterData = masterData

  const { alertOpen, alertClose } = useAlert()

  const [selectedValue, setSelectedValue] = useState('')
  const [disableButton, isDisableButton] = useState<boolean>(true)
  //버튼 로딩중?
  const [loading, isLoading] = useState<boolean>(false)

  const {
    handleSubmit,
    control,
    reset,
    register,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(plateSchema),
  })

  const { field: plateNameField, fieldState: plateNameFieldState } = useController({ name: 'plateName', control })
  const { field: displayNameField, fieldState: displayNameFieldState } = useController({ name: 'displayName', control })
  const { field: classificationCodeField, fieldState: classificationCodeFieldState } = useController({ name: 'classificationCode', control })
  const { field: enbleYnField, fieldState: enbleYnFieldState } = useController({ name: 'enbleYn', control })

  const enableRadio = [
    {
      id: '1',
      name: 'On',
      value: 'Y',
      checked: selectedValue === 'Y',
    },
    {
      id: '2',
      name: 'Off',
      value: 'N',
      checked: selectedValue === 'N',
    },
  ]
  const changeOpenLevel = (event: React.MouseEvent<HTMLDivElement>, value: string) => {
    setSelectedValue(value)
  }

  useEffect(() => {
    plateData
    reset({
      plateName: plateData?.plateName,
      displayName: plateData?.displayName,
      classificationCode: plateData?.classificationCode,
      enbleYn: plateData?.enbleYn,
    })
    setSelectedValue(plateData?.enbleYn)
  }, [plateData, reset])

  useEffect(() => {
    if ((!isDirty && selectedValue === masterData?.enbleYn) || !isValid) {
      isDisableButton(true)
    } else {
      isDisableButton(false)
    }
  }, [isDirty, isValid, selectedValue, masterData])

  const handleEditPlate = _debounce(() => {
    handleSubmit(onSubmit)()
  }, 300)

  const onSubmit = (data: EditPlateMasterData) => {
    if (loading) {
      return
    }
    isLoading(true)

    setValue('enbleYn', selectedValue)

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
          <ButtonMui size="xlarge" onClick={() => router.push(`/master/plate`)}>
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
                <InputLabel labelText="Plate name" id="ipt01" />
              </th>
              <td>
                <BaseInput {...plateNameField} {...register} maxLength={100} />
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
                <InputLabel labelText="Code" id="ipt01" />
              </th>
              <td>
                <BaseInput {...classificationCodeField} {...register} maxLength={20} />
              </td>
              <th>
                <InputLabel labelText="Enable" id="ipt01" />
              </th>
              <td>
                {enableRadio.map((option, i) => (
                  <div
                    key={option.id}
                    id={option.id}
                    className={`item ${enableRadio.length - 1 === i ? 'pl_20' : ''} `}
                    onClick={(event) => changeOpenLevel(event, option.value)}
                  >
                    <RadioBox
                      value={selectedValue}
                      checked={selectedValue === option.value}
                      text={option.name}
                      id={option.id}
                      onChange={() => enbleYnField.onChange(option.value)}
                      {...enbleYnField}
                      {...register}
                    />
                  </div>
                ))}
              </td>
            </tr>
          </DetailTable>
        </form>
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
            disabled={disableButton}
            type="contained"
            size="xlarge"
            isLoading={modifyMasterIsLoading}
            onClick={() => {
              handleEditPlate()
            }}
          >
            Save
          </ButtonMui>
        </div>
      </div>
    </>
  )
}

export default EditPlate
