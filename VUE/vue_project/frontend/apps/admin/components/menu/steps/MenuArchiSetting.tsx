import { ButtonMui, ContentBox, ContentBoxWrap, Icons } from 'ui'
import { IBasicInfoData } from '@type/menu/basicInfoData'
import { DraggableList } from '../drag-and-drop/DraggableList'
import { MenuDetailViewType, MenuListViewType } from '@type/menu/menumanagement'
import { Dispatch, useEffect, useState } from 'react'
import { useModal, ModalType } from 'library/hook/useModal'
import { PreviewContent } from '../PreviewContent'
import { useMenuListQuery } from '@store/server/useMenuQuery'
import { SetStateAction } from 'jotai'
import { IMenuLocation } from '../menuManagement'

interface IMenuArchiSettingProps {
  isAdd: boolean
  isAdmin: boolean
  basicInformation?: IBasicInfoData
  menuLocation: IMenuLocation
  setMenuLocation: Dispatch<SetStateAction<IMenuLocation>>
  menuDetail?: MenuDetailViewType
}

export const MenuArchiSetting = ({ isAdd, isAdmin, basicInformation, menuLocation, setMenuLocation, menuDetail }: IMenuArchiSettingProps) => {
  const { data, isFetched } = useMenuListQuery({ isAdmin })
  const { navigationLocation } = basicInformation
  const [menuList, setMenuList] = useState<MenuListViewType>(data)

  const { modalOpen } = useModal()
  const alertDataState: ModalType = {
    title: 'Preview',
    textTitle: 'Check out the changes and modifications.',
    maxWidth: 'xl',
    preview: true,
    content: <PreviewContent isAdd={isAdd} isAdmin={isAdmin} basicInformation={basicInformation} menuLocation={menuLocation} menuDetail={menuDetail} />,
  }

  useEffect(() => {
    if (isFetched && !!data) {
      setMenuList(data)
    }
  }, [data])

  return (
    <article>
      <div className="cont_title_box align">
        <div className="left">
          <p className="title1">Menu Architecture Setting</p>
          <p className="body2">Please set the position of the menu to be registered.</p>
        </div>
        <div className="rgt">
          <ButtonMui color={'black'} size={'medium'} onClick={() => modalOpen(alertDataState)}>
            Preview
          </ButtonMui>
        </div>
      </div>

      <div className="divtable table_content">
        <DraggableList
          isAdd={isAdd}
          basicInformation={basicInformation}
          initialData={navigationLocation === 'GNB' ? menuList?.gnbList : menuList?.lnbList}
          menuLocation={menuLocation}
          setMenuLocation={setMenuLocation}
          menuDetail={menuDetail}
        />
      </div>
    </article>
  )
}
