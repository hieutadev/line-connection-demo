import auth from "@/lib/auth";
import { AuthProvider } from "@/providers/auth-provider";
import { headers } from "next/headers";

export default async function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { accessToken } = await auth.api.getAccessToken({
    headers: await headers(),
    body: { providerId: "line" },
  });
  return <AuthProvider token={accessToken}>{children}</AuthProvider>;
}
