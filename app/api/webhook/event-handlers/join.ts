import lineBotClient from "@/lib/line-bot";
import { JoinEvent } from "@/types/webhook-events";

export default async function handleJoinEvent(event: JoinEvent) {
  const sourceType = event.source?.type ?? "group";

  await lineBotClient.replyMessage({
    replyToken: event.replyToken,
    messages: [
      {
        type: "text",
        text: `Cảm ơn đã thêm tôi vào ${sourceType === "group" ? "nhóm" : "phòng"} này! 🎉 Hãy tag hoặc nhắn tin để tôi hỗ trợ.`,
      },
    ],
  });
}
