import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import '@stream-io/video-react-sdk/dist/css/styles.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Connectly",
  description: "Video calling app",
  icons: {
    icon: "/icons/logo.svg"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: {
            logoImageUrl: '/icons/connectly-logo.svg',
            socialButtonsVariant: 'iconButton'
          },
          variables: {
            colorText: '#fff',
            colorPrimary: '#30D5C8',
            colorBackground: '#1c1f2e',
            colorInputBackground: '#252a41',
            colorInputText: '#fff',
          }
        }}
      >
        <body
          className={`${inter.className} antialiased bg-dark-2`}
        >
          {children}
          <Toaster toastOptions={{
            unstyled: true,
            classNames: {
              error: 'bg-red-400 text-base py-2 px-4 rounded-md flex items-center gap-2',
              success: 'text-green-400 bg-dark-1 text-base py-2 px-4 rounded-md flex items-center gap-2',
              warning: 'text-yellow-400 bg-dark-1 text-base py-2 px-4 rounded-md flex items-center gap-2',
              info: 'bg-blue-400 text-base py-2 px-4 rounded-md flex items-center gap-2',
            }
          }} />
        </body>
      </ClerkProvider>
    </html>
  );
}
