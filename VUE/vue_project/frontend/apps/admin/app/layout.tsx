import 'ui/styles/global.scss'
import CommonProvider from 'ui/CommonProvider'
import WrapAuth from 'ui/components/auth/WrapAuth'
import UserLayout from 'ui/layouts/UserLayout'

export const metadata = {
  title: 'Admin - Seegene OneSystem',
  description: 'Admin - Seegene OneSystem',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <CommonProvider>
          <WrapAuth isAdmin={true}>
            <UserLayout>{children}</UserLayout>
          </WrapAuth>
        </CommonProvider>
      </body>
    </html>
  )
}
