import GitHubSignInButton from '@/components/GitHubSignInButton';

export default function LoginPage() {
   return (
      <main className="mx-auto flex min-h-72 max-w-lg flex-col items-center justify-center gap-6 px-6 py-10">
         <h1 className="text-center text-3xl font-bold">Admin sign in</h1>
         <p className="text-center text-gray-300">
            Sign in with an allowlisted GitHub account to access the dashboard.
         </p>
         <GitHubSignInButton />
      </main>
   );
}
