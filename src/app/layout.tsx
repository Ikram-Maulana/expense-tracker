import "@/styles/globals.css";

import { Toaster } from "@/components/ui/sonner";
import { HonoReactProvider } from "@/hono/react";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Expense Tracker",
  description:
    "Expense tracker making it simple for you to track and manage your expenses. Easy to use and simple to understand.",
  applicationName: "Expense Tracker",
  keywords: [
    "Expense Tracker",
    "Expense Tracker App",
    "Ikram Maulana",
    "Ikram Maulana Portfolio",
    "Ikram Maulana Links",
    "Ikram Maulana Website",
    "Ikram Maulana Full Stack Web Developer",
    "Ikram Maulana Social Media",
    "Ikram Maulana Social Media Links",
    "Ikram Links",
    "Portfolio",
    "Web Developer",
    "Fullstack Developer",
    "Fullstack Web Developer",
    "React Developer",
    "Founder Daunnesia",
    "Ikram UMMI",
    "Daunnesia",
    "Daunnesia Agensi",
    "Daunnesia Agency",
    "Agency",
    "Agensi",
    "Universitas Muhammadiyah Sukabumi",
    "Universitas Muhammadiyah Sukabumi Informatics Engineering",
    "Universitas Muhammadiyah Sukabumi Teknik Informatika",
    "UMMI",
    "UMMI Sukabumi",
    "UMMI Informatics Engineering",
    "UMMI Teknik Informatika",
    "Informatics Engineering",
    "Teknik Informatika",
  ],
  authors: [
    {
      name: "Ikram Maulana",
      url: "https://ikrammaulana.my.id",
    },
  ],
  creator: "Ikram Maulana",
  metadataBase: new URL("https://expensetrackers.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Expense Tracker",
    title: "Expense Tracker",
    description:
      "Expense tracker making it simple for you to track and manage your expenses. Easy to use and simple to understand.",
    url: "https://expensetrackers.vercel.app",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Expense Tracker by Ikram Maulana",
      },
    ],
  },
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
        <HonoReactProvider>{children}</HonoReactProvider>

        <div className="lg:hidden">
          <Toaster richColors position="bottom-center" duration={5000} />
        </div>
        <div className="hidden lg:flex">
          <Toaster richColors position="top-center" duration={5000} />
        </div>
      </body>
    </html>
  );
}
