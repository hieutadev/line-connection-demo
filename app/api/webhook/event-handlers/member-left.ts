import { MemberLeftEvent } from "@/types/webhook-events";

export default async function handleMemberLeftEvent(event: MemberLeftEvent) {
  // MemberLeft event does not have a reply token, so it is not possible to send a reply.
  const mentions = event.left.members.map((m) => m.userId).join(", ");
  console.log(`Members left: ${mentions}`);
}
