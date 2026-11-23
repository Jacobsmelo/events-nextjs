'use server';

import { connectDB } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { updateTag } from 'next/cache';
import { Booking } from '@/database/booking.model';
import Event from '@/database/event.model';

export const createBooking = async ({eventId, slug, email, name}: {
      eventId: string; 
      slug: string;
      email: string;
      name: string; 
   }) => {

   try {
      await connectDB();
      
      // Validate inputs
      if (!name || name.trim().length < 2) {
         throw new Error('Name must be at least 2 characters');
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
         throw new Error('Invalid email format');
      }
      if (!eventId || !slug) {
         throw new Error('Event ID and slug are required');
      }
      
      // Convert string eventId to MongoDB ObjectId
      let objectId: ObjectId;
      try {
         objectId = new ObjectId(eventId);
      } catch {
         throw new Error('Invalid event ID format');
      }

      const event = await Event.findOne({
         _id: objectId,
         slug: slug.toLowerCase().trim(),
      });
      if (!event) {
         throw new Error('Event not found');
      }
      if (event.status === 'canceled') {
         throw new Error('This event has been canceled');
      }

      await Booking.create({
         eventId: objectId,
         slug: event.slug,
         email: email.toLowerCase().trim(),
         name: name.trim(),
      });
      updateTag('events');

      return { success: true };
      
   } catch (error) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error('Error creating booking:', error);
      return { success: false, error: errorMessage };
   }




   }




