import { changeTimeLocal, useParamsData } from 'library'
import { TermsAddParamsType, TermsCommonCodes } from '@type/terms'
import { BaseInput, DetailTable, SelectMui, InputGroup, InputDec } from 'ui'
import DatePicker from 'ui/datepicker/DatePicker'
import { useState } from 'react'
import { useTermsEditor } from '@hook/useTermsEditor'
const TermsUpdateTable = ({ selectData }: { selectData: TermsCommonCodes }) => {
  const [error, setError] = useState(true)
  const { params, setChangeParams } = useParamsData<TermsAddParamsType>()
  const { termsVersion } = useTermsEditor()

  const onChangeVersion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChangeParams(event.target.value?.trim(), 'version')
    setError(+event.target.value <= +termsVersion)
  }

  return (
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
          <span>No.</span>
        </th>
        <td>
          <div className="grid6">
            <InputGroup>
              <BaseInput disabled value={params?.termsNum || ''} />
            </InputGroup>
          </div>
        </td>
        <th>
          <span>Category</span>
        </th>
        <td>
          <div className="grid6">
            <SelectMui
              size="full"
              disabled
              placeholder="Select"
              value={params?.termsCategoryCode || ''}
              options={selectData?.termsCategoryCode}
              onChange={(event) => setChangeParams(event, 'termsCategoryCode')}
            />
          </div>
        </td>
      </tr>

      <tr>
        <th>
          <span>Country group</span>
        </th>
        <td>
          <div className="grid6">
            <SelectMui
              size="full"
              disabled
              placeholder="Select"
              value={params?.countryCode || ''}
              options={selectData?.countryCode}
              onChange={(event) => setChangeParams(event, 'countryCode')}
            />
          </div>
        </td>
        <th>
          <span>Release date</span>
        </th>
        <td>
          <div className="grid6">
            <DatePicker
              defaultDate={!!params?.releaseDate && changeTimeLocal({ time: params?.releaseDate, type: 'yyyy-MM-dd' })}
              onChangePickerDate={(data) => setChangeParams(data, 'releaseDate')}
              placeholderText="Select date"
            />
          </div>
        </td>
      </tr>
      <tr>
        <th className="va_top ">
          <p className="pt_10">Version</p>
        </th>
        <td>
          <div className="grid6">
            <InputGroup>
              <BaseInput
                maxLength={16}
                value={params?.version || ''}
                onChange={onChangeVersion}
                error={error}
                placeholder="Please enter version information."
              />
              <InputDec msg="Please enter a higher value than the existing version." error={error} />
            </InputGroup>
          </div>
        </td>
      </tr>
    </DetailTable>
  )
}

export default TermsUpdateTable
