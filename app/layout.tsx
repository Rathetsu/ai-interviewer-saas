import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Interviewly | AI powered Interview Preparation Platform",
  description:
    "Interviewly is an AI-powered interview preparation platform that helps job seekers practice real-world interview questions, receive instant feedback, and improve their communication skills. Perfect for technical and behavioral interviews, our smart tools simulate live interviews and offer personalized insights to help users land their dream jobs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${monaSans.className} antialiased pattern`}>
        {children}
      </body>
    </html>
  );
}
