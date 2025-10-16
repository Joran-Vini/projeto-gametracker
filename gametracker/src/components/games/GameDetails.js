'use client';

import useFetchGames from "@/hooks/useFetchGames";
import MetacriticBadge from '@/components/games/MetaCriticBadge'
import { SiMetacritic } from "react-icons/si";
import { Monitor, Gamepad } from 'lucide-react';
import GameList from "@/components/games/GameList";
import { useParams } from "next/navigation";


export default function GameDetailPage() {
    const params = useParams();
    const {games: game, isLoading, error}= useFetchGames(`/api/games/gameDetails/${params.games}`);
   
    //Checar se pagina esta carregando
     if (isLoading) {
        return <p className="text-white text-center p-8">Carregando...</p>;
    }

    //Verificação de erro
    if (error) {
        return <p className="text-red-500 text-center p-8">Erro ao carregar o jogo.</p>;
    }
    
    //Se o jogo não for encontrado, 'game' pode ser nulo
    if (!game) {
      return <p className="text-white text-center p-8">Jogo não encontrado.</p>;
    }

    return (
        <div className="text-white bg-gray-900">
        <section
            className="relative min-h-[70vh] bg-cover bg-center"
            style={{ backgroundImage: `url(${game.background_image_additional || game.background_image})` }}
        >
            {/* O overlay com gradiente continua aqui para a transição suave */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
        </section>

        <section className="relative z-10 -mt-20"> 
            <div className="container mx-auto p-8">
                <h1 className="font-extrabold text-4xl md:text-6xl tracking-tight mb-4">
                    {game.name}
                </h1>

                <div className="flex justify-between items-start gap-4">
                    {/* Lado Esquerdo */}
                    <div>
                        {game.released && game.developers?.[0] && (
                            <span className="text-lg text-gray-400">
                                Lançado em {new Date(game.released).toLocaleDateString('pt-BR')} por {game.developers[0].name}
                            </span>
                        )}
                    </div>    
                     <div className="md:col-span-2">
                    <h2 className="text-3xl font-bold mb-4">Sobre o Jogo</h2>
                    <p className="text-sm text-gray-500 mb-2 italic">(Descrição original em inglês, fornecida pela API)</p>
                    <p className="leading-relaxed text-gray-300 text-lg">{game.description_raw}</p>
                    </div>
                    {/* Lado Direito */}
                    <div className="flex flex-col items-end gap-4">
                        <div className="flex items-center gap-3">
                            <SiMetacritic size={80} />
                            <MetacriticBadge score={game.metacritic} />
                        </div>
                         <h3 className="text-lg font-semibold text-gray-300">Gêneros</h3>
                        <div className="flex gap-2 flex-wrap justify-end max-w-xs">
                            {game.genres?.map((genre) => (
                                <span key={genre.id} className="bg-gray-800 rounded-full px-4 py-2 text-base">
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                        <div className="mb-4">
                            <h4 className="font-bold text-xl mb-2">Plataformas</h4>
                            <div className="flex flex-col">
                                {game.platforms?.map((platform) => {
                                    const platformName = platform.platform.name;
                                    let IconComponent = Gamepad;
                                    if (platformName.includes('PC') || platformName.includes('Windows') || platformName.includes('Linux') || platformName.includes('macOS')) {
                                    IconComponent = Monitor; }
                                    return(
                                    <div key={platform.platform.id} className="flex items-center bg-gray-700 rounded-full px-3 py-1 text-sm text-gray-200 gap-1">
                                        <IconComponent size={16} />
                                        <p>{platformName}</p>
                                    </div>
                                )})}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="container mx-auto p-8">
            <div className="mt-12">
                <h2 className="text-3xl font-bold mb-4">Jogos da Franquia</h2>
                {game && (
                        <GameList url={`/api/games/${game.id}/series`}/>
                    )}
            </div> 
             
        </section>
    </div>
    )
}