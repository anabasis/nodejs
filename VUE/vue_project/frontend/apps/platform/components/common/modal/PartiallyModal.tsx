import InnerTd from 'ui/molecules/InnerTd'
import { AvatarMui, ButtonMui } from 'ui/mui'
import { Checkbox } from 'ui/components/form/Check'
import { SearchIcoInput } from 'ui/components/form/SearchIcoInput'
import { BoardTable } from 'ui/components/table/BoardTable'
import { EllipsisTypo } from 'ui/components/typo/EllipsisTypo'
import { getCdnFileUrl } from 'library'
import { Chip } from 'ui/components'
import { usePartially } from '@hook/usePartially'
import styles from 'ui/styles/mui/_popup.module.scss'
const PartiallyModal = () => {
  const { cancelPartially, onChangeEnter, onChangeSearch, checkedOnChange, removeChecked, keyword, tempChecked, prtnUserSearchList, savePartially } =
    usePartially()

  return (
    <>
      <div className="mb_20">
        <SearchIcoInput searchDisabled={keyword.trim() === ''} placeholder="Enter keyword" onSearch={onChangeEnter} onChangeSearch={onChangeSearch} />
      </div>
      <div className="bb">
        <BoardTable className="max_h330" inner>
          <colgroup>
            <col width="9%" />
            <col width="auto" />
            <col width="61%%" />
          </colgroup>
          <thead className="sticky">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Organization</th>
            </tr>
          </thead>
          <tbody>
            {prtnUserSearchList &&
              prtnUserSearchList.map((item) => (
                <tr key={item.userUid}>
                  <td>
                    <Checkbox
                      value={tempChecked.map((el) => el.userUid).includes(item.userUid)}
                      id={`checkbox_${item.userUid}`}
                      name={item.userName}
                      size="xs"
                      onChange={(event) => checkedOnChange(event, item)}
                    />
                  </td>
                  <td>
                    <InnerTd>
                      <AvatarMui
                        size="medium"
                        type="circular"
                        data={[
                          {
                            src: item?.iconFile?.preSignedUrl || '/images/no_icon.png',
                            alt: 'qnaManageMeber',
                          },
                        ]}
                      />
                      <EllipsisTypo className="pl_10">{item.userName}</EllipsisTypo>
                    </InnerTd>
                  </td>
                  <td className="pr_30">{item.organizationName}</td>
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
            <Chip key={check.userUid} onClick={() => removeChecked(check.userUid)}>
              {check.userName}
            </Chip>
          ))}
        </div>
      </div>

      <div className={`align center pt_30 ${styles.modal_bottom_sticky}`}>
        <ButtonMui type="outlined" size="xlarge" onClick={() => cancelPartially()}>
          Cancel
        </ButtonMui>
        <ButtonMui disabled={tempChecked.length === 0} size="xlarge" onClick={() => savePartially()}>
          OK
        </ButtonMui>
      </div>
    </>
  )
}

export default PartiallyModal
