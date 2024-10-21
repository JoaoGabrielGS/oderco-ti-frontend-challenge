"use client";

import "../globals.css";
import React from "react";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
      >
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
