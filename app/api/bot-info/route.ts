import lineBotClient from "@/lib/line-bot";

export type BotInfoResponse = Awaited<ReturnType<typeof lineBotClient.getBotInfo>>;

export async function GET() {
  try {
    const res = await lineBotClient.getBotInfo();
    return Response.json(res);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return Response.json({ error: message }, { status: 500 });
  }
}
