import { getServerSession } from 'next-auth';
import { authOptions, isAdminEmail } from '@/lib/auth';

export async function requireAdminApi(): Promise<boolean> {
   const session = await getServerSession(authOptions);
   return isAdminEmail(session?.user?.email);
}
