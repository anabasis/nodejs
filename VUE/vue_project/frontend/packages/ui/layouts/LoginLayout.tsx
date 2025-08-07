import styles from '@ui/styles/common/_layouts.module.scss'

export const LoginLayout = ({ children }: { children?: React.ReactNode }) => {
  return (
    <section className={styles.login_box}>
      <div className={styles.login}>{children}</div>
    </section>
  )
}
