'use client';

import useFetchGames from "@/hooks/useFetchGames";
import ProfileGameCard from "./ProfileGameCard";
import { useMemo } from "react";

export default function ProfileGameList({status}) {
    
    const {games, isLoading, error} = useFetchGames('/api/my-games');
    console.log("ProfileGameList recebeu o status:", status);
    const filteredGames = useMemo(() => {
        console.log("Lista completa recebida:", games);
        if (!games) {
            return [];
        }
        if (status) {
            console.log(`Filtrando por status: '${status}'`);
            return games.filter(game => game.status === status);
        }
        return games;
    }, [games, status]);

    if (isLoading) {
        return <div className="text-center text-gray-400">Carregando jogos...</div>;
    }

    if (error) {
        return <div className="text-center text-red-500">Erro ao carregar seus jogos.</div>;
    }
    if (filteredGames.length === 0) {
        return <div className="text-center text-gray-500">Nenhum jogo encontrado nesta lista.</div>;
    }

    return (
        <div className="flex flex-col gap-4">
            {filteredGames.map((game) => (
                <ProfileGameCard key={game.id} game={game} />
            ))}
        </div>
    )
}