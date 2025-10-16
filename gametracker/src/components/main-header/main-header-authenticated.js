'use client';

import Link from "next/link";
import { LogOut } from 'lucide-react';
import { signOut } from "next-auth/react";
import SearchBar from './search-bar';

export default function MainHeaderAuthenticated({ session }) {
    return (
        <>
                    <Link href="/dashboard" className="hover:text-sky-400 transition-colors">Inicio</Link>
                    <SearchBar />
                    <li className="text-gray-400">
                    Olá, {session.user.username}!
              </li>
              <li>
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })} 
                  className="flex items-center gap-2 font-semibold text-red-400 hover:text-red-500 transition-colors"
                >
                  <LogOut size={20} />
                  Sair
                </button>
              </li>
            </>
    )
}