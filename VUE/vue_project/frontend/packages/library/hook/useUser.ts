import { atom, useAtom } from 'jotai'
import { debounce as _debounce } from 'lodash-es'
import { api, getCdnFileUrl } from '../util'
import { TypeUserData, TypeUserInfo, TypeUserRole, TypeAdminRole } from '../type/user'

const getInitialUserData = _debounce(
  async (): Promise<TypeUserData> => {
    const { data } = await api.get('/common/login-user/detail')
    const { userInfo, userRolInfo: userRole, adminRolList: adminRole } = data

    const src = userInfo.fileInfoPrvResponse?.preSignedUrl ?? ''
    delete userInfo.fileInfoPrvResponse
    userInfo.prflUrl = src

    return { userInfo, userRole, adminRole }
  },
  1e3,
  { leading: true }
)

const userAtom = atom<TypeUserData | null>(null)

export const useUser = () => {
  const [userData, setUserData] = useAtom(userAtom)

  const updateUserAtom = async () => {
    try {
      // @ts-ignore
      setUserData(await getInitialUserData())
    } catch (error) {
      console.error('Failed : ', error)
    }
  }

  if (!userData) updateUserAtom()

  const userInfo: TypeUserInfo | null = userData?.userInfo || null
  const userRole: TypeUserRole | null = userData?.userRole || null
  const adminRole: TypeAdminRole[] | null = userData?.adminRole || null

  return {
    userData,
    userInfo,
    userRole,
    adminRole,
    updateUserAtom,
  }
}
