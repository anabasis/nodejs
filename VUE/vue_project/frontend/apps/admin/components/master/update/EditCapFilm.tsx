import { capFilmSchema } from '@constant/masterDataOption'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMasterMutation } from '@store/server/useMasterQuery'
import { EditCapFilmMasterData } from '@type/mater/masterDataType'
import { AlertType, useAlert } from 'library'
import { debounce as _debounce } from 'lodash-es'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import { BaseInput, DetailTable, InputLabel, RadioBox } from 'ui/components'
import { ButtonMui } from 'ui/mui'

const EditCapFilm = ({ masterData }) => {
  const router = useRouter()
  const masterId = useSearchParams().get('masterId') //id(PK)
  const path = useSearchParams().get('path')
  const { modifyMaster, modifyMasterIsLoading } = useMasterMutation()

  const capFilmData: EditCapFilmMasterData = masterData

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
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(capFilmSchema),
  })

  const { field: capFilmNameField, fieldState: capFilmNameFieldState } = useController({ name: 'capFilmName', control })
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
    capFilmData
    reset({
      capFilmName: capFilmData?.capFilmName,
      displayName: capFilmData?.displayName,
      classificationCode: capFilmData?.classificationCode,
      enbleYn: capFilmData?.enbleYn,
    })
    setSelectedValue(capFilmData?.enbleYn)
  }, [capFilmData, reset])

  useEffect(() => {
    if ((!isDirty && selectedValue === capFilmData?.enbleYn) || !isValid) {
      isDisableButton(true)
    } else {
      isDisableButton(false)
    }
  }, [isDirty, isValid, selectedValue, capFilmData])

  const handleAddCapFilm = _debounce(() => {
    handleSubmit(onSubmit)()
  }, 300)

  const onSubmit = (data: EditCapFilmMasterData) => {
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
          <ButtonMui size="xlarge" onClick={() => router.push(`/master/cap-film`)}>
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
                <InputLabel labelText="Cap/film name" id="ipt01" />
              </th>
              <td>
                <BaseInput {...capFilmNameField} {...register} maxLength={100} />
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
              handleAddCapFilm()
            }}
          >
            Save
          </ButtonMui>
        </div>
      </div>
    </>
  )
}

export default EditCapFilm
