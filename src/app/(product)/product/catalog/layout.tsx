"use client";

import "../../../globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SessionProvider } from "next-auth/react";

export default function RegisterProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <div className="w-full h-screen bg-background">
          <SessionProvider>
            {children}
          </SessionProvider>
          <Toaster />
        </div>
      </body>
    </html>
  );
}