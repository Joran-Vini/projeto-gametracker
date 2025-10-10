import MainHeader from "@/components/main-header/main-header";
import { Inter } from 'next/font/google';
import './globals.css'
import AuthProvider from "@/components/auth/auth-provider";
import { Toaster } from "react-hot-toast";

const inter = Inter({subsets: ['latin']});

export const metadata = {
  title: "GamesTracker",
  description: "Site para guardar seus jogos",
  icons: {
    icon: '/icon.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter} bg-gray-900 text-gray-200`}>
        <Toaster position="top-right" toastOptions={{
          style: {
            background: '#1f2937',
            color: '#f3f4f6', 
          },}
        }/>
        <AuthProvider>
          <MainHeader />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
