import MainHeader from "@/components/main-header/main-header";
import { Inter } from 'next/font/google';
import './globals.css'

const inter = Inter({subsets: ['latin']});

export const metadata = {
  title: "GamesTracker",
  description: "Site para marcar seus jogos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter} bg-gray-900 text-gray-200`}>
        <MainHeader />
        {children}
      </body>
    </html>
  );
}
