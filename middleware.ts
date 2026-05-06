import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token, req }) => {
      // Admin-only protection
      if (req.nextUrl.pathname.startsWith("/admin")) {
        return token?.role === "admin"; //
      }
      // General protection for other matched routes
      return !!token;
    },
  },
  pages: {
    signIn: "/signup",
  },
});

export const config = { 
  // This ensures only /admin and /book are protected. 
  // /api/bookings/check will remain public and accessible to your fetch call.
  matcher: ["/admin/:path*", "/book/:path*"] 
};