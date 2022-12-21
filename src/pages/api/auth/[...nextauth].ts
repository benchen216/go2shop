import NextAuth, { type NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import  EmailProvider  from "next-auth/providers/email";
import LineProvider from "next-auth/providers/line";
// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import { env } from "../../../env/server.mjs";
import { prisma } from "../../../server/db/client";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        // const myUser = await prisma.user.findUnique({
        //   where: {
        //     id: Number(user.id),
        //   },
        //   select: {
        //     userRole: true,
        //   }
        // })
        // session.user.role = myUser?.userRole || 1;
        //session.user.role = user.;
        session.user.id = user.id;
      }
      return session;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    LineProvider({
      clientId: env.LINE_CLIENT_ID,
      clientSecret: env.LINE_CLIENT_SECRET,
    }),
    DiscordProvider({
      clientId: env.DISCORD_CLIENT_ID,
      clientSecret: env.DISCORD_CLIENT_SECRET,
    }),
    FacebookProvider({
        clientId: env.FACEBOOK_CLIENT_ID,
        clientSecret: env.FACEBOOK_CLIENT_SECRET,
    }),
    EmailProvider({
        server: {
          host: env.EMAIL_SERVER_HOST,
          port: env.EMAIL_SERVER_PORT,
          auth: {
            user: env.EMAIL_SERVER_USER,
            pass: env.EMAIL_SERVER_PASSWORD
          }
        }
    }),
    //...add more providers here
  ],
};

export default NextAuth(authOptions);
