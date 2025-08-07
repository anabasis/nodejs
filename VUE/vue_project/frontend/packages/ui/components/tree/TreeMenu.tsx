// 작업자 : 최유희
import { TreeMenuItem } from '@ui/components/tree/TreeMenuItem'
import styles from '@ui/styles/components/tree/_tree.module.scss'

interface TreeMenuProps {
  treeData: any[]
}

export const TreeMenu = ({ treeData }: TreeMenuProps) => {
  return (
    <div className={styles.tree_menu}>
      <ul className={styles.depth_1}>{treeData && treeData.map((item, index) => <TreeMenuItem key={index} item={item} />)}</ul>
    </div>
  )
}
