import { changeTimeLocal, useParamsData } from 'library'
import { TermsAddParamsType, TermsCommonCodes } from '@type/terms'
import { BaseInput, DetailTable, SelectMui, InputGroup, InputDec } from 'ui'
import DatePicker from 'ui/datepicker/DatePicker'

const TermsAddTable = ({ selectData }: { selectData: TermsCommonCodes }) => {
  const { params, setChangeParams } = useParamsData<TermsAddParamsType>()

  const onChangeVersion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChangeParams(event.target.value?.trim(), 'version')
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
          <span>Category</span>
        </th>
        <td>
          <div className="grid6">
            <SelectMui
              size="full"
              placeholder="Select"
              value={params?.termsCategoryCode || ''}
              options={selectData?.termsCategoryCode}
              onChange={(event) => setChangeParams(event, 'termsCategoryCode')}
            />
          </div>
        </td>
        <th>
          <span>Country group</span>
        </th>
        <td>
          <div className="grid6">
            <SelectMui
              size="full"
              placeholder="Select"
              value={params?.countryCode || ''}
              options={selectData?.countryCode}
              onChange={(event) => setChangeParams(event, 'countryCode')}
            />
          </div>
        </td>
      </tr>
      <tr>
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
        <th>
          <span>Version</span>
        </th>
        <td>
          <div className="grid6">
            <InputGroup>
              <BaseInput maxLength={16} value={params?.version || ''} onChange={onChangeVersion} placeholder="Please enter version information." />
            </InputGroup>
          </div>
        </td>
      </tr>
    </DetailTable>
  )
}

export default TermsAddTable
