import React from 'react'
import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions, isAdminEmail } from '@/lib/auth';
import "./dash.css"

export const instant = false;

const layout = async ({ children }: { children: React.ReactNode }) => {
   const session = await getServerSession(authOptions);

   if (!isAdminEmail(session?.user?.email)) {
      redirect('/login');
   }

   return (
      <div>
         <nav aria-label="Dashboard" className="flex flex-wrap gap-6 border-b border-gray-700 px-6 py-4">
            <Link href="/dashboard/events" className="font-semibold text-white">Events</Link>
            <Link href="/dashboard/events/create" className="font-semibold text-white">Create event</Link>
            <Link href="/dashboard/bookings" className="font-semibold text-white">Bookings</Link>
            <Link href="/api/auth/signout" className="ml-auto text-gray-300">Sign out</Link>
         </nav>
         {children}
      </div>
   )
}

export default layout
