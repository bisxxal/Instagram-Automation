import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider, 
} from '@clerk/nextjs'
import { ThemeProvider } from "@/provider/theme-provider";
import ReactQueryProvider from "@/provider/react-query-provider";
import { Toaster } from "react-hot-toast";
import ReduxProvider from "@/provider/redux-provider";
 
const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Automater",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body suppressHydrationWarning className={inter.className}>
      <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            // enableSystem
            disableTransitionOnChange
          > 

          <ReduxProvider >
         <ReactQueryProvider>
          {children}
          <Toaster />
          </ReactQueryProvider>
          </ReduxProvider>
        </ThemeProvider>
        </body>
    </html>
    </ClerkProvider>
  );
}
