"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import useBotConnectionStatus from "@/hooks/useBotConnectionStatus";
import useBotInfo from "@/hooks/useBotInfo";
import useUserProfile from "@/hooks/useUserProfile";
import { signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactQRCode } from "@lglab/react-qr-code";
import { useTransition } from "react";

export default function Home() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { data, isLoading } = useUserProfile();
  const {
    data: status,
    mutate: mutateStatus,
    isLoading: isLoadingStatus,
  } = useBotConnectionStatus(data?.userId);
  const { data: botInfo } = useBotInfo();

  const handleSignOut = () => {
    startTransition(async () => {
      await signOut();
      setTimeout(() => router.replace("/sign-in"));
    });
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 p-6 gap-6">
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
      {botInfo && (
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm flex items-center gap-3">
          <ReactQRCode
            value={`https://line.me/R/ti/p/${botInfo.basicId}`}
            size={80}
            level="L"
            minVersion={1}
            marginSize={1}
            dataModulesSettings={{ style: "square-sm" }}
            finderPatternOuterSettings={{ style: "rounded-sm" }}
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-1 mb-1">
              <Avatar className="size-10">
                <AvatarImage src={botInfo.pictureUrl} alt={botInfo.basicId} />
                <AvatarFallback>
                  {botInfo.displayName.substring(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <div className="flex gap-0.5 items-center">
                  <span>{botInfo.displayName}</span>
                  <Badge
                    className={
                      status
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }
                  >
                    {status ? "Connected" : "Not connected"}
                  </Badge>
                  <Button
                    className="size-5"
                    variant="ghost"
                    disabled={!status}
                    onClick={() => mutateStatus()}
                  >
                    <RefreshCcw
                      className={cn(
                        "size-3",
                        isLoadingStatus && "animate-spin",
                      )}
                    />
                  </Button>
                </div>
                <span className="text-xs text-gray-500">{botInfo.basicId}</span>
              </div>
            </div>
            <span className="text-sm text-gray-600">
              Add the bot as a friend
            </span>
            <a
              href={`https://line.me/R/ti/p/${botInfo.basicId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:underline"
            >
              {`https://line.me/R/ti/p/${botInfo.basicId}`}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
