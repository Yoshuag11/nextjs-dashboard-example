import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  callbacks: {
    authorized(params) {
      const { auth, request } = params;
      const { nextUrl } = request;
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard) {
        return isLoggedIn;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
  providers: [],
} satisfies NextAuthConfig;
