import InnerTd from 'ui/molecules/InnerTd'
import { AvatarMui, ButtonMui } from 'ui/mui'
import { Checkbox } from 'ui/components/form/Check'
import { SearchIcoInput } from 'ui/components/form/SearchIcoInput'
import { BoardTable } from 'ui/components/table/BoardTable'
import { EllipsisTypo } from 'ui/components/typo/EllipsisTypo'
import { Chip } from 'ui/components'
import { useManageMemberModal } from '@hook/useManageMemberModal'
import styles from 'ui/styles/mui/_popup.module.scss'

const AddQnaMemeberModal = () => {
  const {
    qnaUserMemeberList,
    keyword,
    checkedManagerMember,
    cancel,
    save,
    getQnaPartiallyMember,
    checkedOnChange,
    onChangeEnter,
    onChangeSearch,
    removeChecked,
  } = useManageMemberModal()
  return (
    <>
      <div className="">
        <SearchIcoInput
          searchDisabled={keyword.trim() === ''}
          placeholder="Enter keyword"
          onSearchClick={getQnaPartiallyMember}
          onSearch={onChangeEnter}
          onChangeSearch={onChangeSearch}
        />
      </div>
      <div className="mt_20">
        <BoardTable className="max_h330" inner>
          <colgroup>
            <col width="12%" />
            <col width="40%" />
            <col width="50%" />
          </colgroup>
          <thead className="sticky">
            <tr>
              <th></th>
              <th>Name</th>
              <th>Organization</th>
            </tr>
          </thead>
          <tbody>
            {qnaUserMemeberList &&
              qnaUserMemeberList.map((item) => (
                <tr key={item.usrUid}>
                  <td>
                    <Checkbox
                      value={checkedManagerMember?.map((el) => el.usrUid).includes(item.usrUid)}
                      id={`checkbox_${item.usrUid}`}
                      name={item.usrNm}
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
                            src: item?.userAttachResponse?.preSignedUrl || '/images/no_icon.png',
                            alt: 'qnaManageMeber',
                          },
                        ]}
                      />
                      <EllipsisTypo className="pl_10">{item.usrNm}</EllipsisTypo>
                    </InnerTd>
                  </td>
                  <td>{item.orgnName ? item.orgnName : '-'}</td>
                </tr>
              ))}
          </tbody>
        </BoardTable>
      </div>

      <div className="align start top mt_20 gap_5">
        <div className="">
          <span className="title3 typo500">
            Selected<em className="ml_6 title2 typo800 tl in_block min_w20">{checkedManagerMember?.length}</em>
          </span>
        </div>
        <div className="align start wrap gap_10 flex1 min_h30">
          {checkedManagerMember?.map((check) => (
            <Chip key={check.usrUid} onClick={() => removeChecked(check.usrUid)}>
              {check.usrNm}
            </Chip>
          ))}
        </div>
      </div>

      <div className={`align center pt_30 ${styles.modal_bottom_sticky}`}>
        <ButtonMui type="outlined" size="xlarge" onClick={() => cancel()}>
          Cancel
        </ButtonMui>
        <ButtonMui disabled={checkedManagerMember?.length === 0} size="xlarge" onClick={() => save()}>
          OK
        </ButtonMui>
      </div>
    </>
  )
}

export default AddQnaMemeberModal
