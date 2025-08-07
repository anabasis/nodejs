import { usePathname } from 'next/navigation'
import { useMenu } from 'library'

export const useMenuAuthority = () => {
  const pathname = usePathname()
  const { getPathInfo } = useMenu()

  const getUserAuthority = () => {
    const { crtYn, uptYn, delYn, redYn } = getPathInfo(pathname)

    return {
      read: redYn === 'Y',
      create: crtYn === 'Y',
      update: uptYn === 'Y',
      delete: delYn === 'Y',
    }
  }

  return {
    getUserAuthority,
  }
}
