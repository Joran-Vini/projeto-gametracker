'use client';

import { useEffect, useState } from "react"
import Carousel from './Carousel';
import GameCard from './GameCard';
import useFetchGames from '@/hooks/useFetchGames';


export default function RecentGamesList() {
    const {games, isLoading, error} = useFetchGames('api/games/new');

    if (isLoading) {
    return <p className="text-center text-gray-400">Carregando jogos...</p>
  }
  if (error) {
    return <p className="text-center text-red-400 h-96 flex items-center justify-center">Falha ao carregar jogos.</p>;
  }
    return (
        <Carousel>
          {games.map(game => (
        <div key={game.id} className="flex-shrink-0">
          <GameCard game={game} />
        </div>
      ))}
        </Carousel>
    )
}