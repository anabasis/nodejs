// 작업자 : 김수연

import styles from '@ui/styles/common/_navigation.module.scss'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ToolItem } from 'library/type/common'
import { getToolsList } from 'library/api/common'
import { getCdnFileUrl } from 'library/util'
import { NoData } from '../common'

const Item = ({ tool }: { tool: ToolItem }) => {
  return (
    <li className={styles.item}>
      <a rel="noopener noreferrer" href={tool.toolLinkUrl} target="_blank">
        <div className={styles.tools_img}>
          <Image alt={tool.toolsRauncherIcon.displayFileName} src={getCdnFileUrl(tool.toolsRauncherIcon) ?? ''} width={46} height={46} />
        </div>
        <div className={styles.info}>
          <p className={styles.title}>{tool.toolName}</p>
          <p className={styles.desc}>{tool.description}</p>
        </div>
      </a>
    </li>
  )
}

const EmptyItem = () => <NoData text="No tools available." size="sm" className={styles.nodata} />

const PopTools = () => {
  const [tools, setTools] = useState<ToolItem[]>([])

  const init = async () => {
    const list = await getToolsList()
    setTools(list.slice(0, 12))
  }

  useEffect(() => {
    init()
  }, [])

  return tools?.length > 0 ? (
    <ul className={styles.tools}>
      {tools.map((v) => (
        <Item tool={v} key={v.toolNum} />
      ))}
    </ul>
  ) : (
    <EmptyItem />
  )
}

export default PopTools
