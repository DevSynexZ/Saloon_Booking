// import AdminNavbar from "@/components/AdminNavbar";

// export default function AdminDashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="min-h-screen bg-zinc-950 text-white">
//       <AdminNavbar />
//       <main>{children}</main>
//     </div>
//   );
// }


// import React from "react";
// import AdminNavbar from "@/components/AdminNavbar";

// export default function AdminDashboardLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="min-h-screen bg-zinc-950 text-white">
//       <AdminNavbar />
//       <main>{children}</main>
//     </div>
//   );
// }


import React from "react";
import AdminNavbar from "../../../components/AdminNavbar";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <AdminNavbar />
      <main>{children}</main>
    </div>
  );
}