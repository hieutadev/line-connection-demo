"use client";

import { Button } from "@/components/ui/button";
import { signInWithLINE } from "@/lib/auth-client";
import { useTransition } from "react";

function LineIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596l1.524 1.924c.232.293.178.715-.115.948a.669.669 0 0 1-.945-.115l-1.964-2.476H12.41v2.351a.636.636 0 0 1-.631.629.635.635 0 0 1-.631-.629V8.108c0-.345.283-.63.631-.63h2.436c1.274 0 2.311 1.037 2.311 2.308 0 1.037-.684 1.914-1.626 2.204v.031c.004.001.007.003.011.003l.029.007v.001zm-2.436-3.884v2.626h1.805c.725 0 1.314-.589 1.314-1.313 0-.724-.589-1.313-1.314-1.313h-1.805zm-3.154 6.751a.635.635 0 0 1-.631-.629V8.108c0-.345.282-.63.631-.63.348 0 .63.285.63.63v6.899a.635.635 0 0 1-.63.629zm-2.133-5.491H6.507v4.862a.636.636 0 0 1-.631.629.635.635 0 0 1-.632-.629V8.108c0-.345.283-.63.632-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H6.507v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629z" />
      <path d="M12 2C6.477 2 2 5.99 2 10.97c0 2.96 1.578 5.584 4.013 7.257-.176.634-.646 2.316-.739 2.67-.115.447.164.441.346.321.144-.095 2.256-1.536 3.159-2.151.928.258 1.907.402 2.92.402h.003c.002 0 .003 0 .005 0 5.523 0 10-3.99 10-8.97C22 5.99 17.523 2 12.003 2H12z" />
    </svg>
  );
}

export default function SignInPage() {
  const [isPending, startTransition] = useTransition();

  const handleSignIn = () =>
    startTransition(async () => {
      await signInWithLINE();
    });

  return (
    <div className="flex min-h-full flex-1 flex-col items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-zinc-950">
      <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#06C755]">
            <LineIcon className="h-8 w-8 text-white" />
          </div>

          <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Sign in to your account to continue
          </p>
        </div>

        <div className="mt-8">
          <Button
            onClick={handleSignIn}
            disabled={isPending}
            className="h-11 w-full gap-2 rounded-lg bg-[#06C755] text-white hover:bg-[#05b34d] focus-visible:ring-[#06C755] dark:bg-[#06C755] dark:hover:bg-[#05b34d]"
          >
            <LineIcon className="h-5 w-5" />
            {isPending ? "Signing in..." : "Sign in with LINE"}
          </Button>
        </div>

        <p className="mt-6 text-center text-xs text-zinc-400 dark:text-zinc-500">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
}