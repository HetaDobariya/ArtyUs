// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import './globals.css';
import Footer from "@/components/Footer";
import Navigation from "@/components/Navbar"; // Import Navigation, not Navbar
import { UserProvider } from "@/contexts/UserContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: false, // Disable preload to avoid warnings if font isn't used immediately
  adjustFontFallback: false,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: false, // Disable preload to avoid warnings
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  title: "Arty Us",
  description: "Fueling your imagination",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserProvider>
          <Navigation /> {/* Use Navigation component */}
          {children}
          <Footer />
        </UserProvider>
      </body>
    </html>
  );
}