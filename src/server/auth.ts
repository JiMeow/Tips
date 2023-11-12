import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type DefaultJWT } from "next-auth/jwt"
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
import { type AdapterUser } from "next-auth/adapters";


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
      isAdmin: boolean;
    };
  }
  // interface User {
  //   id: string;
  //   isAdmin: boolean;
  // }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    user: AdapterUser & {
      id: string;
      isAdmin: boolean;
    };
  }
}
/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    session: ({ session, token }) =>{ 
      session.user = token.user;

      return ({
      ...session,
      token,
    })},

    jwt: ({ token, user }) => {
      const userTemp = user as AdapterUser & {
        id: string;
        isAdmin: boolean;
      };

      if (user) {
        token.user = userTemp
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
              throw new Error("username or password is incorrect")
          }

          const hasedPassword = user.hashedPassword ?? "";
          const isCorrectPassword = await compare(credentials.password, hasedPassword)

          if (!isCorrectPassword) {
              throw new Error("username or password is incorrect")
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

