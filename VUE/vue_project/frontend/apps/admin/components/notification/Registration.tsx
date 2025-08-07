import { notificationSchema, placeholderString } from '@constant/notificationOption'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNotificationMutation } from '@store/server/useNotificationQuery'
import { AddNotification, NotificationCommonCodes } from '@type/notification/notificationType'
import { isEmptyAnyPropertyCheck, useCode } from 'library'
import { useModal } from 'library/hook/useModal'
import { useToastPopup } from 'library/hook/useToastPopup'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import { useController, useForm } from 'react-hook-form'
import { BaseInput, ButtonMui, DetailTable, InputDec, InputGroup, InputLabel, SelectMui, TextArea, TooltipHover } from 'ui'

const commonCodes = {
  type: 'PFM046', //Notification Type Code
}

const Registration = () => {
  const router = useRouter()
  const { modalClose } = useModal()
  const { toastOpen, getToastState } = useToastPopup()
  const { cCode } = useCode(commonCodes) as { cCode: NotificationCommonCodes }
  // const [isNotiLoading, setNotiLoading] = useAtom(isLoading)

  const { addNotificationMutate, addNotificationIsLoading } = useNotificationMutation()
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(notificationSchema),
  })
  const { field: notiTypeField, fieldState: notiTypeFieldState } = useController({ name: 'notificationTypeCode', control })
  const { field: codeField, fieldState: codeFieldState } = useController({ name: 'notificationCode', control })
  const { field: titleField, fieldState: titleFieldState } = useController({ name: 'title', control })
  const { field: stringField, fieldState: stringFieldState } = useController({ name: 'text', control })
  const { field: landingUrlField, fieldState: landingUrlFieldState } = useController({ name: 'landingUrl', control })

  //type
  const selectData = useMemo(() => {
    if (!cCode || isEmptyAnyPropertyCheck(cCode)) {
      return []
    }
    const { type } = cCode
    return { type }
  }, [cCode]) as NotificationCommonCodes

  const handleAddNotification = () => {
    handleSubmit(onSubmit)()
  }
  const onSubmit = async (data: AddNotification) => {
    // setNotiLoading(true)
    addNotificationMutate({ data })
    // setNotiLoading(false)
  }

  return (
    <>
      <div>
        <DetailTable
          colgroup={
            <colgroup>
              <col style={{ width: '180px' }} />
              <col style={{ width: 'auto' }} />
            </colgroup>
          }
        >
          <tr>
            <th>
              <InputLabel labelText="Notification type " />
            </th>
            <td className="pr_0">
              <SelectMui
                size="full"
                options={selectData?.type}
                onChange={(event) => notiTypeField.onChange(event.target.value)}
                placeholder="Please select a notification type."
              />
            </td>
          </tr>
          <tr>
            <th>
              <InputLabel labelText="Code" />
            </th>
            <td className="pr_0">
              <InputGroup>
                <BaseInput onChange={(event) => codeField.onChange(event.target.value)} placeholder="Please enter the code." maxLength={26} />
              </InputGroup>
            </td>
          </tr>
          <tr>
            <th>
              <InputLabel labelText="Title" />
            </th>
            <td className="pr_0">
              {titleFieldState.error ? (
                <>
                  <BaseInput
                    onChange={(event) => titleField.onChange(event.target.value)}
                    placeholder="Please enter a title. (Title of notification)"
                    error
                    maxLength={100}
                  />
                  <InputDec msg="Please enter a title. (Title of notification)." error />
                </>
              ) : (
                <BaseInput
                  onChange={(event) => titleField.onChange(event.target.value)}
                  placeholder="Please enter a title. (Title of notification)"
                  maxLength={100}
                />
              )}
            </td>
          </tr>
          <tr>
            <th className="vt">
              String
              <TooltipHover placements="top-start">
                <p className="caption white">
                  English Only <br />
                  When registering for the first notification information must be <br />
                  entered in English.
                </p>
              </TooltipHover>
            </th>
            <td className="pr_0">
              {stringFieldState.error ? (
                <>
                  <TextArea placeholder={placeholderString} onChange={(event) => stringField.onChange(event.target.value)} error maxLength={500} />
                  <InputDec msg={placeholderString} error />
                </>
              ) : (
                <TextArea placeholder={placeholderString} onChange={(event) => stringField.onChange(event.target.value)} maxLength={500} />
              )}
            </td>
          </tr>
          <tr>
            <th>
              <InputLabel labelText="Path parameter" />
            </th>
            <td className="pr_0">
              <InputGroup>
                <BaseInput onChange={(event) => landingUrlField.onChange(event.target.value)} placeholder="Please enter parameters." maxLength={480} />
              </InputGroup>
            </td>
          </tr>
        </DetailTable>
      </div>

      {/* 하단 버튼 예제 */}
      <div className="align center mt_30">
        <ButtonMui type="outlined" size="xlarge" onClick={() => modalClose()}>
          Cancel
        </ButtonMui>
        <ButtonMui disabled={!isValid} size="xlarge" onClick={() => handleAddNotification()} isLoading={addNotificationIsLoading}>
          Add
        </ButtonMui>
      </div>
    </>
  )
}

export default Registration
