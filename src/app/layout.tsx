import type { Metadata } from 'next'
import './globals.css'
import Providers from '@/lib/provider'
import { Poppins } from 'next/font/google'
import { Suspense } from 'react'
import Loading from './loading'

export const metadata: Metadata = {
  title: 'Finest Control',
  description: 'Control your finances with ease',
}

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`${poppins.className} scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-dark-200 scrollbar-track-dark-400`}
    >
      <body className="bg-dark-400">
        <Suspense fallback={<Loading />}>
          <Providers>{children}</Providers>
        </Suspense>
      </body>
    </html>
  )
}
