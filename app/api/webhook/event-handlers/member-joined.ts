import lineBotClient from "@/lib/line-bot";
import { MemberJoinedEvent } from "@/types/webhook-events";

export default async function handleMemberJoinedEvent(
  event: MemberJoinedEvent,
) {
  const mentions = event.joined.members.map((m) => m.userId).join(", ");

  await lineBotClient.replyMessage({
    replyToken: event.replyToken,
    messages: [{ type: "text", text: `Chào mừng thành viên mới! 🎉` }],
  });

  console.log(`Members joined: ${mentions}`);
}
