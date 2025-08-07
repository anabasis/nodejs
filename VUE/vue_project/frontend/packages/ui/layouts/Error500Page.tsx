'use client'

import { useRouter } from 'next/navigation'
import { Icons } from '@ui/components/Icons'
import { ButtonMui } from '@ui/index'
import '@ui/styles/global/_error.scss'

export default function Error500Page() {
  const router = useRouter()

  return (
    <div className="ptb_185">
      <Icons.Error500 />
      <div className="error_title mt_30 mb_30">
        <p className="headline3 mb_10">Internal Server Error</p>
        <p className="body1 typo500">
          Sorry, server error unable to fulfill your request. <br /> error code : 500
        </p>
      </div>
      <div className="error_btn">
        <ButtonMui onClick={router.refresh} size="large" type="contained">
          Reload
        </ButtonMui>
      </div>
    </div>
  )
}
