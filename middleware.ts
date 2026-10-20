// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//   function middleware(req) {
//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ token, req }) => {
//         // Only protect admin routes with middleware
//         if (req.nextUrl.pathname.startsWith("/admin")) {
//           return token?.role === "admin";
//         }
//         return true;
//       },
//     },
//     pages: {
//       signIn: "/auth",
//     },
//   }
// );

// export const config = { 
//   matcher: ["/admin/:path*"] 
// };



// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//   function middleware(req) {
//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ token, req }) => {
//         const path = req.nextUrl.pathname;
        
//         // Always allow unauthenticated access to the admin login page
//         if (path === "/admin/auth") {
//           return true;
//         }

//         // Require admin role for all other /admin routes
//         if (path.startsWith("/admin")) {
//           return token?.role === "admin";
//         }

//         return true;
//       },
//     },
//     pages: {
//       // Redirect unauthorized attempts on /admin to the admin login page
//       signIn: "/admin/auth",
//     },
//   }
// );

// export const config = { 
//   matcher: ["/admin/:path*"] 
// };




// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export async function middleware(req: NextRequest) {
//   const path = req.nextUrl.pathname;

//   // 1. Always allow public access to the admin login page
//   if (path === "/admin/auth") {
//     return NextResponse.next();
//   }

//   // 2. Protect all other /admin paths
//   if (path.startsWith("/admin")) {
//     const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//     // If there is no token or the role is not admin, redirect to admin login
//     if (!token || token.role !== "admin") {
//       const url = new URL("/admin/auth", req.url);
//       return NextResponse.redirect(url);
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*"],
// };



// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//   function middleware(req) {
//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ token, req }) => {
//         const path = req.nextUrl.pathname;

//         // 1. Always allow access to the admin login page
//         if (path === "/admin/auth") {
//           return true;
//         }

//         // 2. For any other /admin route, ensure token exists and role is strictly "admin"
//         if (path.startsWith("/admin")) {
//           return token?.role === "admin";
//         }

//         return true;
//       },
//     },
//     pages: {
//       signIn: "/admin/auth",
//     },
//   }
// );

// export const config = { 
//   matcher: ["/admin/:path*"] 
// };






// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export async function middleware(req: NextRequest) {
//   const path = req.nextUrl.pathname;

//   // Allow public access to the admin login page
//   if (path === "/admin/auth") {
//     return NextResponse.next();
//   }

//   // Protect all /admin routes
//   if (path.startsWith("/admin")) {
//     const token = await getToken({ 
//       req, 
//       secret: process.env.NEXTAUTH_SECRET 
//     });

//     // If no token or role is not admin, redirect to admin login
//     if (!token || token.role !== "admin") {
//       const loginUrl = new URL("/admin/auth", req.url);
//       return NextResponse.redirect(loginUrl);
//     }
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*"],
// };



import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;

        // Always allow public access to the admin login page
        if (path === "/admin/auth") {
          return true;
        }

        // Require strictly "admin" role for any /admin route
        if (path.startsWith("/admin")) {
          return token?.role === "admin";
        }

        return true;
      },
    },
    pages: {
      signIn: "/admin/auth",
    },
  }
);

export const config = { 
  matcher: ["/admin/:path*"] 
};