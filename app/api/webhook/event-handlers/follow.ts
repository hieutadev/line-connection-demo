import lineBotClient from "@/lib/line-bot";
import { FollowEvent } from "@/types/webhook-events";

export default async function handleFollowEvent(event: FollowEvent) {
  const isUnblocked = event.follow.isUnblocked;

  const welcomeText = isUnblocked
    ? "Chào mừng bạn quay lại! 👋 Rất vui được tiếp tục hỗ trợ bạn."
    : "Cảm ơn bạn đã thêm tôi làm bạn! 🎉 Hãy gửi tin nhắn để bắt đầu trò chuyện.";

  await lineBotClient.replyMessage({
    replyToken: event.replyToken,
    messages: [{ type: "text", text: welcomeText }],
  });
}
