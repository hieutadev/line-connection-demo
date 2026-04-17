import { useAuthStore } from "@/store/auth-store";
import useSWR from "swr";

export interface UserProfile {
  userId: string;
  displayName: string;
  pictureUrl: string;
}

export default function useUserProfile() {
  const { headers } = useAuthStore();
  return useSWR("https://api.line.me/v2/profile", async (url) => {
    const res = await fetch(url, { headers });
    const result = (await res.json()) as UserProfile;
    return result;
  });
}
