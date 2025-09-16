import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from '@/prisma/index'

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email || '' },
      });

      if (!existingUser) {
        await prisma.user.create({
          data: {
            name: user.name,
            email: user.email,
            image: user.image,
          },
        });
      } else {
        await prisma.user.update({
          where: { email: user.email! },
          data: {
            name: user.name,
            image: user.image,
          },
        });
      }
      return true;
    },
    async session({ session }) {
      if (!session.user?.email) {
        throw new Error("No user email in session");
      }

      const dbUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (!dbUser?.id) {
        throw new Error("User ID not found");
      }

      session.user.id = dbUser.id;
      session.user.plan = dbUser.plan;
      return session;
    },
  },
};
