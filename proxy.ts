import { NextRequest, NextResponse } from "next/server";

import auth from "@/lib/auth";
import { headers } from "next/headers";

export async function proxy(request: NextRequest) {
  const headerList = await headers();
  const res = await auth.api.getSession({ headers: headerList });

  if (!res) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  const tokenData = await auth.api.getAccessToken({
    headers: headerList,
    body: { providerId: "line" },
  });

  const response = NextResponse.next();
  response.headers.set("X-Access-Token", tokenData.accessToken);

  return response;
}

export const config = {
  matcher: ["/", '/settings'],
};
