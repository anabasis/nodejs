// 작성자 : 김찬영
import { useRouter } from 'next/navigation'
import styles from 'ui/styles/components/tab/_tab.module.scss'

export const PageListTab = ({ activeTab, tabData }) => {
  const router = useRouter()
  const activeTabHandler = (index) => {
    router.push(tabData[index].href)
  }

  return (
    <>
      <ul className={`${styles.tab_lst} ${styles.sticky} tab_lst`}>
        {tabData &&
          tabData.map((item, index) => (
            // 클릭시 active class 추가
            <li
              key={item.tabName}
              className={`${styles['tab_lst_item']} ${index === activeTab ? `${styles['active']} active` : ''}`}
              onClick={() => activeTabHandler(index)}
            >
              {item.tabName}
            </li>
          ))}
      </ul>
    </>
  )
}
