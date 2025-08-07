import { Icons, DetailBox, DetailCon, DetailInfo, FileCard, ButtonMui } from 'ui'
import { isEmptyCheck, createMarkup, downloadFiles, getCdnFileUrl, changeTimeLocal, useUser } from 'library'
import { QnaDetailAnswerType } from '@type/qna'
import { useSetAtom } from 'jotai'
import { isReplyAtom } from '@store/client/qna'
import { useMemo } from 'react'

const QnaDetailAnswerContent = ({ answerData }: { answerData: QnaDetailAnswerType }) => {
  const { userInfo } = useUser()
  const setIsReply = useSetAtom(isReplyAtom)

  const CkContentComponent = useMemo(
    () => answerData && <div className="ck-content" dangerouslySetInnerHTML={createMarkup(answerData?.answerContent)} />,
    [answerData]
  )
  return (
    <>
      {isEmptyCheck(answerData) && (
        <div className="mt_30 plr_16">
          <h2 className="title1">
            <Icons.ReplyIcon width={24} height={25} fill="#2E3646" />
            {answerData.title}
          </h2>
          <DetailInfo>
            <div className="align">
              <div className="align">
                <div className="align start">
                  <dl className="item gap_10">
                    <dt className="capH typo800">Date</dt>
                    <dd className="caption typo700">{changeTimeLocal({ time: answerData?.createDate, type: 'yyyy-MM-dd' })}</dd>
                  </dl>
                  <dl className="item gap_10">
                    <dt className="capH typo800">Update</dt>
                    <dd className="caption typo700">{changeTimeLocal({ time: answerData?.modifyDate, type: 'yyyy-MM-dd' })}</dd>
                  </dl>
                  <dl className="item gap_10">
                    <dt className="capH typo800">Creator</dt>
                    <dd className="caption typo700">{answerData?.writer}</dd>
                  </dl>
                </div>

                {userInfo?.usrUid === answerData?.answerUserUid ? (
                  <div className="align end">
                    <ButtonMui
                      iconStyle={{ width: 14, height: 14, fill: 'var(--navy800)' }}
                      color="black"
                      type="text"
                      size="large"
                      icon="EditIcon"
                      onClick={() => setIsReply(true)}
                    >
                      <span className="navy800">Edit</span>
                    </ButtonMui>
                  </div>
                ) : null}
              </div>
            </div>
          </DetailInfo>

          <DetailCon>
            {answerData?.answerAttachmentResponse?.length > 0 && (
              <div className="detail_file">
                <div className="viewcardgroup">
                  <ul>
                    <li>Attachment</li>
                  </ul>
                  {answerData.answerAttachmentResponse?.map((file, index) => (
                    <FileCard file={file} key={index} icon={file.fileExtension}>
                      {file.displayFileName}
                    </FileCard>
                  ))}
                </div>
              </div>
            )}

            <DetailBox answerBg>{CkContentComponent}</DetailBox>
          </DetailCon>
        </div>
      )}
    </>
  )
}

export default QnaDetailAnswerContent
