'use client'

import GameList from "@/components/games/GameList";
import { useSearchParams } from "next/navigation"

export default function SearchedPage() {
    const searchParams = useSearchParams();
    const query = searchParams.get('query');

    return (
        <div className="p-8 space-y-12">
            <h1 className="text-3xl font-bold">Você procurou por {query}</h1>
            <GameList url={`api/search?query=${query}`} />
        </div>
    )
}