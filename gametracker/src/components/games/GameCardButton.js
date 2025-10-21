'use client';


import { Plus } from 'lucide-react';
import toast from 'react-hot-toast';

export default function GameCardButton({ game }) {
    async function handleOnClick(event) {
    event.preventDefault();
    event.stopPropagation();

    const loadingToastId = toast.loading('Adicionando à sua coleção...');

  try {
    const response = await fetch('/api/my-games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(game),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Algo deu errado.');
    }
    toast.success('Jogo adicionado com sucesso!', { id: loadingToastId });
  } catch (error) {
    toast.error(`Erro: ${error.message}`, { id: loadingToastId });
  }
};

    return (
        <button className="rounded-full bg-sky-500 p-2 text-white opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all" onClick={handleOnClick}>
                <Plus />
              </button>
    )
}