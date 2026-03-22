import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Image from "next/image";
import {ApolloWrapper} from "@/app/ApolloWrapper";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Transito sabaneta",
  description: "Es la pagina del transito de sabaneta ¯\\_(ツ)_/¯",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {/* <Navbar/>
          <div className="fixed inset-0 -z-10">
          <Image
            src="/calle-77-sur_sabaneta21.jpg"
            alt="fondo sabaneta"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div> */}
          <ApolloWrapper>
            {children}
          </ApolloWrapper>
          {/* <Footer/> */}
        </ThemeProvider>
      </body>
    </html>
  );
}
