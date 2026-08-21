import { createAuthClient } from 'better-auth/react';
import { dodopaymentsClient } from '@dodopayments/better-auth';
import { polarClient } from '@polar-sh/better-auth';
import { lastLoginMethodClient } from 'better-auth/client/plugins';

const authClientOptions = {
  // Keep auth same-origin so v0 previews and deployed apps use their actual host.
  baseURL: typeof window === 'undefined' ? undefined : window.location.origin,
};

export const betterauthClient = createAuthClient({
  ...authClientOptions,
  plugins: [dodopaymentsClient()],
});

export const authClient = createAuthClient({
  ...authClientOptions,
  plugins: [polarClient(), lastLoginMethodClient()],
});

export const { signIn, signOut, signUp, useSession } = authClient;
