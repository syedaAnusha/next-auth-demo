import { auth } from "@/auth";
import { LoginButton } from "@/components/auth/login-button";
import { LogoutButton } from "@/components/auth/logout-button";

export default async function Home() {
  const session = await auth();

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {session ? (
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold">Welcome, {session.user?.name}!</h1>
          <LogoutButton />
        </div>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-2xl font-bold">Welcome to NextAuth Demo</h1>
          <LoginButton />
        </div>
      )}
    </div>
  );
}
