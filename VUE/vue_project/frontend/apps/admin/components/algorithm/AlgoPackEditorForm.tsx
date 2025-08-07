import { ButtonMui, ArticleItem, SelectMui, BaseInput, TextArea, PreTypo, SwitchToggle } from 'ui'
import { AlertType, ModalType, useAlert, useModal, useParamsData } from 'library'
import { useAlgoPackEditor } from '@hook/useAlgoPackEditor'
import { AlgoPackAddParamsType, PackDetailType } from '@type/algorithm/pack'
import { LibVerWidthIdListType } from '@type/algorithm/'
import { CustomArr, LibVerArr } from '@constant/AlgoPack'
import { useRouter } from 'next/navigation'
import { isEmptyAnyPropertyCheck } from 'library'

const AlgoPackDetailContent = ({ packDetailData }: { packDetailData?: PackDetailType }) => {
  const { params, setChangeParams } = useParamsData<AlgoPackAddParamsType>()
  const router = useRouter()
  const { alertOpen, alertClose } = useAlert()
  const { modalOpen } = useModal()
  const {
    algoPackName,
    isEdit,
    selectData,
    releaseNote,
    isSaveLoading,
    isEditorLoading,
    selectedLibNote,
    getCustomVersion,
    selectedCustomNote,
    libVerValid,
    save,
  } = useAlgoPackEditor(params)

  const getNotePopup = (noteInfo: LibVerWidthIdListType) => {
    const { note, version } = noteInfo
    const releseNotePop: ModalType = {
      title: 'Relase Note',
      textTitle: `${noteInfo?.libName || noteInfo?.name}${version}`,
      maxWidth: 'm',
      linetitle: true,
      content: <PreTypo className="body2 max_h463 min_h360 ovf_a">{note}</PreTypo>,
    }
    modalOpen(releseNotePop)
  }

  const cancel = () => {
    const alertState: AlertType = {
      InfoType: 'cancel',
      content: (
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            Cancel
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={() => router.replace('/algorithm/algorithm-pack')}>
            OK
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
  }

  return (
    <>
      {!isEditorLoading && (
        <>
          <ArticleItem title="Basic Information" colsWidthArr={['15%', 'auto']}>
            {isEdit && (
              <tr>
                <th>Status</th>
                <td>
                  <div className="align start gap_10">
                    <SwitchToggle
                      value={params?.status === 'Released'}
                      id="toggle1"
                      color="primary"
                      disabled={packDetailData?.status === 'Released'}
                      onChange={(event) => setChangeParams(event.target.checked ? 'Released' : 'Developed', 'status')}
                      text={params?.status}
                    />
                    {/* <span className={`body1 ${params?.status === 'Released' ? 'blue400' : 'typo900'}`}>{params?.status}</span> */}
                  </div>
                </td>
              </tr>
            )}
            <tr>
              <th>Algorithm pack name</th>
              <td>
                <BaseInput placeholder="Please enter the library name." disabled value={packDetailData?.name || algoPackName || ''} />
              </td>
            </tr>
            <tr>
              <th className="va_top pt_20">Description</th>
              <td className="va_top pt_20">
                <TextArea
                  maxLength={500}
                  height={100}
                  value={params.desc || ''}
                  placeholder="Please enter description."
                  onChange={(event) => setChangeParams(event, 'desc')}
                />
              </td>
            </tr>
          </ArticleItem>

          <ArticleItem title="Library Version" colsWidthArr={['15%', '35%', '15%', '35%']}>
            {LibVerArr.map((lib, index) => (
              <tr key={index}>
                <th>{lib?.row.name}</th>
                <td>
                  <div className="grid7 align start gap_10">
                    <div className="w78">
                      <SelectMui
                        disabled={isEdit}
                        value={params[LibVerArr[index].row.value]?.libVerId || params[LibVerArr[index].row.value] || ''}
                        placeholder={
                          isEdit
                            ? params[LibVerArr[index].row.value]
                              ? `Please select ${LibVerArr[index].row.name}.`
                              : 'N/A'
                            : `Please select ${LibVerArr[index].row.name}.`
                        }
                        options={selectData?.[lib.row.value]?.libVerWithIdList}
                        onChange={(event) => {
                          setChangeParams(event.target.value, LibVerArr[index].row.value)
                          selectedLibNote(+event.target.value, lib.row.value)
                        }}
                        size="full"
                      />
                    </div>
                    <div className="w32">
                      <ButtonMui
                        disabled={!releaseNote?.[lib.row.value] || isEdit}
                        color="black"
                        type="contained"
                        onClick={() => getNotePopup(releaseNote?.[lib.row.value])}
                      >
                        Release Note
                      </ButtonMui>
                    </div>
                  </div>
                </td>
                <th>{lib?.row2.name}</th>
                <td>
                  <div className="grid7 align start gap_10">
                    <div className="w78">
                      <SelectMui
                        disabled={isEdit}
                        value={params[LibVerArr[index].row2.value]?.libVerId || params[LibVerArr[index].row2.value] || ''}
                        placeholder={
                          isEdit
                            ? params[LibVerArr[index].row2.value]
                              ? `Please select ${LibVerArr[index].row2.name}.`
                              : 'N/A'
                            : `Please select ${LibVerArr[index].row2.name}.`
                        }
                        options={selectData?.[lib.row2.value]?.libVerWithIdList}
                        onChange={(event) => {
                          setChangeParams(event.target.value, LibVerArr[index].row2.value)
                          selectedLibNote(+event.target.value, lib.row2.value)
                        }}
                        size="full"
                      />
                    </div>
                    <div className="w32">
                      <ButtonMui
                        disabled={!releaseNote?.[lib.row2.value] || isEdit}
                        color="black"
                        type="contained"
                        onClick={() => getNotePopup(releaseNote?.[lib.row2.value])}
                      >
                        Release Note
                      </ButtonMui>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </ArticleItem>

          {/* [e] Custom Code Information */}
          <ArticleItem title="Custom Code Information" colsWidthArr={['15%', '35%', '15%', '35%']}>
            {CustomArr.map((custom, index) => (
              <tr key={index}>
                <th>{custom.row.name}</th>
                <td>
                  <div className="grid6_6 align start">
                    <SelectMui
                      disabled={isEdit}
                      value={params?.partialCodeVerId?.toString() || ''}
                      placeholder={
                        isEdit
                          ? params[CustomArr[index].row.value]
                            ? `Please select ${CustomArr[index].row.name}.`
                            : 'N/A'
                          : `Please select ${CustomArr[index].row.name}.`
                      }
                      options={selectData?.[custom.row.value]}
                      onChange={(event) => {
                        getCustomVersion(+event.target.value, custom.row.value)
                        setChangeParams(event.target.value, 'partialCodeVerId')
                      }}
                      size="full"
                    />
                  </div>
                </td>
                <th>{custom.row2.name}</th>
                <td>
                  <div className="grid7 align start gap_10">
                    <div className="w78">
                      <SelectMui
                        value={params?.version?.toString() || ''}
                        disabled={!selectData?.[custom.row2.value] || isEdit}
                        placeholder={
                          isEdit
                            ? params[CustomArr[index].row2.value]
                              ? `Please select ${CustomArr[index].row2.name}.`
                              : 'N/A'
                            : `Please select ${CustomArr[index].row2.name}.`
                        }
                        options={selectData?.[custom.row2.value]}
                        onChange={(event) => {
                          setChangeParams(event.target.value, CustomArr[index].row2.value)
                          selectedCustomNote(+event.target.value, custom.row2.value)
                        }}
                        size="full"
                      />
                    </div>

                    <div className="w32">
                      <ButtonMui
                        disabled={!releaseNote?.[custom.row2.value] || isEdit}
                        color="black"
                        type="contained"
                        onClick={() => getNotePopup(releaseNote?.[custom.row2.value])}
                      >
                        Release Note
                      </ButtonMui>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </ArticleItem>

          <ArticleItem title="Filter Information" colsWidthArr={['15%', 'auto']}>
            <tr>
              <th>Version array</th>
              <td>
                <BaseInput
                  maxLength={8}
                  value={packDetailData?.filter}
                  disabled={isEdit}
                  placeholder="Please enter Version array."
                  onChange={(event) => {
                    const value = event.target.value
                    event.target.value = value.replace(/[^0-9]/g, '')
                    setChangeParams(event.target.value, 'filter')
                  }}
                />
              </td>
            </tr>
          </ArticleItem>
          <ArticleItem title="Release Note" colsWidthArr={['15%', 'auto']}>
            <tr>
              <th className="va_top">Release note</th>
              <td>
                <TextArea
                  maxLength={500}
                  disabled={isEdit}
                  value={params?.note || ''}
                  height={100}
                  placeholder="Please enter release note."
                  onChange={(event) => setChangeParams(event, 'note')}
                />
              </td>
            </tr>
          </ArticleItem>

          <div className="cont_bottom_box">
            <div className="align end">
              <ButtonMui type="outlined" size="xlarge" onClick={cancel}>
                Cancel
              </ButtonMui>

              <ButtonMui
                size="xlarge"
                isLoading={isSaveLoading}
                disabled={
                  isEdit
                    ? packDetailData.desc === params?.desc && packDetailData.status === params.status
                    : isEmptyAnyPropertyCheck(params) || !libVerValid() || params.filter.toString().length !== 8
                }
                onClick={save}
              >
                {isEdit ? 'Save' : 'Add'}
              </ButtonMui>
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default AlgoPackDetailContent
