'use client';

import toast from "react-hot-toast";

export default function useAddGame() {
    const addGameToCollection = async (game) => {
        if (!game || !game.id || !game.name) {
        toast.error('Dados do jogo inválidos para adicionar.');
        return false;
    }

    const loadingToastId = toast.loading('Adicionando à sua coleção...');

    try {
        
        const response = await fetch('/api/my-games', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(game),
        })
        const data = await response.json();
        if (!response.ok) {
           throw new Error(data.error || 'Erro desconhecido ao adicionar o jogo.');
        }
        
        toast.success('Jogo adicionado com sucesso!', { id: loadingToastId });
        return true;
    } catch(error) {
        console.error("Erro ao adicionar o jogo:", error);
        toast.error(`Erro: ${error.message}`, { id: loadingToastId });
        return false;
    }
    }
    return { addGameToCollection }
}