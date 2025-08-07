import { productSchema } from '@constant/masterDataOption'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMasterMutation } from '@store/server/useMasterQuery'
import { MasterDataCommonCodes, NewProductMasterData } from '@type/mater/masterDataType'
import { AlertType, isEmptyAnyPropertyCheck, useAlert, useCode } from 'library'
import { debounce as _debounce } from 'lodash-es'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import { BaseInput, DetailTable, InputDec, InputLabel } from 'ui/components'
import DatePicker from 'ui/datepicker/DatePicker'
import { ButtonMui, SelectMui } from 'ui/mui'

const commonCodes = {
  productCategory: 'PFM020', //Disease category
  productFamily: 'PFM063', //Product Family category
}

const AddProduct = () => {
  const router = useRouter()
  const path = useSearchParams().get('path')

  const { alertOpen, alertClose } = useAlert()
  const { addMaster, addMasterIsLoading } = useMasterMutation()

  const { cCode } = useCode(commonCodes) as { cCode: MasterDataCommonCodes }

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(productSchema),
  })

  const { field: nameField, fieldState: nameFieldState } = useController({ name: 'prdNm', control })
  const { field: taskCodeField, fieldState: taskCodeFieldState } = useController({ name: 'taskCd', control })
  const { field: diseaseCatCodeField, fieldState: diseaseCatCodeFieldState } = useController({ name: 'dissCatCd', control }) //product category
  const { field: abbField, fieldState: abbFieldState } = useController({ name: 'abb', control })
  const { field: abbIDField, fieldState: abbIDFieldState } = useController({ name: 'abbId', control })
  const { field: familyCdField, fieldState: familyCdFieldState } = useController({ name: 'familyCd', control })
  const { field: sizeField, fieldState: sizeFieldState } = useController({ name: 'sz', control })
  const { field: barcodeField, fieldState: barcodeFieldState } = useController({ name: 'barcd', control })
  const { field: catNoField, fieldState: catNoFieldState } = useController({ name: 'catNo', control })
  const { field: endDateField, fieldState: endDateFieldState } = useController({ name: 'endDat', control })
  //버튼 로딩중?
  const [loading, isLoading] = useState<boolean>(false)

  //product-Product category, Product family
  const selectData = useMemo(() => {
    if (!cCode || isEmptyAnyPropertyCheck(cCode)) {
      return []
    }
    const { productCategory, productFamily } = cCode
    return { productCategory, productFamily }
  }, [cCode]) as MasterDataCommonCodes

  const handleAddProduct = _debounce(() => {
    handleSubmit(onSubmit)()
  }, 300)

  const onSubmit = async (data: NewProductMasterData) => {
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
          <ButtonMui size="xlarge" onClick={() => router.push(`/master/product`)}>
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
      <div className="align start">
        <p className="title1 mr_10">Master Data Information</p>
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
            <InputLabel labelText="Product name" required />
          </th>
          <td>
            <BaseInput placeholder="Please enter the product name." onChange={(event) => nameField.onChange(event)} maxLength={100} />
          </td>
          <th>
            <InputLabel labelText="CAT No." required />
          </th>
          <td>
            <BaseInput placeholder="Please enter CAT No." onChange={(event) => catNoField.onChange(event)} maxLength={30} />
          </td>
        </tr>
        <tr>
          <th>
            <InputLabel labelText="Product abbreviation" required />
          </th>
          <td>
            <BaseInput placeholder="Please enter the product abbreviation." onChange={(event) => abbField.onChange(event)} maxLength={60} />
          </td>
          <th>
            <InputLabel labelText="Product abbreviation ID" required />
          </th>
          <td>
            {abbIDFieldState.error ? (
              <>
                <BaseInput placeholder="Please enter the product abbreviation ID." onChange={(event) => abbIDField.onChange(event)} maxLength={10} error />
                <InputDec msg="Please enter the product abbreviation ID." error />
              </>
            ) : (
              <BaseInput placeholder="Please enter the product abbreviation ID." onChange={(event) => abbIDField.onChange(event)} maxLength={10} />
            )}
          </td>
        </tr>
        <tr>
          <th>
            <InputLabel labelText="Task code" required />
          </th>
          <td>
            <BaseInput placeholder="Please enter task code." onChange={(event) => taskCodeField.onChange(event)} maxLength={30} />
          </td>
          <th>
            <InputLabel labelText="Size (rxn/kit)" required />
          </th>
          <td>
            {sizeFieldState.error ? (
              <>
                <BaseInput placeholder="Please enter the size." onChange={(event) => sizeField.onChange(event)} error />
                <InputDec msg="Please enter the size." error />
              </>
            ) : (
              <BaseInput placeholder="Please enter the size." onChange={(event) => sizeField.onChange(event)} />
            )}
          </td>
        </tr>
        <tr>
          <th>
            <InputLabel labelText="Barcode" required />
          </th>
          <td>
            <BaseInput placeholder="Please enter barcode." onChange={(event) => barcodeField.onChange(event)} maxLength={80} />
          </td>
          <th>
            <InputLabel labelText="Expiration date" required />
          </th>
          <td>
            {/* 현재 range 아님 */}
            <DatePicker
              // onChangePickerDate={(event) => endDateField.onChange(changeTimeServer({ time: event, type: 'yyyy-MM-dd 23:59:59' }))}
              onChangePickerDate={(event) => endDateField.onChange(event)}
              placeholderText="Select date"
            />
          </td>
        </tr>
        <tr>
          <th>
            <InputLabel labelText="Product category" />
          </th>
          <td>
            <SelectMui
              size="full"
              options={selectData?.productCategory}
              placeholder="Please select product category."
              onChange={(event) => diseaseCatCodeField.onChange(event)}
            />
          </td>
          <th>
            <InputLabel labelText="Product family" required />
          </th>
          <td>
            <SelectMui
              size="full"
              options={selectData?.productFamily}
              placeholder="Please select product family."
              onChange={(event) => familyCdField.onChange(event)}
            />
          </td>
        </tr>
      </DetailTable>
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
              handleAddProduct()
            }}
          >
            Add
          </ButtonMui>
        </div>
      </div>
    </>
  )
}
export default AddProduct
