'use client';

import { useState } from 'react';
import { SignUp, SignupSuccessView } from '@kuli-ui/components/components/auth/signup';

export function SignUpBasic() {
  const [success, setSuccess] = useState(false);

  if (success) return <SignupSuccessView redirectUrl="#" />;

  return (
    <SignUp
      onSubmit={async (values) => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setSuccess(true);
      }}
    >
      <SignUp.Header />
      <SignUp.Content>
        <SignUp.Form>
          <SignUp.NameField />
          <SignUp.EmailField />
          <SignUp.PasswordField />
          <SignUp.SubmitButton />
        </SignUp.Form>
      </SignUp.Content>
      <SignUp.Footer signinPath="#" />
    </SignUp>
  );
}
