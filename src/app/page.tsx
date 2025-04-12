"use client";

import { useSession } from "next-auth/react";
import { LogoutButton } from "@/components/auth/logout-button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SignupForm } from "@/components/signup-form";
import { LoginForm } from "@/components/login-form";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: session } = useSession();
  const [likes, setLikes] = useState(0);
  const [showBio, setShowBio] = useState(false);
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "login";

  return (
    <div className="min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-4xl mx-auto space-y-8">
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
                      onClick={() => setLikes((prev) => prev + 1)}
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
          <div className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24">
            <div className="w-full max-w-md mx-auto space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight">
                  Welcome Back
                </h1>
                <p className="text-muted-foreground mt-2">
                  Sign up or log in to your account
                </p>
              </div>

              <Tabs defaultValue={defaultTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Login</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                  <Card>
                    <CardHeader>
                      <CardTitle>Login</CardTitle>
                      <CardDescription>
                        Enter your credentials to access your account
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <LoginForm />
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-4">
                      <div className="text-sm text-muted-foreground text-center">
                        <Link
                          href="/forgot-password"
                          className="text-primary underline-offset-4 hover:underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="signup">
                  <Card>
                    <CardHeader>
                      <CardTitle>Create an account</CardTitle>
                      <CardDescription>
                        Enter your details to create a new account
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <SignupForm />
                    </CardContent>
                    <CardFooter className="text-sm text-muted-foreground text-center">
                      By creating an account, you agree to our{" "}
                      <Link
                        href="/terms"
                        className="text-primary underline-offset-4 hover:underline"
                      >
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy"
                        className="text-primary underline-offset-4 hover:underline"
                      >
                        Privacy Policy
                      </Link>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
