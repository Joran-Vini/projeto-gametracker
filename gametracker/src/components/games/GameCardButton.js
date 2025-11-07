'use client';


import { Check, Plus } from 'lucide-react';
import useAddGame from '../../hooks/useAddGame';
import { useState } from 'react';
import CompletedGameModal from './CompletedGameModal';

const statusLabels = {
    PLAYING: "Jogando",
    COMPLETED: "Finalizado",
    BACKLOG: "No Backlog",
    WISHLIST: "Lista de Desejos"
};

export default function GameCardButton({ game }) {
  const { addGameToCollection } = useAddGame();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

    function handleToggleMenu(event) {
      event.preventDefault();
      event.stopPropagation();
      setIsMenuOpen((prevState) => !prevState);
};

    async function handleAddWithStatus(event, newStatus) {
        event.preventDefault();
        event.stopPropagation();
        setIsMenuOpen(false);

        if (newStatus === 'COMPLETED') {
            setIsModalOpen(true);
        } else {
            const gameData = {
          ...game,
          status: newStatus
        }
        await addGameToCollection(gameData);
        }

    }

    async function handleOnSaveModal(userNotes, newRating, completionDate) {
        setIsModalOpen(false);

        const gameData = {
            ...game,
            status: 'COMPLETED',
            userNotes: userNotes,
            completedOn: completionDate,
            userRating: newRating,
        };

        await addGameToCollection(gameData);
    }

    const isInCollection = game.statusInCollection !== null && game.statusInCollection !== undefined;

    return (
        <div>
          <button className="rounded-full bg-sky-500 p-2 text-white opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 transition-all" onClick={handleToggleMenu} disabled={isInCollection}>
                  {isInCollection ? <Check /> : <Plus />}
                </button>
            {isMenuOpen && (
            <div className="absolute right-0 mt-1 w-48 bg-gray-900 border border-gray-700 rounded-md shadow-lg py-1">
            {/* Usamos Object.entries para pegar chave e valor do statusLabels */}
            {Object.entries(statusLabels).map(([statusKey, statusLabel]) => (
                <button
                    key={statusKey}
                    onClick={(event) => handleAddWithStatus(event, statusKey)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">
                    Adicionar a {statusLabel}
                </button>
            ))}
        </div>
    )}
        <CompletedGameModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleOnSaveModal} />
        </div>
    )
}