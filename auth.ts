import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import type { User } from "@/app/lib/definitions";

async function getUser(email: string): Promise<User | undefined> {
  try {
    const userResult =
      await sql<User>`SELECT * FROM users WHERE email=${email}`;
    const { rowCount, rows } = userResult;
    if (rowCount === 0) {
      return;
    }
    return rows[0];
  } catch (error) {
    console.log("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
        const { data, success } = parsedCredentials;

        if (success) {
          const { email, password } = data;
          const user = await getUser(email);

          if (user === undefined) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (passwordMatch) {
            return user;
          }
        }
        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
