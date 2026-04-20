import { LeaveEvent } from "@/types/webhook-events";

export default async function handleLeaveEvent(event: LeaveEvent) {
  // Leave event has no replyToken, cannot send a response.
  // Can be used to delete group/room data from the database.
  const sourceId =
    event.source?.type === "group"
      ? event.source.groupId
      : event.source?.type === "room"
        ? event.source.roomId
        : undefined;
  console.log(`Bot đã rỏi khỏi ${event.source?.type} ${sourceId}`);
}
