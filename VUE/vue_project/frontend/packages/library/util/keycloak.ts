import Keycloak from 'keycloak-js'
import { isDev, getToken as fnGetToken } from './fn'
import { api } from './axios'

declare global {
  interface Window {
    authKc: {
      doLogin: Function
      doLogout: Function
      isLogin: Function
      getToken: Function
      updateToken: Function
      getPToken: Function
    }
  }
}

const _kc = new Keycloak({
  clientId: 'platform-client',
  realm: 'seegene',
  url: process.env['NEXT_PUBLIC_AUTH_URL'],
})

await _kc
  .init({
    onLoad: 'check-sso',
    silentCheckSsoRedirectUri: `${location.origin}/silent-check-sso.html`,
    pkceMethod: 'S256',
  })
  .then((authenticated: boolean) => {
    console.log('auth', authenticated)
    localStorage.setItem('aTkn', _kc.token ?? '')
  })
  .catch((err) => {
    location.href = `${process.env['NEXT_PUBLIC_AUTH_URL']}`
    alert(`[ERROR] Go to ${process.env['NEXT_PUBLIC_AUTH_URL']}`)
  })

// https://www.keycloak.org/docs/22.0.1/securing_apps/#api-reference

const origin = isDev ? process.env['NEXT_PUBLIC_URL_LOCAL_PLATFORM'] : location.origin

const doLogin = (path?: string) => {
  const redirectUri = path && origin + path
  _kc.login({ redirectUri })
}

const doLogout = (path?: string) => {
  const redirectUri = path && origin + path
  api
    .get('/login/logout')
    .then(() => _kc.login({ redirectUri, prompt: 'login' }))
    .catch(() => _kc.logout({ redirectUri }))
  sessionStorage.setItem('firstLogin', 'true')
  localStorage.removeItem('aTkn')
}

const isLogin = () => !!_kc.authenticated

const getToken = () => _kc.token

const updateToken = (cb: () => Boolean) =>
  _kc
    .updateToken(-1)
    .then(cb)
    .then(() => fnGetToken(getToken()))
    .catch(doLogout)

const getPToken = () => _kc.tokenParsed

const authKeycloak = {
  doLogin,
  doLogout,
  isLogin,
  getToken,
  updateToken,
  getPToken,
}

export default authKeycloak
