'use client';


import { Plus } from 'lucide-react';
import useAddGame from '../../hooks/useAddGame';

export default function GameCardButton({ game }) {
  const { addGameToCollection } = useAddGame();

    async function handleOnClick(event) {
    event.preventDefault();
    event.stopPropagation();

    await addGameToCollection(game);
};

    return (
        <button className="rounded-full bg-sky-500 p-2 text-white opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all" onClick={handleOnClick}>
                <Plus />
              </button>
    )
}