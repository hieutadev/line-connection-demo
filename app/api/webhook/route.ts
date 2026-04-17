import lineBotClient from "@/lib/line-bot";
import { validateSignature } from "@line/bot-sdk";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("x-line-signature") ?? "";

  // 1. Verify signature with native crypto
  const isValid = validateSignature(
    body,
    process.env.LINE_CHANNEL_SECRET!,
    signature,
  );

  if (!isValid) {
    return new Response("Unauthorized", { status: 401 });
  }

  // 2. Parse events
  const payload = JSON.parse(body);

  // 3. Handle events asynchronously
  for (const event of payload.events) {
    if (event.type === "message" && event.message.type === "text") {
      // 4. Reply message with SDK
      await lineBotClient.replyMessage({
        replyToken: event.replyToken,
        messages: [{ type: "text", text: "Hello, user" }],
      });
    }
  }

  return new Response("OK", { status: 200 });
}
