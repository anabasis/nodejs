'use client'

import '@ui/styles/global/_error.scss'
import Link from 'next/link'
import { ButtonMui } from '@ui/index'
import { Icons } from '@ui/components/Icons'

export default function Error404Page() {
  return (
    <div className="ptb_185">
      <Icons.Error404 />
      <div className="error_title mt_30 mb_30">
        <p className="headline3 mb_10">Page Not Found</p>
        <p className="body1 typo500">
          The page does not exist or unavailable. <br /> error code : 404
        </p>
      </div>
      <div className="error_btn">
        <Link href="/">
          <ButtonMui size="large" type="contained">
            Main page
          </ButtonMui>
        </Link>
      </div>
    </div>
  )
}
