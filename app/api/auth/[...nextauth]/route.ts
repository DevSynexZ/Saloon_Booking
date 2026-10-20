// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import dbConnect from "@/lib/db";
// import User from "@/lib/models/User";
// import bcrypt from "bcryptjs";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//       role?: string;
//     };
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     role?: string;
//     sub?: string;
//   }
// }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         await dbConnect();
        
//         const user = await User.findOne({ email: credentials?.email });
//         if (!user) throw new Error("No user found");

//         const isValid = await bcrypt.compare(credentials!.password, user.password);
//         if (!isValid) throw new Error("Invalid password");

//         const isAdmin = user.email === process.env.ADMIN_EMAIL;

//         return { id: user._id.toString(), email: user.email, name: user.name, role: isAdmin?"admin":"user" };
//       }
//     })
//   ],
//   session: { strategy: "jwt" },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     // signIn: "/signup",
//     signIn:"/auth",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = (user as any).role;
//         token.sub = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.sub ?? "";
//         session.user.role = token.role;
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };


// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import dbConnect from "@/lib/db";
// import User from "@/lib/models/User";
// import bcrypt from "bcryptjs";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//       role?: string;
//     };
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     role?: string;
//     sub?: string;
//   }
// }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         await dbConnect();
        
//         const user = await User.findOne({ email: credentials?.email });
//         if (!user) throw new Error("No user found");

//         const isValid = await bcrypt.compare(credentials!.password, user.password);
//         if (!isValid) throw new Error("Invalid password");

//         const isAdmin = user.email === process.env.ADMIN_EMAIL;

//         return { 
//           id: user._id.toString(), 
//           email: user.email, 
//           name: user.name, 
//           role: isAdmin ? "admin" : "user" 
//         };
//       }
//     })
//   ],
//   session: { strategy: "jwt" },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/auth",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = (user as any).role;
//         token.sub = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.sub ?? "";
//         session.user.role = token.role;
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };








// import NextAuth, { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import dbConnect from "@/lib/db";
// import User from "@/lib/models/User";
// import bcrypt from "bcryptjs";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//       role?: string;
//     };
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     role?: string;
//     sub?: string;
//   }
// }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         await dbConnect();
        
//         const user = await User.findOne({ email: credentials?.email });
//         if (!user) throw new Error("No user found");

//         const isValid = await bcrypt.compare(credentials!.password, user.password);
//         if (!isValid) throw new Error("Invalid password");

//         // Determine if admin based on environment variable match
//         const isAdmin = user.email === process.env.ADMIN_EMAIL;

//         return { 
//           id: user._id.toString(), 
//           email: user.email, 
//           name: user.name, 
//           role: isAdmin ? "admin" : "user" 
//         };
//       }
//     })
//   ],
//   session: { strategy: "jwt" },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/admin/auth",
//   },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = (user as any).role;
//         token.sub = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user && token) {
//         session.user.id = token.sub ?? "";
//         session.user.role = token.role as string; // Crucial: Passes role to client session
//       }
//       return session;
//     },
//   },
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };






import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role?: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
    sub?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        await dbConnect();
        
        const user = await User.findOne({ email: credentials?.email });
        if (!user) throw new Error("No user found");

        const isValid = await bcrypt.compare(credentials!.password, user.password);
        if (!isValid) throw new Error("Invalid password");

        const isAdmin = user.email === process.env.ADMIN_EMAIL;

        return { 
          id: user._id.toString(), 
          email: user.email, 
          name: user.name, 
          role: isAdmin ? "admin" : "user" 
        };
      }
    })
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/admin/auth",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.sub ?? "";
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };