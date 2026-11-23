import type { NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

export function isAdminEmail(email: string | null | undefined): boolean {
   if (!email) return false;

   const adminEmails = (process.env.ADMIN_EMAILS ?? '')
      .split(',')
      .map((adminEmail) => adminEmail.trim().toLowerCase())
      .filter(Boolean);

   return adminEmails.includes(email.trim().toLowerCase());
}

export const authOptions: NextAuthOptions = {
   providers: [
      GitHubProvider({
         clientId: process.env.GITHUB_ID ?? '',
         clientSecret: process.env.GITHUB_SECRET ?? '',
      }),
   ],
   secret: process.env.NEXTAUTH_SECRET,
   session: { strategy: 'jwt' },
   pages: { signIn: '/login' },
   callbacks: {
      async signIn({ user }) {
         return isAdminEmail(user.email);
      },
   },
};
