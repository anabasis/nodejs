import 'ui/styles/global.scss'
import CommonProvider from 'ui/CommonProvider'

export const metadata = {
  title: 'Seegene OneSystem',
  description: 'Seegene OneSystem',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <CommonProvider>{children}</CommonProvider>
      </body>
    </html>
  )
}
