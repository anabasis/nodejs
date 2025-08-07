import { ManageMenuType, MenuItemViewType } from '@type/menu/menumanagement'
import { CSSProperties, Dispatch, MouseEvent, ReactNode, SetStateAction } from 'react'
import { Badge, ButtonMui, Icons } from 'ui'
import { MenuItemType, getCdnFileUrl } from 'library'
import Image from 'next/image'

const divStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  padding: '10px 0px',
}
export default function DefaultMenuList({
  changeableMenuList,
  handleClick,
}: {
  changeableMenuList: MenuItemType[]
  handleClick: (event: MouseEvent<HTMLDivElement>, menu: MenuItemType) => void
}) {
  const Menu = ({ menu }: { menu: MenuItemType }) => (
    <div className="row" style={{ backgroundColor: 'white' }} key={menu.mnuNum} onClick={(event) => handleClick(event, menu)}>
      <div className="row_cell align" style={{ backgroundColor: 'white', padding: '0px 25px' }}>
        <div className="lft flex1">
          <div className="">
            {menu.mnuDpth == 1 && <Image src={menu.dftIcon} alt={'icon'} height={30} width={30} />}
            {menu.mnuDpth > 1 && <Icons.ReplyIcon width={24} height={24} fill="#C6CDDA" />}
          </div>
          <p className="mlr_10 body2">{menu.mnuName}</p>
          <Badge color={menu.mnuDpth == 1 ? 'blue' : 'gray'}>
            {menu.mnuDpth == 1 && `1st`}
            {menu.mnuDpth == 2 && `2nd`}
          </Badge>
        </div>
      </div>
      {/* Draw childmenu */}
      {menu.subNavs?.length > 0 && (
        <div className="children_container" style={{ display: 'flex' }}>
          {menu.subNavs.map((menu, index) => (
            <Menu menu={menu} key={menu.mnuNum} />
          ))}
        </div>
      )}
    </div>
  )

  return (
    <div>
      {changeableMenuList?.map((menu, index) => (
        <Menu menu={menu} key={`${menu.mnuNum}_${index}`} />
      ))}
    </div>
  )
}
