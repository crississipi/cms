"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getEnv } from "@/src/lib/env";
import {
  createSessionToken,
  hashPassword,
  verifyPassword,
  SESSION_COOKIE_NAME,
} from "@/src/lib/auth/session";

export interface LoginActionState {
  error?: string;
}

export async function loginAction(
  prevState: LoginActionState | undefined,
  formData: FormData,
): Promise<LoginActionState | undefined> {
  const username = formData.get("username")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!username || !password) {
    return { error: "Username and password are required." };
  }

  const env = getEnv();

  // Validate username
  if (username !== env.ADMIN_USERNAME) {
    return { error: "Invalid username or password." };
  }

  // Support hashed password comparison; fallback to direct match if hash isn't formatted with salt
  let isValid = false;
  if (env.ADMIN_PASSWORD_HASH.includes(":")) {
    isValid = verifyPassword(password, env.ADMIN_PASSWORD_HASH);
  } else {
    // If user set a simple password or direct hash in env, generate salt:hash or compare
    const expected = hashPassword(env.ADMIN_PASSWORD_HASH);
    isValid =
      password === env.ADMIN_PASSWORD_HASH ||
      verifyPassword(password, expected);
  }

  if (!isValid) {
    return { error: "Invalid username or password." };
  }

  const token = await createSessionToken({
    username: env.ADMIN_USERNAME,
    role: "admin",
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 8 * 60 * 60,
  });

  redirect("/dashboard");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
  redirect("/login");
}
