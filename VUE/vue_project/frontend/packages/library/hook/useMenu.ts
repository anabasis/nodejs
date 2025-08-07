import { atom, useAtom } from 'jotai'
import { debounce as _debounce, groupBy as _groupBy, startsWith as _startsWith } from 'lodash-es'
import { getGnbMenuList, getLnbMenuList, MenuItemType, getIsAdmin } from '../util'

type TypeMenuData = {
  menuGnb: MenuItemType[]
  menuLnb: MenuItemType[]
}

export type TypePathInfo = {
  mnuName?: string
  mnuUrl?: string
  mnuIcon?: string
  redYn?: string
  uptYn?: string
  crtYn?: string
  delYn?: string
}

const getInitialMenuData = _debounce(
  async (): Promise<TypeMenuData> => {
    const menuGnb = await getGnbMenuList(getIsAdmin())
    const menuLnb = await getLnbMenuList(getIsAdmin())

    return { menuGnb, menuLnb }
  },
  1e3,
  { leading: true }
)

const menuAtom = atom<TypeMenuData | null>(null)

export const useMenu = () => {
  const [menuData, setMenuData] = useAtom(menuAtom)

  const updateMenuAtom = async () => {
    try {
      // @ts-ignore
      setMenuData(await getInitialMenuData())
    } catch (error) {
      console.error('Failed : ', error)
    }
  }

  if (!menuData) updateMenuAtom()

  const getGnb: MenuItemType[] | null = menuData?.menuGnb || null
  const getLnb: MenuItemType[] | null = menuData?.menuLnb || null

  const convertPathNotation = (tempItem: MenuItemType, isGnb: boolean = true): TypePathInfo => ({
    mnuName: tempItem.mnuName,
    mnuUrl: tempItem.mnuUrl,
    mnuIcon: isGnb ? tempItem.dftIcon ?? '' : tempItem.hovIcon ?? '',
    redYn: tempItem.redYn,
    uptYn: tempItem.uptYn,
    crtYn: tempItem.crtYn,
    delYn: tempItem.delYn,
  })

  const convertMenuToPath = () => {
    if (!getGnb || !getLnb) return

    const groupItems = _groupBy(getLnb, 'parentsMnuNum')
    const depth1 = groupItems[1]

    const getLnbPaths = depth1.map((v) => convertPathNotation(v, false))
    const getGnbPaths = getGnb.map((v) => convertPathNotation(v))

    return [...getLnbPaths, ...getGnbPaths]
  }

  const paths = convertMenuToPath()

  const sliceSlash = (str: string) => (str.length > 1 ? str.replace(/\/$/, '') : str)
  const countSlashes = (path?: string) => path?.match(/\//g)?.length ?? 0

  const getPathInfo = (path?: string): TypePathInfo => {
    const _path = path || location.pathname
    const result = paths?.filter((v) =>
      countSlashes(sliceSlash(_path)) >= countSlashes(v.mnuUrl) && !!v.mnuUrl && v.mnuUrl !== '/' ? _startsWith(_path, v.mnuUrl) : _path === v.mnuUrl
    )
    return (result && result.length > 0 && result[0]) || {}
  }

  return {
    getGnb,
    getLnb,
    updateMenuAtom,
    getPathInfo,
  }
}
