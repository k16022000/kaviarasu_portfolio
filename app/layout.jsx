import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Kaviarasu N | Frontend Engineer",
    template: "%s | Kaviarasu N",
  },
  description:
    "Frontend Engineer specializing in Next.js, React.js, TypeScript, REST API integration, performance optimization, and scalable product development.",
  keywords: [
    "Kaviarasu N",
    "Frontend Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "JavaScript Developer",
  ],
  authors: [
    {
      name: "Kaviarasu N",
    },
  ],
  icons: {
    icon: [
      {
        url: "/profile.jpeg",
        type: "image/jpeg",
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
