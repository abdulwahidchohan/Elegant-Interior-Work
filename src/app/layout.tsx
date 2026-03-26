import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { FloatingWidget } from "@/components/floating-widget";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Elegant Interior Work | Luxury Interior Design",
  description:
    "Transform your spaces with award-winning interior design. Elegant Interior Work crafts bespoke environments that tell your story.",
  keywords: ["interior design", "luxury interiors", "home decor", "renovation"],
  openGraph: {
    title: "Elegant Interior Work",
    description: "Luxury Interior Design Studio",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main>{children}</main>
          <FloatingWidget />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
