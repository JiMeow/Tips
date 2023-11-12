import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";

import Credentials from "next-auth/providers/credentials";
import { compare } from "bcrypt";

import { env } from "@/env.mjs";
import { db } from "@/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      // ...other properties
      // role: UserRole;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) =>{ 
      return ({
      ...session,
      token,
    })},
    jwt: ({ token, user }) => {
      if (user) {
        token.id = user.id;
      }
      return token;
    }
  },
  adapter: PrismaAdapter(db),
  pages:{
    signIn: '/login',
  },
  providers: [
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */

    Credentials({
      name: "Credentials",
      credentials: {
          email: {
              labal: "Email",
              type: "text",
          },
          password: {
              label: "Password",
              type: "password",
          }
      },
      async authorize(credentials) {
          if (!credentials?.email || !credentials?.password) 
          {
              throw new Error('Email and password are required!')
          }

          const user = await db.user.findUnique({
              where: {
                  email: credentials.email
              }
          });
          
          if (!user) 
          {
              throw new Error('Email does not exist!')
          }
          
          if (!user.hashedPassword)
          {
              throw new Error('Password is not set!')
          }

          if (!user.isAdmin)
          {
              throw new Error('You are not admin!')
          }

          const hasedPassword = user.hashedPassword ?? "";
          const isCorrectPassword = await compare(credentials.password, hasedPassword)

          if (!isCorrectPassword) {
              throw new Error('Password is incorrect!')
          }

          return user;
      }
  })
  ],
  session: {
    strategy: "jwt",
  },
  secret: env.NEXTAUTH_SECRET,
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
