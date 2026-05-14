import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // This function runs after 'authorized' returns true
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // 1. Admin-only protection
        if (req.nextUrl.pathname.startsWith("/admin")) {
          return token?.role === "admin"; 
        }
        // 2. Protect /book for any logged-in user
        return !!token;
      },
    },
    pages: {
      signIn: "/signup", // Redirects here if not authorized
    },
  }
);

export const config = { 
  // Ensures only these routes trigger the middleware
  matcher: ["/admin/:path*", "/book/:path*"] 
};