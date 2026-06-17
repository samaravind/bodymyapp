import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import AccountSessionSync from './account-session-sync'
import SiteFooter from './site-footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'MyTrine - AI Health Companion',
  description: 'Your personal AI health consultation assistant',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClerkProvider
          signInUrl="/sign-in"
          signUpUrl="/sign-up"
          afterSignOutUrl="/"
          afterMultiSessionSingleSignOutUrl="/"
        >
          <AccountSessionSync />
          {children}
          <SiteFooter />
        </ClerkProvider>
      </body>
    </html>
  )
}
