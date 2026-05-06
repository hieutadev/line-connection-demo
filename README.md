# Line Connection Demo

A Next.js application demonstrating LINE integration with OAuth authentication, a LINE Messaging API bot, and an AI-powered chatbot.

## Overview

This project is a full-stack demo that connects users to a LINE bot through OAuth sign-in. It showcases:

- **LINE OAuth Login** via [Better Auth](https://www.better-auth.com/) with session management
- **LINE Bot Webhook** handling all major event types (messages, follow/unfollow, join/leave, member changes)
- **AI Chatbot** powered by Cerebras (Llama 3.1) that responds to direct messages and group mentions
- **User Dashboard** displaying profile info, bot QR code, and real-time connection status
- **Proxy Middleware** that injects LINE access tokens into authenticated requests

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS 4, shadcn/ui |
| Auth | Better Auth with LINE OAuth |
| State | Zustand |
| Data Fetching | SWR |
| Bot SDK | @line/bot-sdk |
| AI | Cerebras Cloud SDK (Llama 3.1-8B) |

## Project Structure

```
app/
  (auth)/              # Protected routes (dashboard, settings)
    page.tsx           # Home dashboard with profile & bot QR
    settings/page.tsx  # Settings page
  api/
    auth/[...all]/     # Better Auth API routes
    bot-info/          # Bot metadata endpoint
    bot-connection-status/[user_id]/  # Check if user follows bot
    followers/         # List bot followers
    webhook/           # LINE webhook receiver
      route.ts         # Signature validation & event dispatch
      event-handlers/  # Individual event handlers
  sign-in/page.tsx     # LINE OAuth sign-in page
components/ui/         # shadcn/ui components
hooks/                 # SWR data hooks
lib/
  auth.ts              # Better Auth configuration
  auth-client.ts       # Auth client utilities
  line-bot.ts          # LINE Bot SDK client
  utils.ts             # Utility functions
store/                 # Zustand stores
types/                 # TypeScript type definitions
```

## Features

### Authentication
- Sign in with LINE OAuth (profile, openid, email scopes)
- Session management with 7-day expiration
- Automatic session refresh every 24 hours
- Sign-out with client-side transition

### LINE Bot
- Webhook signature validation using LINE channel secret
- Handles: `message`, `follow`, `unfollow`, `join`, `leave`, `memberJoined`, `memberLeft`
- Welcome message on follow (Vietnamese)
- Profile & follower count APIs
- Connection status check per user

### AI Chatbot
- Responds to direct messages and group mentions
- Uses Cerebras Llama 3.1-8B with a financial assistant system prompt
- Plain-text formatting (no markdown)

### Dashboard
- Displays user's LINE profile (avatar, name, ID)
- Shows bot info with QR code to add as friend
- Real-time connection status badge
- Refresh button to re-check connection

## Environment Variables

```bash
# App
BASE_URL=http://localhost:3000

# LINE Login (OAuth)
LINE_CLIENT_ID=your_line_login_channel_id
LINE_CLIENT_SECRET=your_line_login_channel_secret

# LINE Messaging API (Bot)
LINE_CHANNEL_ACCESS_TOKEN=your_channel_access_token
LINE_CHANNEL_SECRET=your_channel_secret

# Auth
BETTER_AUTH_API_KEY=your_better_auth_api_key

# AI
CEREBRAS_API_KEY=your_cerebras_api_key
```

## Getting Started

Install dependencies:

```bash
bun install
```

Set up environment variables in `.env.local`, then run the dev server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) and sign in with LINE.

## LINE Webhook Setup

1. Create a LINE Messaging API channel in the [LINE Developers Console](https://developers.line.biz/)
2. Set the webhook URL to `https://your-domain/api/webhook`
3. Enable the webhook and required event types

## Build

```bash
bun run build
```

## License

MIT
