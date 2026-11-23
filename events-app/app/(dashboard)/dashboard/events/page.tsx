import Link from 'next/link';
import CancelEventButton from '@/components/CancelEventButton';
import { getAllEventsForAdmin } from '@/lib/actions/event.actions';

export default async function EventManagementPage() {
   const events = await getAllEventsForAdmin();

   return (
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
         <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-3xl font-bold text-white">Events</h1>
            <Link
               className="rounded-md bg-white px-4 py-2 font-semibold text-black"
               href="/dashboard/events/create"
            >
               Create event
            </Link>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
               <thead>
                  <tr className="border-b border-gray-700 text-gray-300">
                     <th className="p-3">Event</th>
                     <th className="p-3">Date</th>
                     <th className="p-3">Bookings / capacity</th>
                     <th className="p-3">Status</th>
                     <th className="p-3">Actions</th>
                  </tr>
               </thead>
               <tbody>
                  {events.map((event) => (
                     <tr className="border-b border-gray-800" key={String(event._id)}>
                        <td className="p-3">
                           <p className="font-semibold text-white">{event.title}</p>
                           <p className="text-gray-400">{event.location}</p>
                        </td>
                        <td className="p-3 text-gray-200">{event.date} · {event.time}</td>
                        <td className="p-3 text-gray-200">
                           {event.bookingCount ?? 0}/{event.capacity ?? 100}
                        </td>
                        <td className="p-3 capitalize text-gray-200">{event.status ?? 'scheduled'}</td>
                        <td className="p-3">
                           <div className="flex items-center gap-4">
                              <Link
                                 className="text-blue-300 underline"
                                 href={`/dashboard/events/${encodeURIComponent(event.slug)}/edit`}
                              >
                                 Edit
                              </Link>
                              {event.status !== 'canceled' && (
                                 <CancelEventButton slug={event.slug} />
                              )}
                           </div>
                        </td>
                     </tr>
                  ))}
                  {events.length === 0 && (
                     <tr>
                        <td className="p-3 text-gray-400" colSpan={5}>No events found.</td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </main>
   );
}
