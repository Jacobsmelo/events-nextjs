'use server';

import { Booking } from '@/database/booking.model';
import Event from '@/database/event.model';
import { connectDB } from '@/lib/mongodb';
import { requireAdminApi } from '@/lib/require-admin';

async function addBookingCounts<T extends { _id: unknown; capacity?: number; status?: string }>(
   events: T[]
) {
   if (events.length === 0) return [];

   const counts = await Booking.aggregate([
      { $match: { eventId: { $in: events.map((event) => event._id) } } },
      { $group: { _id: '$eventId', count: { $sum: 1 } } },
   ]);
   const countsByEventId = new Map<string, number>(
      counts.map((entry) => [String(entry._id), entry.count as number] as const)
   );

   return events.map((event) => ({
      ...event,
      bookingCount: countsByEventId.get(String(event._id)) ?? 0,
      capacity: event.capacity ?? 100,
      status: event.status ?? 'scheduled',
   }));
}

export const getAllEvents = async () => {
   try {
      await connectDB();
      const events = await Event.find({ status: { $ne: 'canceled' } })
         .sort({ createdAt: -1 })
         .lean();

      return await addBookingCounts(events);
   } catch (error) {
      console.error('Error fetching events:', error);
      return [];
   }
};

export const getAllEventsForAdmin = async () => {
   if (!await requireAdminApi()) {
      throw new Error('Admin access required');
   }

   await connectDB();
   const events = await Event.find().sort({ createdAt: -1 }).lean();
   return addBookingCounts(events);
};

export const getEvent = async (slug: string) => {
   try {
      await connectDB();

      const event = await Event.findOne({ slug }).lean();
      if (!event) return null;

      const bookingCount = await Booking.countDocuments({ eventId: event._id });
      return {
         ...event,
         bookingCount,
         capacity: event.capacity ?? 100,
         status: event.status ?? 'scheduled',
      };
   } catch (error) {
      console.error('Error fetching event:', error);
      return null;
   }
};

export const getSimilarEventsBySlug = async (slug: string) => {
   try {
      const event = await getEvent(slug);
      if (!event) return [];

      const similarEvents = await Event.find({
         _id: { $ne: event._id },
         status: { $ne: 'canceled' },
         tags: { $in: event.tags },
      }).lean();

      return await addBookingCounts(similarEvents);
   } catch (error) {
      console.error('Error fetching similar events:', error);
      return [];
   }
};
