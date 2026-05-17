export const authConfig: any = {
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }: any) {
      const isLoggedIn = !!auth?.user;
      const isProtectedRoute = ['/dashboard', '/goals', '/team', '/admin', '/analytics', '/reports', '/pulse'].some(path => nextUrl.pathname.startsWith(path));
      
      if (isProtectedRoute) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn && (nextUrl.pathname === '/login' || nextUrl.pathname === '/')) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = user.image; // Passed role via 'image' hack
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id;
        session.user.image = token.role;
      }
      return session;
    }
  },
  providers: [],
};
