// 작업자 : 김병기
// MultiFileUpload 로 통일 후 삭제 예정
import { EditUploadCard, ButtonMui } from '@ui/index'
import { useDragFileUpload } from 'library/hook/useDragFileUpload'

export const UploadFileTable = () => {
  const { dropRef, fileInputRef, getfileSize, removeUploadCard, changeFileInput, uploadFiles } = useDragFileUpload({ count: 5 })

  return (
    <>
      <div className="editorcardgroup align">
        <ul>
          <li>
            <div className="editcardlist">
              {uploadFiles?.map((file, index) => (
                <div key={index}>
                  {/* <EditUploadCard onClick={() => removeUploadCard(file)} icon={file.name.split('.')[1]}>
                    {file.name}
                  </EditUploadCard> */}
                </div>
              ))}
              <div ref={dropRef} className="editcard_drag_box">
                Drag file here to upload
              </div>
            </div>
          </li>
        </ul>
        <div className="editcard_upload_box">
          <div>
            <ul>
              <li>용량 {getfileSize() || 0}/500MB</li>
              <li>최대 5개</li>
            </ul>
          </div>
          <div>
            <ButtonMui
              color="black"
              icon="FileUploadIcon"
              onClick={() => {
                fileInputRef.current?.click()
              }}
              size="medium"
              type="contained"
            >
              Upload
            </ButtonMui>
            <input multiple type="file" ref={fileInputRef} onChange={changeFileInput} style={{ display: 'none' }} />
          </div>
        </div>
      </div>
    </>
  )
}
