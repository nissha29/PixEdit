import type { Metadata } from "next";
import "./globals.css";
import SessionProvider from "../components/provider/SessionProvider";
import { quattrocento } from "@/lib/fonts";
import QueryProvider from "@/components/provider/QueryProvider";

export const metadata: Metadata = {
  title: "pixEDiT | Image Editor",
  description: "Pixedit is an all-in-one image editor with powerful tools to generate, edit, enhance, and transform visuals effortlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quattrocento.className} antialiased`}
      >
        <QueryProvider>
          <SessionProvider>
            {children}
          </SessionProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
