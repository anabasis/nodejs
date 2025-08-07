import { ButtonMui, BoardTable, NoData, Pagenation, Badge, InnerTd, AvatarMui, EllipsisTypo } from 'ui'
import { useQnaManageUserListData, useQnaMuate } from '@store/server/useQnaQuery'
import { AlertType, ModalType, changeTimeLocal, qnaManageUserListHeader, useAlert, useModal, usePageNation, useToastPopup } from 'library'
import AddQnaMemeberModal from '@components/helpdesk/qna/management/AddQnaMemeberModal'
import { useSearchParams } from 'next/navigation'

const pageSize = 5
const EditColSpanWidth = ['10%', '20%', '20%', '15%', '15%', '5%']

const QnaManageMemberTable = () => {
  const searchParams = useSearchParams()
  const { alertOpen, alertClose } = useAlert()
  const category = searchParams.get('category')
  const moduleVal = searchParams.get('module')
  const { currentPage, onPageChange } = usePageNation()
  const { modalOpen, modalDataState } = useModal()
  const { qnaMangeUserList, isSuccess } = useQnaManageUserListData({ category, module: moduleVal, currentPage, pageSize })
  const { toastOpen, getToastState } = useToastPopup()
  const { deleteQnayManagerMutate } = useQnaMuate()

  const addMemeberModal = () => {
    if (modalDataState.length > 0) return
    const modalState: ModalType = {
      title: 'Add QnA manager',
      textTitle: 'Please add QnA manager in charger.',
      maxWidth: 'm',
      content: <AddQnaMemeberModal />,
    }
    modalOpen(modalState)
  }

  const deleteQnayManager = (mngrNumInfo) => {
    deleteQnayManagerMutate(mngrNumInfo, {
      onSuccess: () => {
        toastOpen(getToastState({ content: 'Successfully Saved.', icon: 'success' }))
      },
    })
    alertClose()
  }

  const deleteProcess = (mngrNumInfo) => {
    const alertState: AlertType = {
      InfoType: 'delete',
      content: (
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            Cancel
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={() => deleteQnayManager(mngrNumInfo)}>
            Delete
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
  }

  return (
    <article>
      <div className="cont_title_box">
        <div className="align">
          <div className="lft">
            <p className="title1">Person in charge</p>
            {qnaMangeUserList?.content?.length > 0 && (
              <Badge className="ml_10" uiType="solid" color="blue" style="count" size="md">
                {qnaMangeUserList?.totalElements}
              </Badge>
            )}
          </div>
          <div className="rgt">
            <ButtonMui color="black" onClick={() => addMemeberModal()}>
              Add Member
            </ButtonMui>
          </div>
        </div>
      </div>
      <BoardTable>
        <colgroup>
          {EditColSpanWidth.map((width, index) => (
            <col key={index} style={{ width }} />
          ))}
        </colgroup>
        <thead>
          <tr>
            {qnaManageUserListHeader?.map((theader, i) => (
              <th key={i}>{theader}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {isSuccess && qnaMangeUserList?.content?.length === 0 ? (
            <tr className="nodata">
              <td colSpan={6}>
                <NoData text="There are no members." />
              </td>
            </tr>
          ) : (
            qnaMangeUserList?.content.map((qna, index) => (
              <tr key={qna.moduleManagerNum || qna?.usrUid}>
                <td>{pageSize * currentPage + index + 1}</td>
                <td>
                  <InnerTd>
                    <AvatarMui
                      size="medium"
                      type="circular"
                      data={[
                        {
                          src: qna?.userAttachResponse?.preSignedUrl || '/images/no_icon.png',
                          alt: 'qnaManageMeber',
                        },
                      ]}
                    />
                    <EllipsisTypo className="pl_10">{qna?.usrNm}</EllipsisTypo>
                  </InnerTd>
                </td>
                <td>{qna.orgnName ? qna.orgnName : '-'}</td>
                <td>{qna.jobTitle ? qna.jobTitle : '-'}</td>
                <td>{changeTimeLocal({ time: qna.modifyDate, type: 'yyyy-MM-dd' })}</td>

                <td>
                  <ButtonMui
                    icon="DeleteIcon"
                    size="xsmall"
                    type="text"
                    iconStyle={{ fill: 'var(--navy800)' }}
                    onClick={() =>
                      deleteProcess([
                        {
                          mngrNum: qna?.moduleManagerNum,
                        },
                      ])
                    }
                  />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </BoardTable>
      {qnaMangeUserList?.content?.length > 0 && (
        <Pagenation currentPage={currentPage} onPageChange={onPageChange} pageSize={pageSize} totalCount={qnaMangeUserList?.totalElements} />
      )}
    </article>
  )
}

export default QnaManageMemberTable
