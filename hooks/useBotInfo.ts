import { BotInfoResponse } from "@/app/api/bot-info/route";
import useSWR from "swr";

export default function useBotInfo() {
  return useSWR('/api/bot-info', async (url) => {
    const res = await fetch(url);
    const result = await res.json();
    return result as BotInfoResponse;
  });
}
