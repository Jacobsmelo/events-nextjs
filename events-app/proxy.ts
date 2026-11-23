import { withAuth } from 'next-auth/middleware';
import { isAdminEmail } from './lib/auth';

export default withAuth({
   pages: { signIn: '/login' },
   callbacks: {
      authorized({ token }) {
         return isAdminEmail(typeof token?.email === 'string' ? token.email : undefined);
      },
   },
});

export const config = {
   matcher: ['/dashboard/:path*'],
};
