'use client'

import { Badge, ButtonMui, ContextButton, Icons, TooltipClick } from 'ui'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAlert, useMenu } from 'library/hook'
import { getRootUrl, isDev } from 'library'
import { MenuItemViewType } from '@type/menu/menumanagement'
import { useMenuAuthority } from '@hook/useMenuAuthority'

interface IColumnData {
  title: string
  colStyle: string
}

interface IDivTableProps {
  deleteMenu: (menuNum: number) => void
  isAdmin: boolean
  dataList: any
  columnPropertyList: IColumnData[]
  columnKeyList: string[]
}

const ToolTipPopUp = ({ level, levelList }: { level: string; levelList: string[] }) => {
  return (
    <TooltipClick title={level === 'A' ? 'Level A' : 'Level B'} placements="top-start">
      <ul className="mb_5">
        {levelList?.map((levelItem, index) => {
          return (
            <li className="body2 typo500 mt_10" key={`${levelItem}_${index}_${level}`}>
              {levelItem}
            </li>
          )
        })}
      </ul>
    </TooltipClick>
  )
}

const createTableRow = (data: any, columnKeyList: string[], columnPropertyList: IColumnData[], isAdmin: boolean) => {
  const getIcon = (url: string) => {
    return url?.length > 0 ? <Image src={url} width={20} height={20} alt="icon" /> : <Icons.ReplyIcon fill="var(--navy100)" width={20} height={20} />
  }

  return (
    <>
      {columnKeyList.map((key, index) => {
        if (key !== 'menuRoleMap') {
          return (
            <div className={`cell ${columnPropertyList[index].colStyle}`} key={`${key}_${index}`}>
              {key === 'icon' ? (
                getIcon(data[key])
              ) : key === 'menuName' ? (
                <div className={'align start gap_2'}>
                  <p className="ellipsis">{data[key].find((menuNm) => menuNm.langCd === 'en').mnuNm}</p>
                  <Badge color={data.depth == 1 ? 'blue' : 'gray'}>
                    {data.depth == 1 && `1st`}
                    {data.depth == 2 && `2nd`}
                  </Badge>
                </div>
              ) : (
                data[key]
              )}
            </div>
          )
        } else {
          return (
            <div className={`cell authority ${columnPropertyList[index].colStyle}`} key={`${key}_${index}`}>
              <span>
                <strong>Level A</strong>
                {`${data[key].A?.length} Roles`}
                {data[key].A.length != 0 ? (
                  <div className="ml_6">
                    <ToolTipPopUp level="A" levelList={data[key]?.A} />
                  </div>
                ) : (
                  ''
                )}
              </span>
              {!isAdmin && (
                <span>
                  <strong>Level B</strong>
                  {`${data[key]?.B?.length} Roles`}
                  {data[key]?.B.length != 0 && (
                    <div className="ml_6">
                      <ToolTipPopUp level="B" levelList={data[key]?.B} />
                    </div>
                  )}
                </span>
              )}
            </div>
          )
        }
      })}
    </>
  )
}

const ChildrenWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="children_container">{children}</div>
}

const TableWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className={`divtable`}>{children}</div>
}

const TableContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="table_content">{children}</div>
}

const ColumnTitleWrapper = ({ children }: { children: React.ReactNode }) => {
  return <div className="column_title_wrapper">{children}</div>
}

const TableHeader = ({ columnDataList }: { columnDataList: IColumnData[] }) => {
  return (
    <ColumnTitleWrapper>
      {columnDataList.map((data, index) => {
        return (
          <div className={`column_title ${data.colStyle} `} key={`column_title_${index}`}>
            {data.title}
          </div>
        )
      })}
      {/* context button 위치 title 위치 수정 필요 */}
      <div className={`column_title grid1`}></div>
    </ColumnTitleWrapper>
  )
}

