'use client';

import {useEffect, useState } from "react";
import Carousel from './Carousel';
import GameCard from './GameCard';

export default function TopGameList() {
  const [games, setGames] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchGames() {
      setIsLoading(true)
      try {
      const response = await fetch('/api/games/top-12-popular');
      if (!response.ok) {
        throw new Error('Erro ao dar fetch no top 10 jogos');
      }
      const data = await response.json();
      setGames(data);
      } catch(error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchGames();
  }, []);

  if (isLoading) {
    return <p className="text-center text-gray-400">Carregando jogos...</p>
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