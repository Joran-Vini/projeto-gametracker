'use client';

import Link from "next/link";
import { Gamepad2 } from 'lucide-react';
import { useSession } from "next-auth/react";
import MainHeaderUnauthenticated from './main-header-unauthenticated'
import MainHeaderAuthenticated from './main-header-authenticated'

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
                    <MainHeaderUnauthenticated />
                )}
                {status === 'authenticated' && (
                    <MainHeaderAuthenticated session={session}/>
                )}
            </ul>
            </nav>
        </header>
    )
}