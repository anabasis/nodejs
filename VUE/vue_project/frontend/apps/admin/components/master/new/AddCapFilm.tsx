import { capFilmSchema } from '@constant/masterDataOption'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMasterMutation } from '@store/server/useMasterQuery'
import { NewCapFilmMasterData } from '@type/mater/masterDataType'
import { AlertType, useAlert } from 'library'
import { debounce as _debounce } from 'lodash-es'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import { BaseInput, DetailTable, InputLabel, RadioBox } from 'ui/components'
import { ButtonMui } from 'ui/mui'

const AddCapFilm = () => {
  const router = useRouter()
  const path = useSearchParams().get('path')

  const { alertOpen, alertClose } = useAlert()
  const { addMaster, addMasterIsLoading } = useMasterMutation()

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(capFilmSchema),
  })

  const { field: capFilmNameField, fieldState: capFilmNameFieldState } = useController({ name: 'capFilmName', control })
  const { field: displayNameField, fieldState: displayNameFieldState } = useController({ name: 'displayName', control })
  const { field: classificationCodeField, fieldState: classificationCodeFieldState } = useController({ name: 'classificationCode', control })
  const { field: enbleYnField, fieldState: enbleYnFieldState } = useController({ name: 'enbleYn', control })
  //버튼 로딩중?
  const [loading, isLoading] = useState<boolean>(false)

  useEffect(() => {
    setValue('enbleYn', 'Y') //처음 라디오 버튼의 on값을 변경하지 않을때
  }, [])

  const handleAddCapFilm = _debounce(() => {
    handleSubmit(onSubmit)()
  }, 300)

  const onSubmit = async (data: NewCapFilmMasterData) => {
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
              <BaseInput size="lg" placeholder="Please enter the cap/film name." onChange={(event) => capFilmNameField.onChange(event)} maxLength={100} />
            </td>
            <th>
              <InputLabel labelText="Display name" id="ipt01" />
            </th>
            <td>
              <BaseInput
                size="lg"
                placeholder="Please enter the notational cap/film label name."
                onChange={(event) => displayNameField.onChange(event)}
                maxLength={100}
              />
            </td>
          </tr>
          <tr>
            <th>
              <InputLabel labelText="Code" id="ipt01" />
            </th>
            <td>
              <BaseInput
                size="lg"
                placeholder="Please enter the classification code."
                onChange={(event) => classificationCodeField.onChange(event)}
                maxLength={20}
              />
            </td>

            <th>
              <InputLabel labelText="Enable" id="ipt01" />
            </th>
            <td>
              <div className="align start">
                <div className="item">
                  <RadioBox
                    value="Y"
                    name="group"
                    id="value1"
                    text="On"
                    defaultChecked={true}
                    onChange={(event) => enbleYnField.onChange(event.target.value)}
                  />
                </div>
                <div className="item">
                  <RadioBox value="N" name="group" id="value2" text="Off" onChange={(event) => enbleYnField.onChange(event.target.value)} />
                </div>
              </div>
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
              handleAddCapFilm()
            }}
          >
            Add
          </ButtonMui>
        </div>
      </div>
    </>
  )
}
export default AddCapFilm
