'use client';

import Carousel from './Carousel';
import GameCard from './GameCard';
import useFetchGames from "@/hooks/useFetchGames";
import CardSkeleton from './CardSkeleton';
import Link from 'next/link';

export default function GameList({ url }) {
  const {games, isLoading, error} = useFetchGames(url);

  if (isLoading) {
    // Retorna um GameCard fantasma
    return (
    <div className="flex overflow-x-auto space-x-6 p-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex-shrink-0">
          <CardSkeleton />
        </div>
      ))}
    </div>
  );
  }
   if (error) {
    return <p className="text-center text-red-400 h-96 flex items-center justify-center">Falha ao carregar jogos.</p>;
  }

    return (
        <Carousel>
          {games.map(game => (
        <div key={game.id} className="flex-shrink-0">
          <Link href={`/games/${game.slug}`}>
              <GameCard game={game} />
          </Link>
        </div>
      ))}
        </Carousel>
    )
}