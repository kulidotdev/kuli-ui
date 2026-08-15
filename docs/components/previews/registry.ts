import * as React from 'react';
import { SignInEmailOnly } from '@/components/previews/signin/email-only';
import { SignInMultiMethod } from '@/components/previews/signin/multi-method';
import { SignInWithSocial } from '@/components/previews/signin/with-social';
import { SignInWithPasswordless } from '@/components/previews/signin/with-passwordless';
import { SignInLoading } from '@/components/previews/signin/loading';
import { SignInWithError } from '@/components/previews/signin/with-error';

export const previewRegistry: Record<string, React.ComponentType> = {
  'signin/email-only': SignInEmailOnly,
  'signin/multi-method': SignInMultiMethod,
  'signin/with-social': SignInWithSocial,
  'signin/with-passwordless': SignInWithPasswordless,
  'signin/loading': SignInLoading,
  'signin/with-error': SignInWithError,
};
