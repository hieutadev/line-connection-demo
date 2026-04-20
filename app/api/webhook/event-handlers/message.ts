import lineBotClient from "@/lib/line-bot";
import { MessageEvent } from "@/types/webhook-events";

export default async function handleMessageEvent(event: MessageEvent) {
  switch (event.message.type) {
    case "text":
      await lineBotClient.replyMessage({
        replyToken: event.replyToken,
        messages: [{ type: "text", text: "Hello, you just send a message 👋🏼" }],
      });
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
