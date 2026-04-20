import { UnfollowEvent } from "@/types/webhook-events";

export default async function handleUnfollowEvent(event: UnfollowEvent) {
  // Unfollow event has no reply token, cannot send a response.
  // Can be used to update user status in the database or delete data.
  console.log(`User ${event.source?.userId} has unfollow`);
}
