import { SignUp } from '@clerk/nextjs'

export default function SignUpPage() {
  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white px-4 py-10">
      <SignUp
        routing="hash"
        signInUrl="/sign-in"
        fallbackRedirectUrl="/"
        forceRedirectUrl="/"
        appearance={{
          elements: {
            footer: 'hidden',
          },
        }}
      />
    </main>
  )
}
