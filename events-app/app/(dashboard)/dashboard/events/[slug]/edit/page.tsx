import { notFound } from 'next/navigation';
import EventForm from '@/components/EventForm';
import { getEvent } from '@/lib/actions/event.actions';

export default async function EditEventPage({
   params,
}: {
   params: Promise<{ slug: string }>;
}) {
   const { slug } = await params;
   const event = await getEvent(slug);

   if (!event) notFound();

   return (
      <EventForm
         event={{
            title: event.title,
            description: event.description,
            overview: event.overview,
            image: event.image,
            venue: event.venue,
            location: event.location,
            date: event.date,
            time: event.time,
            capacity: event.capacity,
            mode: event.mode,
            audience: event.audience,
            agenda: event.agenda,
            organizer: event.organizer,
            tags: event.tags,
            slug: event.slug,
         }}
      />
   );
}
