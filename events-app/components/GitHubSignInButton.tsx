'use client';

import { signIn } from 'next-auth/react';

export default function GitHubSignInButton() {
   return (
      <button
         className="rounded-md bg-white px-5 py-3 font-semibold text-black"
         onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
         type="button"
      >
         Sign in with GitHub
      </button>
   );
}
