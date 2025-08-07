import { ContentBox, ButtonMui, ButtonGroup } from 'ui'
import { useModal, ModalType } from 'library/hook/useModal'
import { useAlert, AlertType } from 'library/hook/useAlert'
import { useRouter } from 'next/navigation'
import { PreviewContent } from './PreviewContent'
import { useEffect, useState } from 'react'
import ManageMenuList from './ManageMenuList'
import { isEqual } from 'lodash-es'
import { MenuItemType } from 'library/util/menu'
import { MenuPosition } from '@type/menu/menumanagement'
import { useMenuMutate } from '@store/server/useMenuQuery'
import { useToastPopup } from 'library'
import { useSetAtom } from 'jotai'
import { currentTabSelectedAtom } from '@store/client/menu'

export default function ManageContentWrapper({
  isAdmin,
  gnbList,
  lnbList,
  currentTab,
}: {
  isAdmin: boolean
  gnbList: MenuItemType[]
  lnbList: MenuItemType[]
  currentTab: 'gnb' | 'lnb'
}) {
  const router = useRouter()
  const [changeableGnb, setChangeableGnb] = useState<MenuItemType[]>()
  const [changeableLnb, setChangeableLnb] = useState<MenuItemType[]>()
  const [menuCopy, setMenuCopy] = useState<MenuItemType[]>()
  const setCurrentTab = useSetAtom(currentTabSelectedAtom)

  const { modifyMenuArrangementMutate, isArragementModifyLoading } = useMenuMutate(isAdmin ? 'admin' : 'user', currentTab)
  const { alertOpen, alertClose } = useAlert()
  const { modalOpen } = useModal()
  const { toastOpen, getToastState } = useToastPopup()

  const alertDataState: ModalType = {
    title: 'Preview',
    textTitle: 'Check out the changes and modifications.',
    maxWidth: 'xl',
    preview: true,
    content: <PreviewContent isAdmin={isAdmin} changeableGnb={changeableGnb} changeableLnb={changeableLnb} />,
  }

  const handleCancelPopupOkbtnClick = () => {
    setCurrentTab(currentTab.toUpperCase())
    if (isAdmin) {
      router.push('/menu/admin/')
    } else {
      router.push('/menu/user/')
    }
  }

  const cancelPopup = () => {
    const alertState: AlertType = {
      InfoType: 'cancel',
      content: (
        <div className="align center mt_30">
          <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
            Cancel
          </ButtonMui>
          <ButtonMui size="xlarge" onClick={handleCancelPopupOkbtnClick}>
            OK
          </ButtonMui>
        </div>
      ),
    }
    alertOpen(alertState)
  }

  const constructMenuPositionList = (): MenuPosition[] => {
    const gnbList: MenuPosition[] = changeableGnb.map(
      (menu: MenuItemType, index: number): MenuPosition => ({ menuNum: menu.mnuNum, menuParentNum: menu.parentsMnuNum, menuOrder: index + 1 })
    )

    let lnbList: MenuPosition[] = []

    changeableLnb.forEach((menu, index) => {
      lnbList.push({ menuNum: menu.mnuNum, menuParentNum: menu.parentsMnuNum, menuOrder: index + 1 })

      if (menu.subNavs?.length > 0) {
        menu.subNavs.map((childMenu, childIndex) => lnbList.push({ menuNum: childMenu.mnuNum, menuParentNum: menu.mnuNum, menuOrder: childIndex + 1 }))
      }
    })

    return [...gnbList, ...lnbList]
  }

  const handleSaveBtnClick = () => {
    const modifyMenuArrangementPost = constructMenuPositionList()
    modifyMenuArrangementMutate({ isAdmin, menuPositionList: modifyMenuArrangementPost })
  }

  useEffect(() => {
    if (gnbList?.length > 0 && lnbList?.length > 0) {
      setChangeableGnb(JSON.parse(JSON.stringify(gnbList)))
      setChangeableLnb(JSON.parse(JSON.stringify(lnbList)))
      if (currentTab === 'gnb') {
        setMenuCopy(JSON.parse(JSON.stringify(gnbList)))
      }
    }
  }, [gnbList, lnbList])

  useEffect(() => {
    //lnb로 넘어갔을 때는 gnblist 체크
    if (changeableLnb?.length > 0 && changeableGnb?.length > 0) {
      if (currentTab === 'lnb' && !isEqual(changeableGnb, menuCopy)) {
        toastOpen(getToastState({ content: 'Changes have been temporarily saved.', icon: 'success' }))
      }
      //gnb로 넘어갔을 떄는 lnblist 체크
      if (currentTab === 'gnb' && !isEqual(changeableLnb, menuCopy)) {
        toastOpen(getToastState({ content: 'Changes have been temporarily saved.', icon: 'success' }))
      }
      setMenuCopy(JSON.parse(JSON.stringify(currentTab === 'lnb' ? changeableLnb : changeableGnb)))
    }
  }, [currentTab])

  return (
    <ContentBox>
      <article>
        <div className="cont_title_box align">
          <div className="left">
            <p className="title1">Change Menu Order</p>
            <p className="body2">Change the order by selecting the menu you want to change, and save it by clicking the save button below.</p>
          </div>
          <div className="rgt">
            <ButtonMui
              color={'black'}
              size={'small'}
              onClick={() => {
                modalOpen(alertDataState)
              }}
            >
              Preview
            </ButtonMui>
          </div>
        </div>
        <div className="divtable table_content">
          <ManageMenuList
            changeableGnb={changeableGnb}
            changeableLnb={changeableLnb}
            setChangeableGnb={setChangeableGnb}
            setChangeableLnb={setChangeableLnb}
            currentTab={currentTab}
          />
        </div>
      </article>
      <div className="cont_bottom_box">
        <div className="align end">
          <ButtonMui type="outlined" size="xlarge" onClick={() => cancelPopup()}>
            Cancel
          </ButtonMui>
          <ButtonMui
            type="contained"
            size="xlarge"
            disabled={isEqual(gnbList, changeableGnb) && isEqual(lnbList, changeableLnb)}
            onClick={handleSaveBtnClick}
            isLoading={isArragementModifyLoading}
          >
            Save
          </ButtonMui>
        </div>
      </div>
    </ContentBox>
  )
}
