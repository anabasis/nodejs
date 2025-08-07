import kc from 'library/util/keycloak'

window.authKc = kc
const isKcSet = (typeof window.authKc.isLogin).toLocaleLowerCase() === 'function'

export default function InitAuth({ children }: { children: React.ReactNode }) {
  return <>{isKcSet && children}</>
}
