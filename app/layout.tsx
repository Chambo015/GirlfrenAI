import 'regenerator-runtime/runtime'
import { Metadata } from 'next'

import { Toaster } from 'react-hot-toast'

import '@/app/globals.css'
import { fontDaysOne, fontMono, fontSans } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'

export const metadata: Metadata = {
  title: {
    default: 'GIRLFREN.AI',
    template: `%s - GIRLFREN.AI`
  },
  description: 'An AI-powered chatbot with context support for your website.',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png'
  }
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'font-sans antialiased',
          fontSans.variable,
          fontMono.variable,
          fontDaysOne.variable
        )}
      >
        <Toaster />
        <Providers attribute="class" defaultTheme="system" enableSystem>
       
          <div className="flex min-h-full flex-col">
            <main className="border-1 flex flex-1 flex-col">{children}</main>
          </div>
          <TailwindIndicator />
        </Providers>
      </body>
    </html>
  )
}
