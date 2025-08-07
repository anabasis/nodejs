'use client'
import { yupResolver } from '@hookform/resolvers/yup'
import { useCorporateMutation } from '@store/server/useCorporateQuery'
import { useAlert } from 'library/hook/useAlert'
import { useRouter } from 'next/navigation'
import { useController, useForm } from 'react-hook-form'
import { BaseInput, ButtonMui, DetailTable, InputDec, InputLabel } from 'ui'
import * as yup from 'yup'

const DeleteCorporate = ({ corporateId, corporateName }) => {
  const router = useRouter()
  const { alertClose } = useAlert()
  const { deleteCorporateMutation } = useCorporateMutation()

  //기업명과 작성한 기업명이 일치한지 검사
  const schema = yup.object().shape({
    corpName: yup
      .string()
      .required()
      .test({
        message: '기업명 불일치',
        test: (corpName) => {
          if (corporateName !== corpName) return false
          else return true
        },
      }),
  })
  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
  })

  const { field: corpNameField, fieldState: corpNameFieldState } = useController({ name: 'corpName', control })

  const handleClickDeleteCorporate = async () => {
    //삭제api
    deleteCorporateMutation({ corporateId })
  }
  return (
    <form>
      <DetailTable
        colgroup={
          <colgroup>
            <col width="30%" />
            <col width="auto" />
          </colgroup>
        }
      >
        <tr>
          <th>
            <InputLabel labelText="Corporate name" />
          </th>
          <td>
            {corpNameFieldState.error ? (
              <>
                <BaseInput {...corpNameField} onChange={corpNameField.onChange} placeholder="Please enter the corporate name to delete." error />
                <InputDec msg="Corporate name does not match." error />
              </>
            ) : (
              <BaseInput {...corpNameField} onChange={corpNameField.onChange} placeholder="Please enter the corporate name to delete." />
            )}
          </td>
        </tr>
      </DetailTable>
      <div className="align center mt_30">
        <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
          Cancel
        </ButtonMui>
        <ButtonMui
          size="xlarge"
          onClick={() => {
            handleClickDeleteCorporate()
          }}
          disabled={!isValid}
        >
          Delete
        </ButtonMui>
      </div>
    </form>
  )
}

export default DeleteCorporate
