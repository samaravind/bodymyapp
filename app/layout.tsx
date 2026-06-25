import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import AccountSessionSync from './account-session-sync'
import SiteFooter from './site-footer'
import LenisProvider from '@/components/lenis-provider'
import 'lenis/dist/lenis.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'MyTrine AI | Personalized AI Fitness Coach',
  description:
    'MyTrine AI creates personalized workout, nutrition, budget, habit, and progress plans for complete body transformation.',
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
          <LenisProvider>
            <AccountSessionSync />
            {children}
            <SiteFooter />
          </LenisProvider>
        </ClerkProvider>
      </body>
    </html>
  )
}
