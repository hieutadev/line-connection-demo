/**
 * LINE Messaging API Webhook Event Types
 * Based on: docs/messaging-api/index.html.md
 */

// ============================================================================
// Common Properties
// ============================================================================

export type ChannelMode = "active" | "standby";

export interface DeliveryContext {
  isRedelivery: boolean;
}

export interface SourceUser {
  type: "user";
  userId: string;
}

export interface SourceGroup {
  type: "group";
  groupId: string;
  userId?: string;
}

export interface SourceRoom {
  type: "room";
  roomId: string;
  userId?: string;
}

export type Source = SourceUser | SourceGroup | SourceRoom;

export interface WebhookEventBase {
  type: string;
  mode: ChannelMode;
  timestamp: number;
  source?: Source;
  webhookEventId: string;
  deliveryContext: DeliveryContext;
}

// ============================================================================
// Message Types
// ============================================================================

export interface Emoji {
  index: number;
  length: number;
  productId: string;
  emojiId: string;
}

export interface Mentionee {
  index: number;
  length: number;
  type: "user" | "all";
  userId?: string;
  isSelf?: boolean;
}

export interface Mention {
  mentionees: Mentionee[];
}

export interface TextMessage {
  id: string;
  type: "text";
  quoteToken?: string;
  markAsReadToken?: string;
  text: string;
  emojis?: Emoji[];
  mention?: Mention;
  quotedMessageId?: string;
}

export interface ContentProviderLine {
  type: "line";
}

export interface ContentProviderExternal {
  type: "external";
  originalContentUrl: string;
  previewImageUrl: string;
}

export type ContentProvider = ContentProviderLine | ContentProviderExternal;

export interface ImageSet {
  id: string;
  index: number;
  total: number;
}

export interface ImageMessage {
  id: string;
  type: "image";
  quoteToken?: string;
  markAsReadToken?: string;
  contentProvider: ContentProvider;
  imageSet?: ImageSet;
}

export interface VideoMessage {
  id: string;
  type: "video";
  quoteToken?: string;
  markAsReadToken?: string;
  duration?: number;
  contentProvider: ContentProvider;
}

export interface AudioMessage {
  id: string;
  type: "audio";
  markAsReadToken?: string;
  duration?: number;
  contentProvider: ContentProvider;
}

export interface FileMessage {
  id: string;
  type: "file";
  markAsReadToken?: string;
  fileName: string;
  fileSize: number;
}

export interface LocationMessage {
  id: string;
  type: "location";
  markAsReadToken?: string;
  title?: string;
  address?: string;
  latitude: number;
  longitude: number;
}

export type StickerResourceType =
  | "STATIC"
  | "ANIMATION"
  | "SOUND"
  | "ANIMATION_SOUND"
  | "POPUP"
  | "POPUP_SOUND"
  | "CUSTOM"
  | "MESSAGE"
  | "NAME_TEXT"
  | "PER_STICKER_TEXT";

export interface StickerMessage {
  id: string;
  type: "sticker";
  quoteToken?: string;
  markAsReadToken?: string;
  packageId: string;
  stickerId: string;
  stickerResourceType: StickerResourceType;
  keywords?: string[];
  text?: string;
  quotedMessageId?: string;
}

export type Message =
  | TextMessage
  | ImageMessage
  | VideoMessage
  | AudioMessage
  | FileMessage
  | LocationMessage
  | StickerMessage;

// ============================================================================
// Webhook Events
// ============================================================================

export interface MessageEvent extends WebhookEventBase {
  type: "message";
  replyToken: string;
  message: Message;
}

export interface UnsendEvent extends WebhookEventBase {
  type: "unsend";
  unsend: {
    messageId: string;
  };
}

export interface FollowEvent extends WebhookEventBase {
  type: "follow";
  replyToken: string;
  follow: {
    isUnblocked: boolean;
  };
}

export interface UnfollowEvent extends WebhookEventBase {
  type: "unfollow";
}

export interface JoinEvent extends WebhookEventBase {
  type: "join";
  replyToken: string;
}

export interface LeaveEvent extends WebhookEventBase {
  type: "leave";
}

export interface MemberJoinedEvent extends WebhookEventBase {
  type: "memberJoined";
  replyToken: string;
  joined: {
    members: SourceUser[];
  };
}

export interface MemberLeftEvent extends WebhookEventBase {
  type: "memberLeft";
  left: {
    members: SourceUser[];
  };
}

export interface PostbackParamsDatetime {
  date?: string;
  time?: string;
  datetime?: string;
}

export interface PostbackParamsRichMenuSwitch {
  newRichMenuAliasId?: string;
  status: "SUCCESS" | "RICHMENU_ALIAS_ID_NOTFOUND" | "RICHMENU_NOTFOUND" | "FAILED";
}

export interface PostbackEvent extends WebhookEventBase {
  type: "postback";
  replyToken: string;
  postback: {
    data: string;
    params?: PostbackParamsDatetime | PostbackParamsRichMenuSwitch;
  };
}

export interface VideoPlayCompleteEvent extends WebhookEventBase {
  type: "videoPlayComplete";
  replyToken: string;
  videoPlayComplete: {
    trackingId: string;
  };
}

export type BeaconType = "enter" | "banner" | "stay";

export interface BeaconEvent extends WebhookEventBase {
  type: "beacon";
  replyToken: string;
  beacon: {
    hwid: string;
    type: BeaconType;
    dm?: string;
  };
}

export interface AccountLinkEvent extends WebhookEventBase {
  type: "accountLink";
  replyToken?: string;
  link: {
    result: "ok" | "failed";
    nonce: string;
  };
}

export type MembershipEventType = "joined" | "left" | "renewed";

export interface MembershipEvent extends WebhookEventBase {
  type: "membership";
  replyToken: string;
  membership: {
    type: MembershipEventType;
    membershipId: number;
  };
}

export type WebhookEvent =
  | MessageEvent
  | UnsendEvent
  | FollowEvent
  | UnfollowEvent
  | JoinEvent
  | LeaveEvent
  | MemberJoinedEvent
  | MemberLeftEvent
  | PostbackEvent
  | VideoPlayCompleteEvent
  | BeaconEvent
  | AccountLinkEvent
  | MembershipEvent;

// ============================================================================
// Webhook Request Body
// ============================================================================

export interface WebhookRequestBody {
  destination: string;
  events: WebhookEvent[];
}
