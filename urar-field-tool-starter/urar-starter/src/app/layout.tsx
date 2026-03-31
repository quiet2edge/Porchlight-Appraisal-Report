import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "URAR Field Tool Starter",
  description: "Local-first appraisal field app starter"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif", background: "#f5f5f5" }}>
        {children}
      </body>
    </html>
  );
}
