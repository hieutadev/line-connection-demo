import lineBotClient from "@/lib/line-bot";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const start = searchParams.get("start") ?? undefined;
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? Number(limitParam) : undefined;

    const followers = await lineBotClient.getFollowers(
      start ?? undefined,
      limit,
    );

    return Response.json({
      userIds: followers.userIds,
      next: followers.next,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
