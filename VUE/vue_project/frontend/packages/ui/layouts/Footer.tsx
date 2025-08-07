// 작업자: 최유희

import { Icons } from '@ui/components/Icons'
import TermsPopup from '@ui/components/footer/TermsPopup'
import styles from '@ui/styles/common/_footer.module.scss'
import { useModal } from 'library'
import { useTermsListData } from 'library/store/server/useTermsQuery'
import { TermsListType } from 'library/type/terms'
import { useCallback } from 'react'

export const Footer = () => {
  const { modalOpen } = useModal()

  const { data: termsList } = useTermsListData()

  const handleTermsClick = useCallback(
    ({ termsCategoryCodeName, termsCategoryCode }: { termsCategoryCodeName: string; termsCategoryCode: string }) => {
      modalOpen({
        title: termsCategoryCodeName,
        maxWidth: 'xl',
        linetitle: true,
        content: <TermsPopup termsCategoryCode={termsCategoryCode} />,
      })
    },
    [modalOpen]
  )

  return (
    <footer className={styles.align}>
      <div className="lft">
        <Icons.FooterLogo />
        <ul className={styles.terms_ls}>
          {termsList?.map((item: TermsListType) => (
            <li key={item.termsCategoryCode} onClick={() => handleTermsClick(item)}>
              {item.termsCategoryCodeName}
            </li>
          ))}
          {/* <li>Terms of Service</li>
          <li>Privacy Policy</li>
          <li>Information Confidential Agreement</li>
          <li>Cookie policy</li> */}
        </ul>
      </div>
      <div className="rgt">
        <p className="body2 typo500">Copyright © 2023 Seegene Inc. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
