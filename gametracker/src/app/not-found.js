import { FileX2 } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-center">
            <div className="container mx-auto flex flex-col items-center justify-center gap-6 p-8 text-center">
                <FileX2 className="h-20 w-20 text-sky-500" />
                <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">Erro 404</h1>
                <p className="max-w-xl text-lg text-gray-400 md:text-xl">Ops!. a pagina que você esta procurando nao foi encontrada</p>
                <Link href="/" className="mt-4 inline-flex gap-2 rounded-lg bg-sky-500 px-6 py-3 text-lg font-semibold shadow-lg transition-transform hover: scale-105 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-gray-900">Voltar para o inicio</Link>
            </div>
        </main>
    )
}