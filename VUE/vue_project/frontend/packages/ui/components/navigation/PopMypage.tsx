'use client'

import styles from '@ui/styles/common/_navigation.module.scss'
import { Avatar } from '@mui/material'
import { Icons } from '@ui/components/Icons'
import Link from 'next/link'
import { TypeUserInfo } from 'library/type/user'
import { getIsAdmin, getRootUrl } from 'library/util'

const PopMypage = ({ userInfo, doClose }: { userInfo: TypeUserInfo; doClose: () => void }) => {
  return (
    <>
      <div className={styles.my_info}>
        {userInfo.prflUrl ? <Avatar sx={{ width: '60px', height: '60px' }} alt={userInfo.usrNm} src={userInfo.prflUrl} /> : <i className="no_image md"></i>}
        <div className={styles.info_txt}>
          <p className={styles.name}>{userInfo.usrNm}</p>
          <p className={styles.group}>{userInfo.orgnNm ?? '-'}</p>
          <p className={styles.id}>{userInfo.emlId}</p>
        </div>
      </div>
      {!getIsAdmin() && (
        <>
          <Link href={`${getRootUrl()}/mypage`} className={`${styles.mypage} ${styles.btn}`} onClick={doClose}>
            <Icons.UserIcon fill="var(--navy200)" />
            <span>My Page</span>
          </Link>
          <hr className={styles.divider} />
        </>
      )}
      <button className={`${styles.logout} ${styles.btn}`} onClick={() => window.authKc.doLogout('/')}>
        <Icons.LogoutIcon />
        <span>Log Out</span>
      </button>
    </>
  )
}

export default PopMypage
