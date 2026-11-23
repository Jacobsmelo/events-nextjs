'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { EventSeed } from '@/lib/constants';

type EditableEvent = EventSeed & { slug: string };

const fieldClassName = 'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-gray-900';
const labelClassName = 'mb-1 block font-medium text-gray-900';

export default function EventForm({ event }: { event?: EditableEvent }) {
   const router = useRouter();
   const [isSubmitting, setIsSubmitting] = useState(false);
   const [error, setError] = useState('');

   const handleSubmit = async (formEvent: FormEvent<HTMLFormElement>) => {
      formEvent.preventDefault();
      const form = formEvent.currentTarget;
      setIsSubmitting(true);
      setError('');

      const formData = new FormData(form);
      const agenda = String(formData.get('agenda') ?? '')
         .split('\n')
         .map((item) => item.trim())
         .filter(Boolean);
      const tags = String(formData.get('tags') ?? '')
         .split(',')
         .map((tag) => tag.trim())
         .filter(Boolean);

      formData.set('agenda', JSON.stringify(agenda));
      formData.set('tags', JSON.stringify(tags));

      try {
         const response = await fetch(
            event ? `/api/events/${encodeURIComponent(event.slug)}` : '/api/events',
            {
               method: event ? 'PATCH' : 'POST',
               body: formData,
            }
         );
         const result: { message?: string; error?: string } = await response.json();

         if (!response.ok) {
            throw new Error(result.error ?? result.message ?? 'Event save failed.');
         }

         router.push('/dashboard/events');
         router.refresh();
      } catch (submitError) {
         setError(submitError instanceof Error ? submitError.message : 'Event save failed.');
      } finally {
         setIsSubmitting(false);
      }
   };

   return (
      <main className="mx-auto max-w-3xl px-6 py-10">
         <h1 className="mb-2 text-3xl font-bold text-white">
            {event ? 'Edit event' : 'Create an event'}
         </h1>
         <p className="mb-8 text-gray-300">Manage event details, capacity, and poster.</p>

         <form onSubmit={handleSubmit} className="space-y-5">
            <div>
               <label className={labelClassName} htmlFor="title">Title</label>
               <input className={fieldClassName} id="title" name="title" required minLength={3} defaultValue={event?.title} />
            </div>

            <div>
               <label className={labelClassName} htmlFor="description">Description</label>
               <textarea className={fieldClassName} id="description" name="description" required rows={3} defaultValue={event?.description} />
            </div>

            <div>
               <label className={labelClassName} htmlFor="overview">Overview</label>
               <textarea className={fieldClassName} id="overview" name="overview" required rows={4} defaultValue={event?.overview} />
            </div>

            <div>
               <label className={labelClassName} htmlFor="image">Event poster</label>
               {event?.image && <p className="mb-2 break-all text-sm text-gray-400">Current poster: {event.image}</p>}
               <input
                  className={fieldClassName}
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  required={!event}
               />
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
               <div>
                  <label className={labelClassName} htmlFor="venue">Venue</label>
                  <input className={fieldClassName} id="venue" name="venue" required defaultValue={event?.venue} />
               </div>
               <div>
                  <label className={labelClassName} htmlFor="location">Location</label>
                  <input className={fieldClassName} id="location" name="location" required defaultValue={event?.location} />
               </div>
               <div>
                  <label className={labelClassName} htmlFor="date">Date</label>
                  <input className={fieldClassName} id="date" name="date" type="date" required defaultValue={event?.date} />
               </div>
               <div>
                  <label className={labelClassName} htmlFor="time">Time</label>
                  <input className={fieldClassName} id="time" name="time" type="time" required defaultValue={event?.time} />
               </div>
               <div>
                  <label className={labelClassName} htmlFor="capacity">Full capacity</label>
                  <input
                     className={fieldClassName}
                     id="capacity"
                     name="capacity"
                     type="number"
                     min={1}
                     step={1}
                     required
                     defaultValue={event?.capacity ?? 100}
                  />
               </div>
               <div>
                  <label className={labelClassName} htmlFor="mode">Mode</label>
                  <select className={fieldClassName} id="mode" name="mode" required defaultValue={event?.mode ?? 'offline'}>
                     <option value="offline">In person</option>
                     <option value="online">Online</option>
                     <option value="hybrid">Hybrid</option>
                  </select>
               </div>
               <div>
                  <label className={labelClassName} htmlFor="organizer">Organizer</label>
                  <input className={fieldClassName} id="organizer" name="organizer" required defaultValue={event?.organizer} />
               </div>
            </div>

            <div>
               <label className={labelClassName} htmlFor="audience">Target audience</label>
               <input className={fieldClassName} id="audience" name="audience" required defaultValue={event?.audience} />
            </div>

            <div>
               <label className={labelClassName} htmlFor="agenda">Agenda</label>
               <textarea
                  className={fieldClassName}
                  id="agenda"
                  name="agenda"
                  placeholder="Add one agenda item per line"
                  required
                  rows={4}
                  defaultValue={event?.agenda.join('\n')}
               />
            </div>

            <div>
               <label className={labelClassName} htmlFor="tags">Tags</label>
               <input
                  className={fieldClassName}
                  id="tags"
                  name="tags"
                  placeholder="react, javascript, meetup"
                  required
                  defaultValue={event?.tags.join(', ')}
               />
            </div>

            {error && <p className="text-sm text-red-400" role="alert">{error}</p>}

            <button
               className="rounded-md bg-white px-5 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-60"
               type="submit"
               disabled={isSubmitting}
            >
               {isSubmitting ? 'Saving event...' : event ? 'Save changes' : 'Create event'}
            </button>
         </form>
      </main>
   );
}
