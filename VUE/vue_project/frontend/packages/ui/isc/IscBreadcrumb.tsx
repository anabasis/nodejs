// 김수연
//

import { useState, MouseEvent, useEffect, ReactNode } from 'react'
import { Icons } from '@ui/components/Icons'

import styles from '@ui/styles/components/breadcrumb/_breadcrumb.module.scss'
import { PopoverMui } from '@ui/index'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'

export type GeneralQueryString = {
  reqId?: string
  clstrId?: string
  objectId?: string
  anlId?: string
  // runVersion?: string
  pkgId?: string
  mdlCd?: string
  excCnt?: number
  tabNum?: number
  dsignTpCd?: string
  clstId?: string
  mltpxId?: string
}

type BreadCrumbListItem = {
  anlId?: string
  anlNm?: string
  geneNm?: string
  clstId?: string
  clstNm?: string
  icTpCd?: string
  mltpxId?: string
  mltpxNm?: string
  dspNm?: string
  mutNm?: string
}
type BreadCrumbBeforeRunRes = {
  [keys: string]: BreadCrumbListItem[]
}

type BreadCrumbAfterRunRes = {
  [keys: string]: BreadCrumbBeforeRunRes
}

type tempBeforeRunItem = {
  title: string
  list: BreadCrumbListItem[]
}

type tempAfterRunItem = {
  title: string
  list: BreadCrumbBeforeRunRes
}

type AnalyteListProps = {
  listObj: BreadCrumbBeforeRunRes
}

type ModuleListProps = {
  listObj: BreadCrumbAfterRunRes
}

type CurrentObjData = BreadCrumbAfterRunRes | BreadCrumbBeforeRunRes

interface BreadcrumbItem {
  label: string
  link?: string
  listObj?: BreadCrumbBeforeRunRes
}

interface BreadcrumbProps {
  pageTitleList: BreadcrumbItem[]
  type?: string
  page?: string
  query?: GeneralQueryString
  onClick?: Function
}

