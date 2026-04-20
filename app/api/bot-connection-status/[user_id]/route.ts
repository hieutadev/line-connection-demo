import lineBotClient from "@/lib/line-bot";

export async function GET(
  request: Request,
  ctx: RouteContext<"/api/bot-connection-status/[user_id]">,
) {
  try {
    const { user_id: userId } = await ctx.params;
    await lineBotClient.getProfile(userId);
    return Response.json({ isConnected: true });
  } catch {
    return Response.json({ isConnected: false });
  }
}
