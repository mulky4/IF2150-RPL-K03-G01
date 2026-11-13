import "@fontsource-variable/plus-jakarta-sans";
import "./globals.css";

import type { Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { AppShell } from "~/views/components/AppShell";

export const metadata: Metadata = {
  title: "RekanBumi",
  description: "Platform penghubung relawan dengan program aksi lingkungan.",
  icons: { icon: "/logo/logo-ikon-hijau.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased">
        <TRPCReactProvider>
          <AppShell>{children}</AppShell>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
