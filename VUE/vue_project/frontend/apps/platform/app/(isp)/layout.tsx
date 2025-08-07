import WrapAuth from 'ui/components/auth/WrapAuth'
import UserLayout from 'ui/layouts/UserLayout'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <WrapAuth isRoot={true}>
      <UserLayout>{children}</UserLayout>
    </WrapAuth>
  )
}
