import { WebhookRequestBody } from "@/types/webhook-events";
import { validateSignature } from "@line/bot-sdk";
import handleMessageEvent from "./event-handlers/message";
import handleFollowEvent from "./event-handlers/follow";
import handleUnfollowEvent from "./event-handlers/unfollow";

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
  const payload = JSON.parse(body) as WebhookRequestBody;
  console.log(JSON.stringify(payload, null, 2));

  // 3. Handle events asynchronously
  for (const event of payload.events) {
    switch (event.type) {
      case "message":
        await handleMessageEvent(event);
        break;
      case "follow":
        await handleFollowEvent(event);
        break;
      case "unfollow":
        await handleUnfollowEvent(event);
        break;
      case "join":
      case "memberJoined":
      case "unsend":
      case "leave":
      case "memberLeft":
      case "postback":
      case "videoPlayComplete":
      case "beacon":
      case "accountLink":
      case "membership":
      default:
        break;
    }
  }

  return new Response("OK", { status: 200 });
}
