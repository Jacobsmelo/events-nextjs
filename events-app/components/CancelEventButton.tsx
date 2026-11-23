'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CancelEventButton({ slug }: { slug: string }) {
   const router = useRouter();
   const [isCanceling, setIsCanceling] = useState(false);
   const [error, setError] = useState('');

   const cancelEvent = async () => {
      if (!window.confirm('Cancel this event? Existing bookings will be kept.')) return;

      setIsCanceling(true);
      setError('');

      try {
         const response = await fetch(`/api/events/${encodeURIComponent(slug)}`, {
            method: 'DELETE',
         });
         const result: { error?: string } = await response.json();

         if (!response.ok) {
            throw new Error(result.error ?? 'Event cancellation failed.');
         }

         router.refresh();
      } catch (cancelError) {
         setError(cancelError instanceof Error ? cancelError.message : 'Event cancellation failed.');
      } finally {
         setIsCanceling(false);
      }
   };

   return (
      <div>
         <button
            className="text-red-400 underline disabled:opacity-50"
            type="button"
            disabled={isCanceling}
            onClick={cancelEvent}
         >
            {isCanceling ? 'Canceling…' : 'Cancel'}
         </button>
         {error && <p className="mt-1 text-xs text-red-400" role="alert">{error}</p>}
      </div>
   );
}
