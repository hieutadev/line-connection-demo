import lineBotClient from "@/lib/line-bot";
import { MessageEvent } from "@/types/webhook-events";
import Cerebras from "@cerebras/cerebras_cloud_sdk";
import { cacheLife } from "next/cache";

const cerebras = new Cerebras({
  apiKey: process.env.CEREBRAS_API_KEY,
});

async function getBotInfo() {
  "use cache";
  cacheLife("hours");
  return lineBotClient.getBotInfo();
}

export default async function handleMessageEvent(event: MessageEvent) {
  const botInfo = await getBotInfo();
  switch (event.message.type) {
    case "text":
      const isDirectTrigger = event.source?.type === "user";
      const isGroupTrigger =
        event.source?.type === "group" &&
        event.message.mention?.mentionees.some(
          (v) => v.userId === botInfo.userId,
        );
      if (isDirectTrigger || isGroupTrigger) {
        const completion = await cerebras.chat.completions.create({
          messages: [
            {
              role: "user",
              content: event.message.text.trim().replace("/pika", ""),
            },
          ],
          model: "llama3.1-8b",
          max_completion_tokens: 2048,
          temperature: 0.4,
          top_p: 1,
          stream: false,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const text = (completion.choices as any)[0].message.content;
        await lineBotClient.replyMessage({
          replyToken: event.replyToken,
          messages: [{ type: "text", text }],
        });
      }
      break;
    case "image":
    case "video":
    case "audio":
    case "file":
    case "location":
    case "sticker":
      // Handle other message types if needed
      break;
    default:
      break;
  }
}
