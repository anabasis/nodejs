import styles from '@ui/styles/common/_navigation.module.scss'
import { useState, MouseEvent } from 'react'
import { PopoverMui, AvatarMui } from '@ui/index'
import { Icons } from '@ui/components/Icons'
import PopMypage from '@ui/components/navigation/PopMypage'
import PopTools from '@ui/components/navigation/PopTools'
import NavigationItem from '@ui/components/navigation/NavigationItem'
import Link from 'next/link'
import { useUser } from 'library/hook'
import { isDev, getRootUrl, getIsAdmin } from 'library/util'

const NavigationItems = ({ className }: { className?: string }) => {
  const [open, setOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [current, setCurrent] = useState('')
  const { userInfo, adminRole, userRole, updateUserAtom } = useUser()

  const onPopoverClick = (current: string) => (event: MouseEvent<HTMLButtonElement>) => {
    updateUserAtom()
    setAnchorEl(event.currentTarget)
    setOpen(true)
    setCurrent(current)
  }
  const handleClose = () => {
    setAnchorEl(null)
    setOpen(false)
  }

  return (
    <>
      <NavigationItem className={className} />
      <div className={`${styles.nav_box}`}>
        <button onClick={onPopoverClick('myPage')} className={`${styles.mypage} ${open && current === 'myPage' ? styles.active : ''}`}>
          {userInfo?.prflUrl ? (
            <i className={styles.ico}>
              <AvatarMui data={[{ src: userInfo?.prflUrl, alt: userInfo?.usrNm ?? 'avatar' }]} size="xsmall" />
            </i>
          ) : (
            <i className="no_image xs mr_8 square"></i>
          )}
          {userInfo?.usrNm}
        </button>
        {!getIsAdmin() ? (
          <>
            {userRole && userRole.usrRolCd !== 'U-XM' && (
              <button onClick={onPopoverClick('toolsPop')} className={`${open && current === 'toolsPop' ? styles.active : ''}`}>
                <i className={styles.ico}>
                  <Icons.ToolIcon fill={open && current === 'toolsPop' ? '#3357ff' : '#A2ADC1'} />
                </i>
                Tools
              </button>
            )}
            {adminRole && adminRole.length > 0 && (
              <Link href={isDev ? process.env['NEXT_PUBLIC_URL_LOCAL_ADMIN'] ?? '' : `${getRootUrl()}/ispa`} className={styles.btn}>
                <i className={styles.ico}>
                  <Icons.AdminIcon />
                </i>
                Admin
              </Link>
            )}
          </>
        ) : (
          <Link href={getRootUrl()} className={styles.btn}>
            <i className={styles.ico}>
              <svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10ZM14 12.9412C14 14.5655 12.2091 15 10 15C7.79086 15 6 14.5655 6 12.9412C6 11.3168 7.79086 10 10 10C12.2091 10 14 11.3168 14 12.9412ZM10 9C11.1046 9 12 8.10457 12 7C12 5.89543 11.1046 5 10 5C8.89543 5 8 5.89543 8 7C8 8.10457 8.89543 9 10 9Z"
                  fill="#A2ADC1"
                />
              </svg>
            </i>
            User
          </Link>
        )}
      </div>
      <PopoverMui anchorEl={anchorEl} handleClose={handleClose} margin="0 0 0 30px " shadows="0px 4px 20px 0px #35416533">
        <div className={styles.wrapper}>
          {current === 'myPage' && userInfo && <PopMypage userInfo={userInfo} doClose={handleClose} />}
          {current === 'toolsPop' && <PopTools />}
        </div>
      </PopoverMui>
    </>
  )
}

export default NavigationItems
