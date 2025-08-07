// 작업자: 최유희
'use client'

import styles from '@ui/styles/components/breadcrumb/_breadcrumb.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useMenu, TypePathInfo } from 'library'

interface BreadcrumbProps {
  pageTitleList?: any[] | undefined
  type?: string
}

export const Breadcrumb = ({ ...others }: BreadcrumbProps) => {
  const { pageTitleList, type } = others
  const pathname = usePathname()
  const { getPathInfo } = useMenu()

  const path = () => getPathInfo(pathname)

  const ItemWrap = ({ children, menuUrl }: { children: React.ReactNode; menuUrl?: string }) => (menuUrl ? <Link href={menuUrl}>{children}</Link> : children)

  const ItemIcon = ({ info }: { info: TypePathInfo }) => (
    <i>
      <Image src={info.mnuIcon ?? '/images/no_icon.png'} alt={info.mnuName ?? 'icon image'} width={20} height={20} />
    </i>
  )

  const Item = ({ info, type, title }: { info: TypePathInfo; type?: string; title?: string }) => (
    <ItemWrap menuUrl={info.mnuUrl}>
      {info.mnuIcon && <ItemIcon info={info} />}
      {type !== 'project' ? <span>{info.mnuName}</span> : title && <span>{title}</span>}
    </ItemWrap>
  )

  return (
    pageTitleList && (
      <ul className={`${styles.breadcrumb_list} toggle`}>
        {type === 'project' && pageTitleList.length > 2
          ? pageTitleList.map((v, i) =>
              i < 2 ? (
                <li key={i}>
                  <Item info={path()} type={type} />
                </li>
              ) : (
                <li key={i}>{typeof v === 'object' ? <Item info={v} /> : <span>{v}</span>}</li>
              )
            )
          : pageTitleList.map((v, i) => (
              <li key={i}>{typeof v === 'object' ? <Item info={v} /> : i === 0 && path()?.mnuIcon ? <Item info={path()} /> : <span>{v}</span>}</li>
            ))}
      </ul>
    )
  )
}
