This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The public events homepage is in `app/(root)/page.tsx`; dashboard pages are in `app/(dashboard)/`.

## Environment Variables

Copy `.env.example` to `.env.local` and set the MongoDB, Cloudinary, and Auth.js values. Create a GitHub OAuth app with callback URL `http://localhost:3000/api/auth/callback/github`, then set `GITHUB_ID`, `GITHUB_SECRET`, `NEXTAUTH_SECRET`, and `ADMIN_EMAILS` (a comma-separated list of GitHub account email addresses). Set `NEXTAUTH_URL` to the deployed app URL in production. Cloudinary and auth credentials must remain server-only.

Run `npm run seed` to insert the starter events from `lib/constants.ts` into MongoDB. Existing matching events are left unchanged. The admin dashboard at `/dashboard/events` supports event editing and cancellation, and `/dashboard/bookings` lists attendee bookings. Event cards show bookings against capacity; capacity is informational and does not block additional bookings.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
