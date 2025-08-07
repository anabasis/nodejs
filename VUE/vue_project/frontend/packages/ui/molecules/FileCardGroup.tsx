// // 작업자 : 김병기

import { FileCard } from '@ui/index'

export const FileCardGroup = ({ ...others }) => {
  const {} = others
  return (
    <>
      <div className="viewcardgroup">
        <ul>
          <li>Attachment</li>
          <li>
            <button className="underline">
              <span>Download all</span>
            </button>
          </li>
        </ul>
        <div className="cardlist">
          <div>
            <FileCard filesize="1.52mb">file name nam.excel</FileCard>
          </div>
          <div>
            <FileCard icon="excel" filesize="1.52mb">
              file name nam.excel
            </FileCard>
          </div>
          <div>
            <FileCard icon="pdf" filesize="1.52mb">
              file name nam.pdf
            </FileCard>
          </div>
          <div>
            <FileCard icon="excel" filesize="1.52mb" view>
              file name nam.excel
            </FileCard>
          </div>
          <div>
            <FileCard icon="pdf" filesize="1.52mb" view>
              file name nam.pdf
            </FileCard>
          </div>
        </div>
      </div>
    </>
  )
}

export default FileCardGroup
