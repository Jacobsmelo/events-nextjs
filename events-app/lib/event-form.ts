export class EventFormError extends Error {
   constructor(message: string) {
      super(message);
      this.name = 'EventFormError';
   }
}

export function parseEventFormData(formData: FormData) {
   const requiredString = (name: string) => {
      const value = formData.get(name);
      if (typeof value !== 'string' || !value.trim()) {
         throw new EventFormError(`${name} is required.`);
      }
      return value.trim();
   };

   const stringArray = (name: string) => {
      const value = requiredString(name);
      let parsed: unknown;

      try {
         parsed = JSON.parse(value);
      } catch {
         throw new EventFormError(`${name} must be a JSON array.`);
      }

      if (!Array.isArray(parsed) || !parsed.every((item) => typeof item === 'string')) {
         throw new EventFormError(`${name} must contain a list of strings.`);
      }

      const items = parsed.map((item: string) => item.trim()).filter(Boolean);
      if (items.length === 0) {
         throw new EventFormError(`${name} must contain at least one item.`);
      }

      return items;
   };

   const capacity = Number(requiredString('capacity'));
   if (!Number.isSafeInteger(capacity) || capacity < 1) {
      throw new EventFormError('Capacity must be a positive whole number.');
   }

   const modeValue = requiredString('mode');
   let mode: 'online' | 'offline' | 'hybrid';
   switch (modeValue) {
      case 'online':
      case 'offline':
      case 'hybrid':
         mode = modeValue;
         break;
      default:
         throw new EventFormError('Mode must be online, offline, or hybrid.');
   }

   return {
      title: requiredString('title'),
      description: requiredString('description'),
      overview: requiredString('overview'),
      venue: requiredString('venue'),
      location: requiredString('location'),
      date: requiredString('date'),
      time: requiredString('time'),
      mode,
      audience: requiredString('audience'),
      agenda: stringArray('agenda'),
      organizer: requiredString('organizer'),
      tags: stringArray('tags'),
      capacity,
   };
}

export function getEventImageFile(formData: FormData): File | null {
   const image = formData.get('image');
   return image instanceof File && image.name && image.size > 0 ? image : null;
}
