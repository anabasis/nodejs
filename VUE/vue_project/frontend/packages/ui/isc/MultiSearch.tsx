// 작업자 : 최유희
// 소스 정리 예정
// import { SelectMui } from '@ui/index'
// import styles from '@ui/styles/isc/_form.module.scss'
// import { SearchIcoInput } from '@ui/components'

// type OptionType = {
//   name: string
//   value: string
// }

// interface MultiSearchProps {
//   children?: React.ReactNode
//   onClick?: () => void
//   onChangeSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void
//   onSearch?: (e: React.KeyboardEvent<HTMLInputElement>) => void
//   className?: string
//   options: OptionType[]
// }

// export const MultiSearch = ({ onChangeSearch, onSearch, options, className, children }: MultiSearchProps) => {
//   return (
//     <div className={`${styles.multi_search} ${className ? styles[className] : ''}`}>
//       <div className={styles.form}>
//         <SelectMui size="full" options={options} uiType="multi" />
//       </div>
//       <div className={styles.form}>
//         <SearchIcoInput style="search_combo" placeholder="Search" onSearch={onSearch} onChangeSearch={onChangeSearch} />
//       </div>
//     </div>
//   )
// }
