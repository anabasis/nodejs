// 작업자 : 최유희
// textarea 로 받은 데이터를 공백값 포함해서 노출하기 위한 컴포넌트
import styles from '@ui/styles/components/typo/_Typo.module.scss'

interface PreTypoProps {
  children: React.ReactNode
  className?: string
}

export const PreTypo = ({ children, ...other }: PreTypoProps) => {
  const { className } = other

  return <pre className={`${styles.pre} ${className}`}>{children}</pre>
}
