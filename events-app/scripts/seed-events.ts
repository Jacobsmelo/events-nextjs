import { loadEnvConfig } from '@next/env';
import Event from '../database/event.model';
import { disconnectDB, connectDB } from '../lib/mongodb';
import { eventSeedData } from '../lib/constants';

loadEnvConfig(process.cwd());

const createSlug = (title: string) =>
   title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

async function seedEvents() {
   try {
      await connectDB();

      let created = 0;
      let skipped = 0;

      for (const event of eventSeedData) {
         const slug = createSlug(event.title);
         const existingEvent = await Event.exists({ slug });

         if (existingEvent) {
            skipped += 1;
            continue;
         }

         await Event.create({ ...event, slug });
         created += 1;
      }

      console.log(`Seed complete: created ${created} events, skipped ${skipped} existing events.`);
   } finally {
      await disconnectDB();
   }
}

seedEvents().catch((error: unknown) => {
   console.error('Failed to seed events:', error);
   process.exitCode = 1;
});
