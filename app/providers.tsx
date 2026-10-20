
"use client";

import { SessionProvider } from "next-auth/react";
import { ScissorsTransitionProvider } from "@/components/ScissorsTransition";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ScissorsTransitionProvider>
        {children}
      </ScissorsTransitionProvider>
    </SessionProvider>
  );
}