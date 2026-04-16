import { createAuthClient } from "better-auth/client";
const authClient = createAuthClient();

export async function signInWithLINE() {
  await authClient.signIn.social({ provider: "line" });
}

export async function signOut(onSuccess?: () => void) {
  await authClient.signOut({
    fetchOptions: { onSuccess },
  });
}
