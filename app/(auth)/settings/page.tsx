'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  return (
    <div className="w-full max-w-3xl mx-auto bg-gray-50 h-screen p-5">
      <Button onClick={router.back}>Back</Button>
    </div>
  )
}