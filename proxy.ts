import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import auth from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const headersList = await headers();
  const res = await auth.api.getSession({ headers: headersList });

  if (!res) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"],
};
