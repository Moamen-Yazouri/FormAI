import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { AuthProvider } from "@/providers/auth/authProvider";




export const metadata: Metadata = {
  title: "FormAI | AI Forms Builder",
  description: "Build smart forms effortlessly with AI assistance. Create, customize, and deploy intelligent forms with automated responses and data collection.",
  icons: {
    icon: "/public/logo.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
            {children}
        </AuthProvider>
        
        <Toaster richColors />
      </body>
    </html>
  );
}
