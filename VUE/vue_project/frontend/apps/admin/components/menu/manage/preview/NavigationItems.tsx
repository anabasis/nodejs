import styles from 'ui/styles/common/_navigation.module.scss'
import { Icons } from 'ui/components/Icons'
import NavigationItem from './NavigationItem'
import { IBasicInfoData } from '@type/menu/basicInfoData'
import { MenuItemType } from 'library/util'
import { MenuDetailViewType } from '@type/menu/menumanagement'
import { Dispatch, SetStateAction } from 'react'

const NavigationItems = ({
  isAdmin,
  lnbList,
  current,
  setCurrent,
}: {
  isAdmin: boolean
  lnbList?: MenuItemType[]
  current: number
  setCurrent: Dispatch<SetStateAction<number>>
}) => {
  return (
    <>
      <NavigationItem lnbList={lnbList} current={current} setCurrent={setCurrent} />
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
