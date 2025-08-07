import { useMenuAuthority } from '@hook/useMenuAuthority'
import { useRouter } from 'next/navigation'
import { Breadcrumb, ButtonMui, ContentBox } from 'ui'

export default function MenuListHeader({ isAdmin, pageTitleList }: { isAdmin: boolean; pageTitleList: string[] }) {
  const router = useRouter()
  const { getUserAuthority } = useMenuAuthority()
  const { update, create } = getUserAuthority()

  return (
    <ContentBox type="top_content">
      <div className="lft">
        <Breadcrumb pageTitleList={pageTitleList} />
        <h1 className="headline1">{!!isAdmin ? `Admin Menu` : `User Menu`}</h1>
      </div>
      <div className="rgt">
        <ButtonMui size="large" color="secondary" onClick={() => router.push('manage')} icon="SettingIcon" disabled={!update}>
          Manage
        </ButtonMui>
        <ButtonMui size="large" onClick={() => router.push('add')} icon="PlusIcon" disabled={!create}>
          Add
        </ButtonMui>
      </div>
    </ContentBox>
  )
}
