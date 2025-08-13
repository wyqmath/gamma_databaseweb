import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuickAccessMenu from "@/components/QuickAccessMenu";
import { ErrorBoundary } from "@/components/ErrorBoundary";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "γ-Secretase Comparative Database",
  description: "Comprehensive comparative analysis platform for γ-secretase complex subunits across species",
  keywords: "gamma-secretase, protein comparison, bioinformatics, structural biology, evolution",
  authors: [{ name: "γ-Secretase Research Team" }],
  openGraph: {
    title: "γ-Secretase Comparative Database",
    description: "Comprehensive comparative analysis platform for γ-secretase complex subunits across species",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased bg-slate-950 text-slate-100 min-h-screen flex flex-col`}>
        <ErrorBoundary>
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <QuickAccessMenu />
        </ErrorBoundary>
      </body>
    </html>
  );
}
