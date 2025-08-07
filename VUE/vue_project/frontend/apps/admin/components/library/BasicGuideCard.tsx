import styles from 'ui/styles/components/card/_card.module.scss'
import { Icons, BaseInput, IconButtonMui, EllipsisTypo, Badge, TextArea, ButtonMui } from 'ui'
import { useLibCard } from '@hook/useLibCard'
import { IconType, LibraryManualContentType } from '@type/library'
import BasicCardModalContent from '@components/library/BasicCardModalContent'
import { useMosueHoverCopy, useModal, ModalType, useAlert, AlertType } from 'library'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface CardProps {
  manual?: LibraryManualContentType
  Drag?: boolean
  index?: number
}

const getIconModalProps = () => {
  return {
    width: 32,
    height: 32,
    fill: '#9D9FFE',
    icofill: '#C6C5FE',
  }
}
const getIconGroupComponent = (selectedIcon: string) => {
  const iconObj = {
    NoIcon: <Icons.NoImg {...getIconModalProps()} />,
    Project: <Icons.LibProjectIcon {...getIconModalProps()} />,
    CommonCode: <Icons.LibCommonCodeIcon {...getIconModalProps()} />,
    Tools: <Icons.LibToolsIcon {...getIconModalProps()} />,
    License: <Icons.LibLicenseIcon {...getIconModalProps()} />,
    AdminUser: <Icons.LibAdminUserIcon {...getIconModalProps()} />,
    Manual: <Icons.LibManualIcon {...getIconModalProps()} />,
    Algorithm: <Icons.LibAlgorithmIcon {...getIconModalProps()} />,
    Qna: <Icons.LibQnaIcon {...getIconModalProps()} />,
    Terms: <Icons.LibTermsIcon {...getIconModalProps()} />,
  }
  return iconObj[selectedIcon ? selectedIcon : 'NoIcon']
}

const getIconProps = (iconType: IconType) => {
  return {
    width: iconType === 'complete' ? 15 : 24,
    height: iconType === 'complete' ? 15 : 24,
    fill: '#44547e',
  }
}

export const BasicGuideCard = ({ manual, Drag = false, index }: CardProps) => {
  const { handleMouseEnter, handleMouseLeave, isHovering } = useMosueHoverCopy()
  const { alertOpen, alertClose } = useAlert()
  const { isEdit, dragClick, selectedIcon, cardParams, deleteCard, onChangeCardParam, editClick, moveListPage, saveClick } = useLibCard(manual)
  const { modalOpen } = useModal()

  const manualsIdMatch = Drag ? selectedIcon?.map((lib) => lib?.librCatNum).includes(manual?.librCatNum) : manual?.librCatNum === selectedIcon[0]?.librCatNum
  const selectedIconName = Drag
    ? selectedIcon?.filter((lib) => lib?.librCatNum === manual?.librCatNum)[0]?.name
    : selectedIcon?.filter((lib) => !lib?.librCatNum)[0]?.name

  const modalState: ModalType = {
    title: 'Change icon',
    textTitle: 'Please select group icon.',
    maxWidth: 'xs',
    linetitle: true,
    content: <BasicCardModalContent manual={manual} />,
  }

  const alertState: AlertType = {
    InfoType: 'delete',
    content: (
      <div className="align center mt_30">
        <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
          Cancel
        </ButtonMui>
        <ButtonMui size="xlarge" onClick={deleteCard}>
          Delete
        </ButtonMui>
      </div>
    ),
  }

  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: manual?.librCatNum })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      id={`${index}`}
      className={[styles['card'], styles['basic'], styles[isEdit ? 'edit' : ''], styles[Drag ? 'drag' : ''], styles[isHovering ? 'hover' : '']].join(' ')}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={moveListPage}
      ref={setNodeRef}
      style={style}
    >
      <div className={[styles['basic_top']].join(' ')}>
        <div className="align top">
          <button className={`${styles.bg_icon_box} bg_icon_box`}>
            {isEdit && <span onClick={() => modalOpen(modalState)}>Edit</span>}
            {manualsIdMatch ? getIconGroupComponent(selectedIconName) : getIconGroupComponent(manual?.imageFileName)}
          </button>

          <div className="">
            {isEdit && (
              <>
                <div className="align start">
                  {manual && (
                    <IconButtonMui onClick={() => alertOpen(alertState)}>
                      <Icons.DeleteIcon {...getIconProps('delete')} />
                    </IconButtonMui>
                  )}
                  <IconButtonMui onClick={saveClick}>
                    <Icons.CompletedIcon {...getIconProps('complete')} />
                  </IconButtonMui>
                </div>
                <span />
              </>
            )}
            {!isEdit && (
              <div className={`align start ${isHovering ? '' : 'blind'}`}>
                <IconButtonMui onClick={editClick}>
                  <Icons.EditIcon {...getIconProps('edit')} />
                </IconButtonMui>
                <div {...listeners} {...attributes}>
                  <IconButtonMui onClick={dragClick}>
                    <Icons.MenuIcon {...getIconProps('drag')} />
                  </IconButtonMui>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={[styles['basic_title']].join(' ')}>
          {isEdit ? (
            <BaseInput onChange={(event) => onChangeCardParam(event, 'titl')} value={cardParams?.titl || ''} placeholder="Please enter title." />
          ) : (
            <div className="align start">
              <EllipsisTypo className="tl">{manual?.titl || ''}</EllipsisTypo>
              {manual?.manualsListCount > 0 && (
                <Badge uiType="solid" color="blue" style="count" size="sm">
                  {manual.manualsListCount}
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>

      <div className={[styles['basic_bottom']].join(' ')}>
        {isEdit ? (
          // 컴포넌트로 적용
          <TextArea
            placeholder="Please enter description."
            className="mt_10"
            value={cardParams?.descrp || ''}
            onChange={(event) => onChangeCardParam(event, 'descrp')}
          />
        ) : (
          <EllipsisTypo className="tl" line={3}>
            {cardParams?.descrp}
          </EllipsisTypo>
        )}
      </div>
    </div>
  )
}
