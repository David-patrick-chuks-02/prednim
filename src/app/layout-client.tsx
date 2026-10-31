"use client";

import { AuthProvider } from "@/contexts/auth-context";

export function LayoutClient({ children }: { children: React.ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}
