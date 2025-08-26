import type { Metadata } from "next";
import "./globals.css";

import Provider from "../lib/Provider";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: {
    default: "Interview Management Dashboard",
    template: "%s | Interview Management Dashboard",
  },
  description:
    "A modern, secure, and efficient dashboard for managing interviews, candidates, and feedback.",
  keywords: [
    "interview",
    "dashboard",
    "candidate management",
    "feedback",
    "Next.js",
    "React",
    "recruitment",
    "admin",
    "panelist",
    "TA member",
  ],
  authors: [
    {
      name: "Prem Narayankar",
      url: "https://interview-dashboard-management.vercel.app",
    },
  ],
  twitter: {
    card: "summary_large_image",
    title: "Interview Management Dashboard",
    description:
      "A modern, secure, and efficient dashboard for managing interviews, candidates, and feedback.",
    images: ["/og-image.png"],
    creator: "@yourcompany",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="h-screen flex bg-gradient-to-br from-gray-50 to-green-50 overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col">
              <main className=" right-0 w-full h-screen flex-1 flex flex-col items-center justify-start px-4 md:px-8 py-4">
                <div className="max-w-5xl flex justify-center ">{children}</div>
              </main>
            </div>
          </div>
        </Provider>
      </body>
    </html>
  );
}
