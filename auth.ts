import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {},
      async authorize(credentials) {
        // HACKATHON BYPASS: Always succeed login, ignore password checks
        const user = await prisma.user.findFirst({ where: { role: "ADMIN" } }) || await prisma.user.findFirst();
        if (user) {
          return { id: user.id, email: user.email, name: user.name, image: user.role };
        }
        return { id: "1", email: "demo@atomgoals.ai", name: "Demo User", image: "ADMIN" };
      },
    }),
  ],
});
