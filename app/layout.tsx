import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import AccountSessionSync from './account-session-sync'
import SiteFooter from './site-footer'
import './globals.css'

export const metadata: Metadata = {
  title: 'TransformX - AI Fitness and Body Transformation App',
  description:
    'Premium AI-powered fitness and body transformation app with body analysis, personalized workouts, diet charts, food ordering assist, budget planning, daily tracking, and before-after reports.',
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
