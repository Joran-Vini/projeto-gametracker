'use client';

import ProfileGameList from "@/components/games/ProfileGameList";
import { useSearchParams } from "next/navigation";

const statusTitles = {
  PLAYING: "Jogando Atualmente",
  COMPLETED: "Jogos Finalizados",
  BACKLOG: "Sua Lista de Espera (Backlog)",
  WISHLIST: "Sua Lista de Desejos"
};

export default function MyGamesPage() {

    const searchParams = useSearchParams();
    const status = searchParams.get('status');
    const title = status ? statusTitles[status] : "Minha Coleção Completa";

    return (
        <main className="container mx-auto p-8 text-white">
            <h1 className="text-4xl font-bold mb-8">{title}</h1>
            <ProfileGameList status={status}/>
        </main>
    )
}