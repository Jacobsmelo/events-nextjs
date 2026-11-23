import {NextResponse, NextRequest} from "next/server";
import { revalidateTag } from 'next/cache';
import connectDB from "@/lib/mongodb";
import Event from '@/database/event.model';
import { CloudinaryConfigurationError, uploadEventImage } from '@/lib/cloudinary';
import { getEventImageFile, parseEventFormData, EventFormError } from '@/lib/event-form';
import { requireAdminApi } from '@/lib/require-admin';

export async function POST(req : NextRequest) {
   try {
      if (!await requireAdminApi()) {
         return NextResponse.json({ message: 'Admin access required' }, { status: 401 });
      }

      await connectDB();

      const formData = await req.formData();
      const event = parseEventFormData(formData);
      const imgfile = getEventImageFile(formData);
      if (!imgfile) {
         return NextResponse.json({ message: 'Image file is required' }, { status: 400 });
      }

      const arrayBuffer = await imgfile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const image = await uploadEventImage(buffer);

      const createdEvent = await Event.create({
         ...event,
         image,
      });
      revalidateTag('events', 'max');
      return NextResponse.json({message: "Event Created Successfully", event: createdEvent}, {status: 201});

   } catch (error) {
      console.error("Error creating event:", error);
            
      const isInputError = error instanceof EventFormError;
      const isValidationError = error instanceof Error && error.name === 'ValidationError';
      const isCloudinaryConfigurationError = error instanceof CloudinaryConfigurationError;
      const status = isInputError || isValidationError
         ? 400
         : isCloudinaryConfigurationError
            ? 503
            : 500;

      return NextResponse.json({
         message: "Event Creation Failed",
         error: isInputError || isValidationError || isCloudinaryConfigurationError
            ? error.message
            : "An unexpected error occurred"
      }, { 
         status }
      );   
   }
}

export async function GET() {
   try{
      await connectDB();

      const events = await Event.find({ status: { $ne: 'canceled' } })
         .select('title image slug location date time capacity status')
         .sort({ createdAt: -1})
         .lean();

      return NextResponse.json({message: 'Events fetched successfully', events}, {status: 200});
   } catch (e) {
      console.error('Error fetching events:', e);
      return NextResponse.json({message: 'Event fetching failed'}, {status: 500});
   }}
