import { connectDB } from '@/lib/mongodb';
import Event from '@/database/event.model';
import { Booking } from '@/database/booking.model';

export default async function BookingsPage() {
   await connectDB();
   const bookings = await Booking.find().sort({ createdAt: -1 }).lean();
   const eventIds = [...new Set(bookings.map((booking) => String(booking.eventId)))];
   const events = eventIds.length > 0
      ? await Event.find({ _id: { $in: eventIds } }).select('title').lean()
      : [];
   const eventTitles = new Map<string, string>(
      events.map((event) => [String(event._id), event.title] as const)
   );

   return (
      <main className="mx-auto w-full max-w-6xl px-6 py-10">
         <h1 className="mb-6 text-3xl font-bold text-white">Bookings</h1>
         <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] border-collapse text-left text-sm">
               <thead>
                  <tr className="border-b border-gray-700 text-gray-300">
                     <th className="p-3">Attendee</th>
                     <th className="p-3">Email</th>
                     <th className="p-3">Event</th>
                     <th className="p-3">Booked at</th>
                  </tr>
               </thead>
               <tbody>
                  {bookings.map((booking) => (
                     <tr className="border-b border-gray-800" key={String(booking._id)}>
                        <td className="p-3 text-white">{booking.name}</td>
                        <td className="p-3 text-gray-200">{booking.email}</td>
                        <td className="p-3 text-gray-200">
                           {eventTitles.get(String(booking.eventId)) ?? 'Event no longer available'}
                        </td>
                        <td className="p-3 text-gray-200">
                           {new Date(booking.createdAt).toLocaleString()}
                        </td>
                     </tr>
                  ))}
                  {bookings.length === 0 && (
                     <tr>
                        <td className="p-3 text-gray-400" colSpan={4}>No bookings yet.</td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </main>
   );
}
