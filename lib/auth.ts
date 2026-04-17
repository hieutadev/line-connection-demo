import { dash } from "@better-auth/infra";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";

const auth = betterAuth({
  socialProviders: {
    line: {
      clientId: process.env.LINE_CLIENT_ID as string,
      clientSecret: process.env.LINE_CLIENT_SECRET as string,
      redirectURI: `${process.env.BASE_URL}/api/auth/callback/line`,
      scope: ["profile", "openid", "email"],
      mapProfileToUser: ({ email, sub }) => ({
        email: email ?? `${sub}@line.user`,
        emailVerified: false,
      }),
      overrideUserInfoOnSignIn: true,
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
  },
  plugins: [
    nextCookies(),
    dash({ apiKey: process.env.BETTER_AUTH_API_KEY }),
  ],
});

export default auth;
