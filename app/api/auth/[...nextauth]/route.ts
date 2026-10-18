// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import dbConnect from "@/lib/db"; // Use your existing db.ts
// import User from "@/lib/models/User";
// import bcrypt from "bcryptjs";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       id: string;
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//     };
//   }
// }

// const handler = NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         await dbConnect(); //
        
//         const user = await User.findOne({ email: credentials?.email });
//         if (!user) throw new Error("No user found");

//         const isValid = await bcrypt.compare(credentials!.password, user.password);
//         if (!isValid) throw new Error("Invalid password");

//         return { id: user._id, email: user.email, name: user.name };
//       }
//     })
//   ],
//   session: { strategy: "jwt" },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/signup", // Your custom signup page
//   },
//   callbacks: {
//   async session({ session, token }) {
//     if (session.user) {
//       session.user.id = token.sub ?? "";
//     }
//     return session;
//   },
// },
  
// });

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
    };
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

        return { id: user._id.toString(), email: user.email, name: user.name };
      }
    })
  ],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signup",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub ?? "";
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };