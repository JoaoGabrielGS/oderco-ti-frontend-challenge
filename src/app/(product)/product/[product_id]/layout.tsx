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
    <html lang="en">
      <body>
        <SessionProvider>
          <div className="w-full h-screen bg-background">
            {children}
            <Toaster />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}