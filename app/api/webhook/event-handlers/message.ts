import lineBotClient from "@/lib/line-bot";
import { MessageEvent } from "@/types/webhook-events";
import { HumanMessage } from "@langchain/core/messages";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({ model: "gemini-2.5-flash" });

export default async function handleMessageEvent(event: MessageEvent) {
  switch (event.message.type) {
    case "text":
      const input = [
        new HumanMessage({
          content: [{ type: "text", text: event.message.text }],
        }),
      ];
      const res = await model.invoke(input);
      await lineBotClient.replyMessage({
        replyToken: event.replyToken,
        messages: [{ type: "text", text: res.content.toString() }],
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
