import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/provider/theme";
import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "@/provider/reactQueryProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Todos Apps",
  description: "for managing your todos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider>
        <ReactQueryProvider>
          <body
            className={`${poppins.className} bg-neutral-100 dark:bg-neutral-950 antialiased`}
          >
            {children}
          </body>
        </ReactQueryProvider>
        <Toaster />
      </ThemeProvider>
    </html>
  );
}
