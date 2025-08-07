'use client'
import { productSchema } from '@constant/masterDataOption'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMasterMutation } from '@store/server/useMasterQuery'
import { EditProductMasterData, MasterDataCommonCodes } from '@type/mater/masterDataType'
import { AlertType, changeTimeLocal, isEmptyAnyPropertyCheck, useAlert, useCode } from 'library'
import { debounce as _debounce } from 'lodash-es'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { useController, useForm } from 'react-hook-form'
import { BaseInput, DetailTable, InputDec, InputLabel } from 'ui/components'
import DatePicker from 'ui/datepicker/DatePicker'
import { ButtonMui, SelectMui } from 'ui/mui'

const commonCodes = {
  productCategory: 'PFM020', //Disease category
  productFamily: 'PFM063', //Product Family category
}

const EditProduct = ({ masterData }) => {
  const router = useRouter()
  const masterId = useSearchParams().get('masterId') //id(PK)
  const path = useSearchParams().get('path')
  const { modifyMaster, modifyMasterIsLoading } = useMasterMutation()

  const productData: EditProductMasterData = masterData

  const { alertOpen, alertClose } = useAlert()

  const { cCode } = useCode(commonCodes) as { cCode: MasterDataCommonCodes }
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

  //product-Product category, Product family
  const selectData = useMemo(() => {
    if (!cCode || isEmptyAnyPropertyCheck(cCode)) {
      return []
    }
    const { productCategory, productFamily } = cCode
    return { productCategory, productFamily }
  }, [cCode]) as MasterDataCommonCodes

  useEffect(() => {
    productData &&
      reset({
        prdNm: productData.prdNm || '',
        abb: productData.abb || '',
        abbId: productData.abbId || '',
        familyCd: productData.familyCd || '',
        taskCd: productData.taskCd || '',
        dissCatCd: productData.dissCatCd || '',
        sz: productData.sz.toString() || '',
        barcd: productData.barcd || '',
        catNo: productData.catNo || '',
        endDat: changeTimeLocal({ time: productData.endDat, type: 'yyyy-MM-dd 23:59:59' }) || '',
      })
  }, [productData])

  const handleEditProduct = _debounce(() => {
    handleSubmit(onSubmit)()
  }, 300)

  const onSubmit = async (data: EditProductMasterData) => {
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
                  <InputLabel labelText="Product name" required />
                </th>
                <td>
                  <BaseInput {...nameField} {...register} maxLength={100} />
                </td>
                <th>
                  <InputLabel labelText="CAT No." required />
                </th>
                <td>
                  <BaseInput {...catNoField} {...register} maxLength={30} />
                </td>
              </tr>
              <tr>
                <th>
                  <InputLabel labelText="Product abbreviation" required />
                </th>
                <td>
                  <BaseInput {...abbField} {...register} maxLength={60} />
                </td>
                <th>
                  <InputLabel labelText="Product abbreviation ID" required />
                </th>
                <td>
                  {abbIDFieldState.error ? (
                    <>
                      <BaseInput {...abbIDField} {...register} maxLength={10} error />
                      <InputDec msg="Please enter the product abbreviation ID." error />
                    </>
                  ) : (
                    <BaseInput {...abbIDField} {...register} maxLength={10} />
                  )}
                </td>
              </tr>
              <tr>
                <th>
                  <InputLabel labelText="Task code" required />
                </th>
                <td>
                  <BaseInput {...taskCodeField} {...register} maxLength={30} />
                </td>
                <th>
                  <InputLabel labelText="Size (rxn/Kit)" required />
                </th>

                <td>
                  {sizeFieldState.error ? (
                    <>
                      <BaseInput {...sizeField} {...register} error />
                      <InputDec msg="Please enter the size." error />
                    </>
                  ) : (
                    <BaseInput {...sizeField} {...register} />
                  )}
                </td>
              </tr>
              <tr>
                <th>
                  <InputLabel labelText="Barcode" required />
                </th>
                <td>
                  <BaseInput {...barcodeField} {...register} maxLength={80} />
                </td>
                <th>
                  <InputLabel labelText="Expiration date" required />
                </th>
                <td>
                  <DatePicker
                    defaultDate={productData.endDat || ''}
                    // onChangePickerDate={(event) => endDateField.onChange(changeTimeServer({ time: event, type: 'yyyy-MM-dd' }))}
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
                    placeholder="Please select product category."
                    size="full"
                    options={selectData?.productCategory}
                    {...diseaseCatCodeField}
                    {...register}
                    defaultValue={productData.dissCatCd || ''}
                  />
                </td>
                <th>
                  <InputLabel labelText="Product family" required />
                </th>
                <td>
                  <SelectMui size="full" options={selectData?.productFamily} {...familyCdField} {...register} defaultValue={productData.familyCd || ''} />
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
              handleEditProduct()
            }}
          >
            Save
          </ButtonMui>
        </div>
      </div>
    </>
  )
}

export default EditProduct
