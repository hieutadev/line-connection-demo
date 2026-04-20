import useSWR from "swr";

export default function useBotConnectionStatus(userId ?: string) {
  // const { headers } = useAuthStore();
  return useSWR(userId ? `/api/bot-connection-status/${userId}` : null, async (url) => {
    const res = await fetch(url);
    const result = (await res.json()) as { isConnected: boolean };
    return result.isConnected;
  });
}
