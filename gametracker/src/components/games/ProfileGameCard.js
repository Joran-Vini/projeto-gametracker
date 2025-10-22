'use client';

import { useState } from "react";
import MetacriticBadge from "./MetaCriticBadge";
import { MoreHorizontal, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfileGameCard({ game }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    function handleOnClick() {
        setIsMenuOpen((prevState) => !prevState);
    }
    async function handleStatusChange(newStatus) {
        setIsMenuOpen(false);
        const loadingToastId = toast.loading('Atualizando status...');
        try {
            const response = await fetch('/api/my-games', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                }, 
                body: JSON.stringify({ gameId: game.id , gameStatus: newStatus})
            });
            if (!response.ok) {
                throw new Error('Erro ao atualizar status do jogo.');
            }
            const data = await response.json(); 
            toast.success('Status atualizado com sucesso!', { id: loadingToastId });

        } catch(error) {
            console.error("Erro ao atualizar status do jogo:", error);
            toast.error(`Erro: ${error.message}`, { id: loadingToastId });
        }
    }
    async function handleDeleteGame() {
        setIsMenuOpen(false);
        if (!window.confirm(`Tem certeza que deseja remover "${game.title}" da sua coleção?`)) {
            return; // Cancela se o usuário clicar em "Cancelar"
        }
        const loadingToastId = toast.loading('Removendo jogo...');
        try {
            const response = await fetch(`/api/my-games?gameId=${game.id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Erro ao remover o jogo.');
            }
            const data = await response.json();
            toast.success('Jogo removido com sucesso!', { id: loadingToastId });
            
            window.location.reload();
        } catch (error) {
            toast.error(`Erro: ${error.message}`, { id: loadingToastId });
            console.error("Erro ao remover o jogo:", error);
        }
    }

    return (
        <div className="flex w-full items-center gap-4 bg-gray-800 p-4 rounded-lg">
            <div className="w-20 h-24 flex-shrink-0 bg-cover bg-center rounded-md" style={{ backgroundImage: `url(${game.imageUrl})`}}>

            </div>
            <div className="flex-grow">
                <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold mb-1">
                        {game.title}
                    </h3>
                    <MetacriticBadge score={game.metacritic} />
                </div>
            </div>
            <div className="relative">
                <button className="p-2 rounded-full hover:bg-gray-700" onClick={handleOnClick} aria-label="Opções do jogo">
                    <MoreHorizontal className="text-gray-400" />
                </button>
                {isMenuOpen && <div className="absolute right-0 mt-2 z-10 w-48 bg-gray-900 border border-gray-700 rounded-md shadow-lg py-1">
                    <button onClick={() => handleStatusChange('PLAYING')} className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">Jogando Atualmente</button>
                    <button onClick={() => handleStatusChange('COMPLETED')} className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">Jogos Completados</button>
                    <button onClick={() => handleStatusChange('WISHLIST')} className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">Lista de Desejo</button>
                    <div className="border-t border-gray-700 my-1"></div> 

                        {/* Botão Remover */}
                        <button 
                            onClick={handleDeleteGame}
                            className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/50" // Cor vermelha
                        >
                            <Trash2 size={16} /> {/* Ícone de lixeira */}
                            Remover da Coleção
                        </button>
                </div>}
            </div>

        </div>
    )
}