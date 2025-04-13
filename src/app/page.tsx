"use client";

import { useSession } from "next-auth/react";
import { LogoutButton } from "@/components/auth/logout-button";
import { signIn } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default function Home() {
  const { data: session } = useSession();
  const [likes, setLikes] = useState<number | null>(null);
  const [showBio, setShowBio] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLikes(0);
    setShowBio(false);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-4xl mx-auto">
        {session ? (
          <>
            <Card className="p-6">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="relative w-32 h-32 rounded-full overflow-hidden bg-gray-100">
                  {session.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Image
                      src="/window.svg"
                      alt="Default Profile"
                      fill
                      className="object-cover p-4"
                    />
                  )}
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h1 className="text-3xl font-bold mb-2">
                    Welcome back, {session.user?.name}!
                  </h1>
                  <p className="text-gray-600 mb-4">{session.user?.email}</p>
                  <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                    <Button
                      variant="outline"
                      onClick={() => setShowBio(!showBio)}
                    >
                      {showBio ? "Hide Bio" : "Show Bio"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setLikes((prev) => (prev ?? 0) + 1)}
                    >
                      👍 {likes} Likes
                    </Button>
                    <LogoutButton />
                  </div>
                </div>
              </div>
              {showBio && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold mb-2">About Me</h3>
                  <p className="text-gray-600">
                    This is where your bio would go! You&apos;re currently
                    signed in with {session.user?.email}. Feel free to explore
                    the features of this demo application.
                  </p>
                </div>
              )}
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Activity Stats</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Profile Views</span>
                    <span className="font-medium">127</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Days Active</span>
                    <span className="font-medium">15</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Login</span>
                    <span className="font-medium">Just now</span>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full">
                    Edit Profile
                  </Button>
                  <Button variant="outline" className="w-full">
                    Settings
                  </Button>
                  <Button variant="outline" className="w-full">
                    Notifications
                  </Button>
                  <Button variant="outline" className="w-full">
                    Help
                  </Button>
                </div>
              </Card>
            </div>
          </>
        ) : (
          <div className="flex min-h-screen flex-col items-center justify-start p-4 md:p-24">
            <Card className="w-full max-w-md mx-auto shadow-lg">
              <CardContent className="p-6 space-y-6">
                <Card className="text-center">
                  <CardHeader>
                    <CardTitle className="text-3xl">Welcome Back</CardTitle>
                    <CardDescription className="mt-2">
                      Sign in to your account
                    </CardDescription>
                  </CardHeader>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sign In</CardTitle>
                    <CardDescription>
                      Choose your preferred sign in method
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => signIn("github", { callbackUrl: "/" })}
                    >
                      <Github className="mr-2 h-4 w-4" />
                      Continue with Github
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={() => signIn("google", { callbackUrl: "/" })}
                    >
                      <Image
                        src="/google.svg"
                        alt="google"
                        className="mr-2 h-4 w-4"
                        width={24}
                        height={24}
                      />
                      Continue with Google
                    </Button>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
