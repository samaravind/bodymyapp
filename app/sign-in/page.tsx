import { SignIn } from '@clerk/nextjs'

export default async function SignInPage({
  searchParams,
}: {
  searchParams?: Promise<{ email?: string }>
}) {
  const email = (await searchParams)?.email

  return (
    <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-white px-4 py-10">
      <SignIn
        routing="hash"
        signUpUrl="/sign-up"
        withSignUp
        fallbackRedirectUrl="/"
        forceRedirectUrl="/"
        initialValues={email ? { emailAddress: email } : undefined}
        appearance={{
          elements: {
            footer: 'hidden',
          },
        }}
      />
    </main>
  )
}
