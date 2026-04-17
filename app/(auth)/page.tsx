"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useUserProfile from "@/hooks/useUserProfile";
import { signOut } from "@/lib/auth-client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function Home() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { data, isLoading } = useUserProfile();

  const handleSignOut = () => {
    startTransition(async () => {
      await signOut();
      setTimeout(() => router.replace("/sign-in"));
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-6">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm flex flex-col items-center gap-3">
        <Avatar className="size-20">
          <AvatarImage src={data?.pictureUrl} alt={data?.userId} />
          <AvatarFallback>{data?.displayName.substring(0, 1)}</AvatarFallback>
        </Avatar>
        <span className="text-xs text-gray-600">
          {isLoading ? "Loading..." : data?.userId}
        </span>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 ">
          Welcome, {isLoading ? "..." : data?.displayName}
        </h1>
        <Link href="/settings" className="w-full">
          <Button className="w-full">Setting</Button>
        </Link>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleSignOut}
          disabled={isPending}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
