export interface Event {
   id: number;
   title: string;
   image: string;
   date: string;
   time: string;
   location: string;
   description: string;
   category: 'conference' | 'hackathon' | 'meetup';
}

export interface EventSeed {
   title: string;
   description: string;
   overview: string;
   image: string;
   venue: string;
   location: string;
   date: string;
   time: string;
   capacity: number;
   mode: 'online' | 'offline' | 'hybrid';
   audience: string;
   agenda: string[];
   organizer: string;
   tags: string[];
}

export const events: Event[] = [
   {
      id: 1,
      title: 'React Summit 2026',
      image: '/images/event1.png',
      date: 'June 8-9, 2026',
      time: '9:00 AM',
      location: 'Amsterdam, Netherlands',
      description: 'The biggest React conference with talks from industry leaders and workshops.',
      category: 'conference',
   },
   {
      id: 2,
      title: 'Next.js Conf 2026',
      image: '/images/event2.png',
      date: 'October 26, 2026',
      time: '10:00 AM',
      location: 'San Francisco, CA',
      description: 'The official Next.js conference featuring new releases and best practices.',
      category: 'conference',
   },
   {
      id: 3,
      title: 'TechCrunch Disrupt 2026',
      image: '/images/event3.png',
      time: '8:30 AM',
      date: 'September 12-14, 2026',
      location: 'San Francisco, CA',
      description: 'The ultimate showcase for startups and innovations in tech.',
      category: 'conference',
   },
   {
      id: 4,
      title: 'HackMIT 2026',
      image: '/images/event4.png',
      time: '6:00 PM',
      date: 'April 17-19, 2026',
      location: 'Cambridge, MA',
      description: 'One of the largest hackathons featuring 3000+ developers and $50k+ in prizes.',
      category: 'hackathon',
   },
   {
      id: 5,
      title: 'MLOps Community Meetup',
      time: '6:30 PM',
      image: '/images/event5.png',
      date: 'April 2, 2026',
      location: 'New York, NY',
      description: 'Monthly meetup discussing machine learning operations and best practices.',
      category: 'meetup',
   },
   {
      id: 6,
      title: 'Web3 Summit 2026',
      time: '9:30 AM',
      image: '/images/event6.png',
      date: 'May 22-24, 2026',
      location: 'Berlin, Germany',
      description: 'The leading summit for blockchain, crypto, and decentralized technology.',
      category: 'conference',
   },
];

const eventSeedDetails: Record<number, Omit<EventSeed, 'title' | 'description' | 'overview' | 'image' | 'location'>> = {
   1: {
      venue: 'RAI Amsterdam',
      date: '2026-06-08',
      time: '09:00',
      capacity: 500,
      mode: 'offline',
      audience: 'React developers and frontend engineers',
      agenda: ['Opening keynote', 'React workshops', 'Community networking'],
      organizer: 'React Summit',
      tags: ['react', 'javascript', 'conference'],
   },
   2: {
      venue: 'Fort Mason Center',
      date: '2026-10-26',
      time: '10:00',
      capacity: 300,
      mode: 'offline',
      audience: 'Next.js developers and web platform teams',
      agenda: ['Product announcements', 'Technical talks', 'Developer workshops'],
      organizer: 'Vercel',
      tags: ['nextjs', 'react', 'conference'],
   },
   3: {
      venue: 'Moscone Center',
      date: '2026-09-12',
      time: '08:30',
      capacity: 400,
      mode: 'offline',
      audience: 'Startup founders, investors, and technology leaders',
      agenda: ['Startup pitches', 'Founder interviews', 'Technology showcases'],
      organizer: 'TechCrunch',
      tags: ['startups', 'technology', 'conference'],
   },
   4: {
      venue: 'Massachusetts Institute of Technology',
      date: '2026-04-17',
      time: '18:00',
      capacity: 500,
      mode: 'offline',
      audience: 'Students, developers, and aspiring founders',
      agenda: ['Team formation', 'Build sessions', 'Project demonstrations'],
      organizer: 'HackMIT',
      tags: ['hackathon', 'students', 'development'],
   },
   5: {
      venue: 'New York Tech Hub',
      date: '2026-04-02',
      time: '18:30',
      capacity: 100,
      mode: 'offline',
      audience: 'Machine learning engineers and MLOps practitioners',
      agenda: ['Community updates', 'MLOps case studies', 'Open discussion'],
      organizer: 'MLOps Community',
      tags: ['mlops', 'machine-learning', 'meetup'],
   },
   6: {
      venue: 'Estrel Berlin',
      date: '2026-05-22',
      time: '09:30',
      capacity: 350,
      mode: 'offline',
      audience: 'Web3 developers, researchers, and founders',
      agenda: ['Blockchain talks', 'Decentralized technology workshops', 'Networking'],
      organizer: 'Web3 Summit',
      tags: ['web3', 'blockchain', 'conference'],
   },
};

export const eventSeedData: EventSeed[] = events.map((event) => {
   const details = eventSeedDetails[event.id];

   if (!details) {
      throw new Error(`Missing database seed details for event ${event.id}`);
   }

   return {
      title: event.title,
      description: event.description,
      overview: event.description,
      image: event.image,
      location: event.location,
      ...details,
   };
});
