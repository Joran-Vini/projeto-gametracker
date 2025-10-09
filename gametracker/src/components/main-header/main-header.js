import Link from "next/link";
import { Gamepad2 } from 'lucide-react';

export default function MainHeader() {
    return (
        <header className="bg-gray-900 text-gray-200 shadow-lg">
            <nav className="container mx-auto flex items-center justify-between px-8 py-4">
                <Link href="/" className="text-2xl font-bold text-sky-400 hover:text-sky-500 transition-colors flex items-center gap-2">
                <Gamepad2 /> 
                    GamesTracker
                </Link>
            <ul className="flex items-center gap-6 text-lg">
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
            </ul>
            </nav>
        </header>
    )
}