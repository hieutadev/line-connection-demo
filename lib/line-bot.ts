import { LineBotClient } from "@line/bot-sdk";

const lineBotClient = LineBotClient.fromChannelAccessToken({
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN!,
});

export default lineBotClient;