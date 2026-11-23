'use client';
import { useState, FormEvent } from 'react';
import { createBooking } from '@/lib/actions/bookings.actions';

const BookEvent = ({eventId, slug}: { eventId: string; slug: string; }) => {
   const [email, setEmail] = useState('');
   const [name, setName] = useState('');
   const [submitted, setSubmitted] = useState(false);
   const [error, setError] = useState('');


   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError('');
      
      // Client-side validation
      if (!email.trim()) {
         setError('Email is required');
         return;
      }
      if (!name.trim()) {
         setError('Name is required');
         return;
      }
      if (name.trim().length < 2) {
         setError('Name must be at least 2 characters');
         return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
         setError('Invalid email format');
         return;
      }
      
      try {
         const {success, error} = await createBooking({eventId, slug, email: email.trim(), name: name.trim()});

         if(success) {
            // Show success message after a delay
            setTimeout(() => {
               setSubmitted(true);
            }, 1000);
         } else {
            setError(error ?? 'Booking creation failed');
         }
      } catch (error) {
         console.error('Error submitting booking:', error);
         setError('Booking could not be completed. Please try again.');
      }
   }


   return (
      <div id="book-event">
         {submitted ? (
            <p> Thank you for signing up!</p>
         ): (
            <form onSubmit={handleSubmit} className="booking-form">
               <div>
               <label htmlFor="name">Name</label>
                  <input type="text" id="name" value={name} 
                     onChange={(e) => setName(e.target.value)} 
                     placeholder='Enter your name: ' />

                  <label htmlFor="email">Email Address</label>
                  <input type="email" id="email" value={email} 
                     onChange={(e) => setEmail(e.target.value)} 
                     placeholder='Enter your email address' />
               </div>

               {error && <p role="alert">{error}</p>}
               <button type="submit" className="button-submit">Submit</button>
            </form>
         )}
         
      </div>
   )
}

export default BookEvent
