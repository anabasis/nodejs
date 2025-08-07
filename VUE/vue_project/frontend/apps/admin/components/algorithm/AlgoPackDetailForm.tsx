import { ButtonMui, ArticleItem, PreTypo, SwitchToggle } from 'ui'
import { ModalType, useModal } from 'library'
import { PackDetailType, AlgoPartialCodeType } from '@type/algorithm/pack'
import { LibVerWidthIdListType } from '@type/algorithm/'
import { LibVerArr } from '@constant/AlgoPack'
import {} from '@type/algorithm/custom-code'
import { getAlgorithmLibVerDetail } from '@api/algorithm/library'
import { getAlgorithmCustomCodeDetailVer } from '@api/algorithm/custom-code'
const AlgoPackDetailForm = ({ packDetailData }: { packDetailData?: PackDetailType }) => {
  const { modalOpen } = useModal()

  const getNotePopup = async (algoInfo: AlgoPartialCodeType, type?: string) => {
    const { libId, libVerId, partialCodeId, partialCodeVerId } = algoInfo

    const noteInfo: LibVerWidthIdListType = type
      ? await getAlgorithmCustomCodeDetailVer({ PartialCodeId: partialCodeId, PartialCodeVerId: partialCodeVerId })
      : await getAlgorithmLibVerDetail({ libId, libVerId })

    const { note, libName, name, version } = noteInfo
    const releseNotePop: ModalType = {
      title: 'Relase Note',
      textTitle: `${libName || name}${version}`,
      maxWidth: 'm',
      linetitle: true,
      content: <PreTypo className="body2 max_h463 min_h360 ovf_a">{note}</PreTypo>,
    }
    modalOpen(releseNotePop)
  }

  return (
    <>
      <ArticleItem title="Basic Information" colsWidthArr={['15%', 'auto']}>
        <tr>
          <th className="">Status</th>
          <td>
            <div className="align start gap_10">
              <SwitchToggle disabled value={packDetailData?.status !== 'Developed'} id="toggle1" color="primary" text={packDetailData?.status} />
            </div>
          </td>
        </tr>

        <tr>
          <th className="va_top pt_28">Algorithm pack name</th>
          <td className="va_top pt_28">
            <p placeholder="Please enter the library name.">{packDetailData?.name}</p>
          </td>
        </tr>
        <tr>
          <th className="va_top pt_28">Description</th>
          <td className="va_top pt_28">
            <PreTypo>{packDetailData?.desc}</PreTypo>
          </td>
        </tr>
      </ArticleItem>

      <ArticleItem title="Library Version" colsWidthArr={['15%', '35%', '15%', '35%']}>
        {LibVerArr.map((lib, index) => (
          <tr key={index}>
            <th>{lib?.row.name}</th>
            <td>
              <div className="grid6 align">
                <p>{packDetailData?.algoType[lib.row.name.replace(/\s/g, '')]?.version || 'N/A'} </p>

                <ButtonMui
                  disabled={!packDetailData?.algoType[lib.row.name.replace(/\s/g, '')]?.version}
                  color="black"
                  type="contained"
                  onClick={() => getNotePopup(packDetailData?.algoType[lib.row.name.replace(/\s/g, '')])}
                >
                  Release Note
                </ButtonMui>
              </div>
            </td>
            <th>{lib?.row2.name}</th>
            <td>
              <div className="grid6 align">
                <p>{packDetailData?.algoType[lib.row2.name.replace(/\s/g, '')]?.version || 'N/A'}</p>

                <ButtonMui
                  disabled={!packDetailData?.algoType[lib.row2.name.replace(/\s/g, '')]?.version}
                  color="black"
                  type="contained"
                  onClick={() => getNotePopup(packDetailData?.algoType[lib.row2.name.replace(/\s/g, '')])}
                >
                  Release Note
                </ButtonMui>
              </div>
            </td>
          </tr>
        ))}
      </ArticleItem>

      {/* [e] Custom Code Information */}
      <ArticleItem title="Custom Code Information" colsWidthArr={['15%', '35%', '15%', '35%']}>
        <tr>
          <th>Custom code</th>
          <td>
            <p>{packDetailData?.partialCode?.name || 'N/A'}</p>
          </td>

          <th>Version </th>
          <td>
            <div className="grid6 align">
              <p>{packDetailData?.partialCode?.version || 'N/A'}</p>
              <ButtonMui
                disabled={!packDetailData?.partialCode?.version}
                color="black"
                type="contained"
                onClick={() => getNotePopup(packDetailData?.partialCode, 'custom')}
              >
                Release Note
              </ButtonMui>
            </div>
          </td>
        </tr>
      </ArticleItem>

      <ArticleItem title="Filter Information" colsWidthArr={['15%', 'auto']}>
        <tr>
          <th>Version array</th>
          <td>
            <p>{packDetailData?.filter}</p>
          </td>
        </tr>
      </ArticleItem>
      <ArticleItem title="Release Note" colsWidthArr={['15%', 'auto']}>
        <tr>
          <th className="va_top">Release note</th>
          <td className="va_top">
            <PreTypo>{packDetailData?.note}</PreTypo>
          </td>
        </tr>
      </ArticleItem>
    </>
  )
}

export default AlgoPackDetailForm
