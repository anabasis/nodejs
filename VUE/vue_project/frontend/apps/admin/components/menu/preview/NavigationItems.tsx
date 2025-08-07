import styles from 'ui/styles/common/_navigation.module.scss'
import { Icons } from 'ui/components/Icons'
import NavigationItem from './NavigationItem'
import { IBasicInfoData } from '@type/menu/basicInfoData'
import { IMenuLocation } from '../menuManagement'
import { MenuItemType } from 'library/util'
import { MenuDetailViewType } from '@type/menu/menumanagement'
import { Dispatch, SetStateAction, useEffect } from 'react'

const NavigationItems = ({
  isAdd,
  isAdmin,
  basicInformation,
  menuLocation,
  lnbList,
  menuDetail,
  current,
  setCurrent,
}: {
  isAdd?: boolean
  isAdmin: boolean
  basicInformation?: IBasicInfoData
  menuLocation?: IMenuLocation
  lnbList?: MenuItemType[]
  menuDetail?: MenuDetailViewType
  current: number
  setCurrent: Dispatch<SetStateAction<number>>
}) => {
  useEffect(() => {
    console.log(current)
  }, [current])
  return (
    <>
      <NavigationItem
        isAdd={isAdd}
        basicInformation={basicInformation}
        menuLocation={menuLocation}
        lnbList={lnbList}
        menuDetail={menuDetail}
        current={current}
        setCurrent={setCurrent}
      />
      <div className={`${styles.nav_box}`}>
        <button>
          <i className="no_image xs mr_8 square"></i>
          User Name
        </button>
        {!isAdmin && (
          <span className={styles.btn}>
            <i className={styles.ico}>
              <Icons.AdminIcon />
            </i>
            Admin
          </span>
        )}
      </div>
    </>
  )
}

export default NavigationItems
