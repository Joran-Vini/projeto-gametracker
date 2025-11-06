'use client';

import useFetchGames from "@/hooks/useFetchGames";
import GameDetailsRightSide from "./GameDetailsRightSide";
import GameList from "@/components/games/GameList";
import { useParams } from "next/navigation";
import ScreenshotCarousel from "@/components/games/gameDetails/ScreenshotsCarousel";
import UserInputRating from "./UserInputRating";
import toast from "react-hot-toast";
import StatusSelector from "./StatusSelector";

export default function GameDetailPage() {
    const params = useParams();
   
    const identifier = params.games;

    const {games: game, isLoading, error}= useFetchGames(identifier ? `/api/games/gameDetails/${identifier}` : null);
   
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

    async function handleRatingChange(newRating) {
        const loadingToastId = toast.loading('Atualizando sua avaliação...');
        try {
            const response = await fetch('/api/my-games', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({
                    rawgId: game.id,
                    userRating: newRating,
                })
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error || 'Erro desconhecido ao atualizar a avaliação.');
            }
            toast.success('Avaliação atualizada com sucesso!', { id: loadingToastId });
            window.location.reload();
        } catch (error) {
            console.error("Erro ao atualizar a avaliação do jogo:", error);
            toast.error(`Erro: ${error.message}`, { id: loadingToastId });
        }
    } 

    return (
    <div className="text-white bg-gray-900">
        {/* --- SEÇÃO HERÓI (IMAGEM E GRADIENTE) --- */}
        <section
            className="relative min-h-[50vh] bg-cover bg-center"
            style={{ backgroundImage: `url(${game.background_image_additional || game.background_image})` }}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
        </section>

        {/* --- SEÇÃO PRINCIPAL UNIFICADA (TÍTULO/BOTÃO + GRID DE 3 COLUNAS) --- */}
        <section className="relative z-10 -mt-16 md:-mt-24">
            <div className="container mx-auto p-8">
                
                {/* 1. TÍTULO E BOTÃO ADICIONAR (Centralizados no topo) */}
                <div className="text-center mb-12 space-y-4">
                    <h1 className="font-extrabold text-4xl md:text-6xl tracking-tight">
                        {game.name}
                    </h1>
                    <StatusSelector gameData={game} initialStatus={game.statusInCollection} dbId={game.dbId} />
                </div>

                {/* 2. LAYOUT DE 3 COLUNAS (GRID) */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">

                    {/* COLUNA DA ESQUERDA (3/12): Nota do Usuário (Placeholder) */}
                    <div className="md:col-span-3">
                        <h3 className="text-2xl font-bold mb-4">Sua Avaliação</h3>
                        <div className="bg-gray-800 p-4 rounded-lg text-center">
                            <UserInputRating rating={game.userRating ?? 0}  onRatingChange={handleRatingChange}/>
                        </div>
                    </div>

                    {/* COLUNA CENTRAL (6/12): Lançamento + Descrição */}
                    <div className="md:col-span-6 space-y-8">
                        {/* Info Lançamento */}
                        <div>
                            {game.released && game.developers?.[0] && (
                                <span className="text-lg text-gray-400 block mb-6">
                                    Lançado em {new Date(game.released).toLocaleDateString('pt-BR')} por {game.developers[0].name}
                                </span>
                            )}
                        </div>
                        {/* Descrição */}
                        <div>
                            <h2 className="text-3xl font-bold mb-4">Sobre o Jogo</h2>
                            <p className="text-sm text-gray-500 mb-2 italic">(Descrição original em inglês, fornecida pela API)</p>
                            <p className="leading-relaxed text-gray-300 text-lg whitespace-pre-wrap">{game.description_raw}</p> 
                        </div>
                    </div>

                    {/* COLUNA DA DIREITA (3/12): Sidebar */}
                    <div className="md:col-span-3">
                        <GameDetailsRightSide game={game} /> 
                    </div>

                </div> 
                
                {/* --- PRATELEIRAS DE JOGOS (Continuam abaixo e fora do grid) --- */}
                <div className="mt-16 space-y-12">
                    {/* Jogos da Franquia */}
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Jogos da Franquia</h2>
                        {/* Use o nome correto do seu componente de carrossel */}
                        {game && (<GameList url={`/api/games/${game.id}/series`}/>)} 
                    </div> 
                    {/* Capturas do Jogo */}
                    <div>
                        <h2 className="text-3xl font-bold mb-4">Galeria</h2>
                        {game && <ScreenshotCarousel gameId={game.id} />} 
                    </div> 
                </div> 
            </div> {/* Fim do container */}
        </section>
    </div>
);
}