export const IscBreadcrumb = ({ pageTitleList, type, page, query, onClick }: BreadcrumbProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [open, setOpen] = useState(false)
  // const [current, setCurrent] = useState('')
  const [currentListObj, setCurrentListObj] = useState({})

  const handleDropdownToggle = (current: BreadcrumbItem) => (event: MouseEvent<HTMLButtonElement>) => {
    const { label, listObj } = current

    setCurrentListObj(listObj || {})
    setAnchorEl(event.currentTarget)
    // setOpen(true)
    // setCurrent(label)
  }
  const handleClose = () => {
    setAnchorEl(null)
    // setOpen(false)
  }
  const renderBreadcrumbItem = (item: BreadcrumbItem, index: number) => (
    <li key={index}>
      {item.listObj ? (
        <span className={styles.isdrop} onClick={handleDropdownToggle(item)}>
          {item.label}
        </span>
      ) : (
        <a href={item.link}>
          <span>{item.label}</span>
        </a>
      )}
    </li>
  )

  const convertAnlList = (obj: BreadCrumbBeforeRunRes) => {
    const typeObj: { [key: string]: string } = {
      ptAnlList: 'PTOD',
      pmAnlList: 'PMOD',
      niAnlList: 'New IC',
      ctAnlList: 'Custom',
      ciAnlList: 'Custom IC',
      mulList: 'Multiplex',
      mltpxList: 'Multiplex',
    }
    const dsignTpCdObj: { [key: string]: string } = {
      ptAnlList: 'PT',
      pmAnlList: 'PM',
      niAnlList: 'NI',
      ctAnlList: 'CT',
      ciAnlList: 'CI',
      mulList: 'MPX',
      mltpxList: 'MPX',
    }
    // const priorityArr = ['ptAnlList', 'pmAnlList', 'niAnlList', 'ctAnlList', 'ciAnlList', 'mulList']
    const res =
      Object.keys(typeObj)
        .reduce((p: tempBeforeRunItem[], v: string) => {
          const tempList =
            (obj[v] || []).map((vv) => {
              const { anlId, anlNm, clstId, clstNm, geneNm, icTpCd, mltpxId, mltpxNm, mutNm } = vv
              const displayId = mltpxId || clstId || anlId
              const displayName = mltpxNm || clstNm || mutNm || anlNm

              return {
                ...vv,
                dsignTpCd: dsignTpCdObj[v],
                dspNm: `[${displayId}] ${displayName || geneNm || icTpCd} ${displayName && geneNm ? '(' + geneNm + ')' : ''}`,
              }
            }) || []

          return [
            ...p,
            {
              title: typeObj[v],
              list: tempList || [],
            },
          ]
        }, [])
        .filter((v) => v.list.length) || []

    return res
  }

  const convertModuleList = (obj: BreadCrumbAfterRunRes) => {
    const moduleTypeObj: { [key: string]: string } = {
      autoMSAAnlList: 'AutoMSA',
      monoOMAnlList: 'MonoOM',
      customOligoAnlList: 'Custom Oligo',
      multiplexList: 'Multiplex',
    }

    const res =
      Object.keys(moduleTypeObj)?.reduce((p: tempAfterRunItem[], v: string) => {
        // console.log(156, moduleTypeObj[v], obj[v])
        const hasItems = Object.keys(obj[v]).reduce((pp: number, vv: string) => pp + obj[v][vv].length, 0)
        const tempList = {
          title: `${moduleTypeObj[v]} ${page}`,
          list: obj[v],
        }

        return hasItems ? [...p, tempList] : p
      }, []) || []

    return res
  }

  const isCurrent = (id: string | undefined) => {
    const { anlId, clstId, mltpxId } = query || {}

    return [anlId, clstId, mltpxId].filter((v) => !!v).includes(id || '')
  }

  const AnalyteList = ({ listObj }: AnalyteListProps) => (
    <div className={`${styles.groups_wrapper} pt_0`}>
      <div className={`${styles.groups} grid6 scroll_y max_h320 pt_0`}>
        {convertAnlList(listObj || {}).map((item, i) => (
          <div className={`${styles.group} pt_0`} key={item.title + i}>
            <p className={`${styles.group_title}`}>{item.title}</p>
            <ul className={styles.group_ls}>
              {item.list?.map((itemInner, j) => {
                const { anlId, clstId, mltpxId, dspNm } = itemInner
                const id = mltpxId || clstId || anlId

                return (
                  <li
                    className={isCurrent(id) ? styles.selected : ''}
                    key={`${item?.title}-${id}-${j}`}
                    onClick={() => (onClick ? onClick({ item: itemInner }) : () => {})}
                  >
                    <p className={styles.item}>{dspNm}</p>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )

  const ModuleList = ({ listObj }: ModuleListProps) => (
    <div className={`${styles.groups_wrapper}`}>
      {/*   case2 ::
    AutoMSA Result - groups width만 변경
        */}
      <div className={`${styles.groups} grid3_5`}>
        <div className={`${styles.group}`}>
          <ul className={styles.group_ls}>
            {convertModuleList(listObj || {}).map((moduleItem, i) => (
              <li key={'moduleItem' + i}>
                <p className={styles.item}>
                  {moduleItem.title} <Icons.AngleIcon fill="var(--navy800)" />
                </p>
                <AnalyteList listObj={moduleItem.list} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )

  // useEffect(() => {
  //   console.log(162, 'pageTitleList', pageTitleList)
  //   console.log(163, 'type', type)
  //   console.log(164, 'page', page)
  //   console.log(165, 'query', query)
  // }, [pageTitleList])

  return (
    <>
      {/*
    인실리코 RQ info 페이지에서 breadcrumb icon이 다릅니다

    https://www.figma.com/file/U5K7krQQXKfUg2UD1iIKAB/Seegene_PTOD%2FPMOD-%EC%84%A4%EA%B3%84%EC%95%88-(Share)?type=design&node-id=4454-188609&mode=dev */}
      <ul className={`${styles.breadcrumb_list} ${styles.isc} toggle`}>
        {type === 'project'
          ? pageTitleList.map((item, index) => {
              if (pageTitleList.length > 2) {
                return index < 2 ? (
                  <li key={index}>
                    <a href={item.link}>
                      <i>
                        <Icons.MenuIconDummy />
                      </i>
                    </a>
                  </li>
                ) : (
                  renderBreadcrumbItem(item, index)
                )
              } else {
                return renderBreadcrumbItem(item, index)
              }
            })
          : pageTitleList.map((item, index) =>
              index === 0 ? (
                <li key={index}>
                  <i>
                    <Icons.MenuIconDummy />
                  </i>
                  <span>{item.label}</span>
                </li>
              ) : (
                renderBreadcrumbItem(item, index)
              )
            )}
      </ul>
      <PopoverMui
        anchorEl={anchorEl}
        handleClose={handleClose}
        margin="8px 0 0 0px"
        className={`isc_popover`}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        {/* convertAnlList */}
        {page && ['Analyte', 'ResultMultiplex'].includes(page) ? <AnalyteList listObj={currentListObj} /> : <ModuleList listObj={currentListObj} />}
      </PopoverMui>
    </>
  )
}
