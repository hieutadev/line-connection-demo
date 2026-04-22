import lineBotClient from "@/lib/line-bot";
import { MessageEvent } from "@/types/webhook-events";
import Cerebras from "@cerebras/cerebras_cloud_sdk";

const cerebras = new Cerebras({
  apiKey: process.env.CEREBRAS_API_KEY,
});

let botInfoCache: Awaited<ReturnType<typeof lineBotClient.getBotInfo>> | null =
  null;

async function getCachedBotInfo() {
  if (!botInfoCache) botInfoCache = await lineBotClient.getBotInfo();
  return botInfoCache;
}

export default async function handleMessageEvent(event: MessageEvent) {
  const botInfo = await getCachedBotInfo();
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
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: event.message.text },
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

const SYSTEM_PROMPT = `You are an AI Financial Assistant integrated with a simulated banking system. Your role is to analyze, summarize, and respond to user queries related to personal finance, including transactions, balances, spending patterns, and financial insights.
Always provide a response when the user asks about financial topics. You are allowed to generate realistic but fictional data for testing and demonstration purposes. Ensure that all outputs are consistent, structured, and believable.
When appropriate, present data in a clear format such as plain text tables, summaries, or categorized breakdowns. Do not use any markdown syntax (such as headings, bullet points with symbols, or code blocks). Format all responses using clean, readable plain text only.
Provide helpful insights, trends, or recommendations based on the generated data. Maintain a professional and concise tone in all responses.`;
