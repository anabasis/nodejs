// 작업자 : 최유희
import { useState } from 'react'

import styles from '@ui/styles/components/tree/_tree.module.scss'
import { Icons } from '@ui/components/Icons'

interface TreeMenuItemProps {
  item: {
    text: string
    hasSubItems: boolean
    subItems: any[]
  }
}

export const TreeMenuItem = ({ item }: TreeMenuItemProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <li className={`${styles[`depth_${item.hasSubItems ? 2 : 3}_item`]}${isOpen ? ' active' : ''}`}>
      <div className="align start pd_10" onClick={handleToggle}>
        {item.hasSubItems && (
          <i className={`${styles.tree_arrow}${isOpen ? ' down' : ''}`}>
            <Icons.TreeAngleIcon width={20} height={20} fill={isOpen ? '#3357FF' : '#A2ADC1'} />
          </i>
        )}
        {!item.hasSubItems && <i className={styles.tree_arrow}></i>}
        <i className={styles.tree_ico}>
          <Icons.FolderIcon width={20} height={20} fill={isOpen ? '#3357FF' : '#A2ADC1'} />
        </i>
        <span>{item.text}</span>
      </div>
      {item.subItems && item.subItems.length > 0 && isOpen && (
        <ul className={styles[`depth_${item.hasSubItems ? 2 : 3}`]}>
          {item.subItems.map((subItem, index) => (
            <TreeMenuItem key={index} item={subItem} />
          ))}
        </ul>
      )}
    </li>
  )
}
