"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function LoginButton() {
  const router = useRouter();

  return <Button onClick={() => router.push("/signin")}>Sign In</Button>;
}
