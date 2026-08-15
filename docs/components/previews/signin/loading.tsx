'use client';

import { SignIn } from '@kuli-ui/components/components/auth/signin';

export function SignInLoading() {
  return (
    <SignIn onSubmit={() => {}} isLoading methods={['email']}>
      <SignIn.Header />
      <SignIn.Content>
        <SignIn.Form>
          <SignIn.IdentifierField />
          <SignIn.PasswordField />
          <SignIn.SubmitButton />
        </SignIn.Form>
      </SignIn.Content>
    </SignIn>
  );
}
