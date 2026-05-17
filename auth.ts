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
      async authorize(credentials: any) {
        // HACKATHON BYPASS: Always succeed login, determine role from email
        const email = credentials?.email as string || "demo@atomgoals.ai";
        let targetRole = "EMPLOYEE";
        if (email.toLowerCase().includes("admin")) targetRole = "ADMIN";
        else if (email.toLowerCase().includes("manager") || email.toLowerCase().includes("mgr")) targetRole = "MANAGER";
        
        const user = await prisma.user.findFirst({ where: { role: targetRole } }) || await prisma.user.findFirst();
        
        if (user) {
          return { id: user.id, email: user.email, name: user.name, image: user.role };
        }
        return { id: "1", email: email, name: "Demo User", image: targetRole };
      },
    }),
  ],
});