export const DivTable = ({ deleteMenu, isAdmin, dataList = [], columnKeyList, columnPropertyList }: IDivTableProps) => {
  const router = useRouter()
  const { updateMenuAtom } = useMenu()
  const { alertOpen, alertClose } = useAlert()
  const { getUserAuthority } = useMenuAuthority()
  const { update, delete: deleteAuth } = getUserAuthority()

  const handleMenuEditClick = (menuNum: number) => {
    if (isAdmin) {
      location.href = `${isDev ? '' : getRootUrl() + '/ispa'}/menu/admin/edit/?id=${menuNum}`
    } else {
      location.href = `${isDev ? '' : getRootUrl() + '/ispa'}/menu/user/edit/?id=${menuNum}`
    }
  }

  const handleMenuDeleteClick = (menuNum: number) => {
    try {
      deleteMenu(menuNum)
      alertClose()
      setTimeout(updateMenuAtom, 400)
    } catch (error) {
      console.error(error)
      alertClose()
    }
  }

  const getKebabOptions = () => {
    const defaultKebabOptions = [
      { name: 'Edit menu', onClick: (menuNum: number) => handleMenuEditClick(menuNum) },
      {
        name: 'Delete menu',
        onClick: (menuNum: number) => {
          alertOpen({
            title: 'Are you sure to delete?',
            textTitle: <span>If you click the delete button, it cannot be recovered.</span>,
            maxWidth: 'xs',
            icon: 'info',
            content: (
              <div className="align center mt_30">
                <ButtonMui type="outlined" size="xlarge" onClick={() => alertClose()}>
                  Cancel
                </ButtonMui>
                <ButtonMui size="xlarge" onClick={() => handleMenuDeleteClick(menuNum)}>
                  Delete
                </ButtonMui>
              </div>
            ),
          })
        },
      },
    ]

    if (deleteAuth && update) {
      return defaultKebabOptions
    } else {
      return deleteAuth ? defaultKebabOptions.splice(1, 1) : defaultKebabOptions.splice(0, 1)
    }
  }

  const ChildRow = ({ columnKeyList, childData, columnPropertyList }: { columnKeyList: string[]; childData: any; columnPropertyList: any[] }) => {
    return (
      <div className="row">
        {createTableRow(childData, columnKeyList, columnPropertyList, isAdmin)}
        <div className="cell grid1">
          {(deleteAuth || update) && <ContextButton rowData={childData.menuNum} options={getKebabOptions()} rotate iconsize={20} />}
        </div>
      </div>
    )
  }

  const ParentRow = ({
    columnKeyList,
    children,
    data,
    columnPropertyList,
  }: {
    columnKeyList: string[]
    children: React.ReactNode
    data: MenuItemViewType
    columnPropertyList: IColumnData[]
  }) => {
    return (
      <div className="row">
        <div className="row_cell">
          {createTableRow(data, columnKeyList, columnPropertyList, isAdmin)}
          <div className="cell grid1">
            {(deleteAuth || update) && <ContextButton rowData={data.menuNum} options={getKebabOptions()} rotate iconsize={20} />}
          </div>
        </div>
        {children}
      </div>
    )
  }

  return (
    <TableWrapper>
      {columnPropertyList && <TableHeader columnDataList={columnPropertyList} />}

      <TableContent>
        {dataList.map((data: any, parentIndex: number) => {
          const parentRowProps = { data: data, columnKeyList: columnKeyList, columnPropertyList: columnPropertyList }
          return (
            <ParentRow {...parentRowProps} key={parentIndex}>
              {data.childrenData && (
                <ChildrenWrapper>
                  {data.childrenData?.map((childData, childIndex) => {
                    return (
                      <ChildRow
                        childData={childData}
                        key={`${parentIndex}_${childIndex}`}
                        columnPropertyList={columnPropertyList}
                        columnKeyList={columnKeyList}
                      />
                    )
                  })}
                </ChildrenWrapper>
              )}
            </ParentRow>
          )
        })}
      </TableContent>
    </TableWrapper>
  )
}
