'use client'

import Link from "next/link";
import { Gamepad2, LogOut } from 'lucide-react';
import { useSession, signOut } from "next-auth/react";

export default function MainHeader() {
    const { data: session ,status } = useSession();

    return (
        <header className="bg-gray-900 text-gray-200 shadow-lg">
            <nav className="container mx-auto flex items-center justify-between px-8 py-4">
                <Link href={status === 'unauthenticated' ? '/' : '/dashboard'} disabled={status === 'loading'} className="text-2xl font-bold text-sky-400 hover:text-sky-500 transition-colors flex items-center gap-2">
                <Gamepad2 /> 
                    GamesTracker
                </Link>
            <ul className="flex items-center gap-6 text-lg">
                {status === 'loading' &&  
                <li className="text-gray-500">Carregando...</li>}
                {status === 'unauthenticated' && (
                    <>
                    <li>
                    <Link href="/register" className="hover:text-sky-400 transition-colors">
                        Registrar
                    </Link>
                </li>
                <li>
                    <Link href="/login" className="hover:text-sky-400 transition-colors">
                        Logar
                    </Link>
                </li>
                </>)}
                {status === 'authenticated' && (
                    <>
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
                )}
            </ul>
            </nav>
        </header>
    )
}