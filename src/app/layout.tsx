import "@/styles/globals.css";

import { HonoReactProvider } from "@/hono/react";
import { ClerkProvider } from "@clerk/nextjs";
import { GeistSans } from "geist/font/sans";

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background antialiased">
        <ClerkProvider>
          <HonoReactProvider>{children}</HonoReactProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
