import { BoardTable, SearchIcoInput, Checkbox, ButtonMui } from 'ui'
import { Chip } from 'ui/components'
import { useCorporatePartially } from '@hook/useCorporatePartially'
import styles from 'ui/styles/mui/_popup.module.scss'

const CorporatePartiallyModal = () => {
  const {
    tempChecked,
    keyWord,
    prtnUserSearchList,
    cancelPatially,
    savePatially,
    checkedOnChange,
    removeChecked,
    onChangeEnter,
    onChangeSearch,
    onIconSearch,
  } = useCorporatePartially()

  return (
    <>
      <div className="mb_20">
        <SearchIcoInput
          searchDisabled={keyWord.trim() === ''}
          placeholder="Enter keyword"
          onSearch={onChangeEnter}
          onSearchClick={onIconSearch}
          onChangeSearch={onChangeSearch}
        />
      </div>
      <div className="bb">
        <BoardTable className="max_h330" inner>
          <colgroup>
            <col width="9%" />
            <col width="auto" />
            <col width="61%" />
          </colgroup>
          <thead className="sticky">
            <tr>
              <th></th>
              <th>Corporate Name</th>
              <th>Country</th>
            </tr>
          </thead>
          <tbody>
            {prtnUserSearchList &&
              prtnUserSearchList.map((item) => (
                <tr key={item.corporationNum}>
                  <td>
                    <Checkbox
                      value={tempChecked.map((user) => user.corporationNum).includes(item.corporationNum)}
                      id={`checkbox_${item.corporationNum}`}
                      name={String(item.corporationNum)}
                      size="xs"
                      onChange={(event) => checkedOnChange(event, item)}
                    />
                  </td>

                  <td>{item.corporationName}</td>
                  <td className="pr_30">{item.nation}</td>
                </tr>
              ))}
          </tbody>
        </BoardTable>
      </div>
      <div className="align start top mt_20 gap_5">
        <div className="">
          <span className="title3 typo500">
            Selected<em className="ml_6 title2 typo800 tl in_block min_w20">{tempChecked.length}</em>
          </span>
        </div>
        <div className="align start wrap gap_10 flex1 min_h30">
          {tempChecked.map((check) => (
            <Chip key={check.corporationNum} onClick={() => removeChecked(check.corporationNum)}>
              {check?.corporationName}
            </Chip>
          ))}
        </div>
      </div>
      <div className={`align center pt_30 ${styles.modal_bottom_sticky}`}>
        <ButtonMui type="outlined" size="xlarge" onClick={() => cancelPatially()}>
          Cancel
        </ButtonMui>
        <ButtonMui disabled={tempChecked.length === 0} size="xlarge" onClick={savePatially}>
          OK
        </ButtonMui>
      </div>
    </>
  )
}

export default CorporatePartiallyModal
