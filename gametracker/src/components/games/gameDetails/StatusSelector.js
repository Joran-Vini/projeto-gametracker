'use client';

import { ChevronDown, Plus } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

const statusLabels = {
    PLAYING: "Jogando",
    COMPLETED: "Finalizado",
    BACKLOG: "No Backlog",
    WISHLIST: "Lista de Desejos"
};

export default function StatusSelector({ gameData, initialStatus, dbId }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const currentStatus = initialStatus;

    async function handleStatusChange(newStatus) {
        setIsMenuOpen(false);
        let loadingToastId;
        try {
            let response;
            let bodyData;
            let method;
            let successMessage;

            if (dbId) { // Atualizar (PUT)
                loadingToastId = toast.loading(`Movendo para ${statusLabels[newStatus]}...`);
                method = 'PUT';
                bodyData = { gameId: dbId, newStatus: newStatus };
                successMessage = 'Status atualizado!';
            } else { // Adicionar (POST)
                loadingToastId = toast.loading(`Adicionando aos ${statusLabels[newStatus]}...`);
                method = 'POST';
                bodyData = { ...gameData, status: newStatus };
                successMessage = 'Jogo adicionado!';
            }
            response = await fetch('/api/my-games', {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyData)
            });
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({})); // Tenta ler erro JSON
                throw new Error(errorData.error || `Erro ${response.status}`);
            }

             toast.success(successMessage, { id: loadingToastId });
             window.location.reload(); // Recarrega para ver a mudança
        }
        catch (error) {
        console.error("Erro ao atualizar o status do jogo:", error);
        toast.error('Erro ao atualizar o status do jogo.', { id: loadingToastId });
    }
    } 
    console.log("Initial Status:", initialStatus);
    return (
        <div className="relative inline-block text-left">
            <button onClick={() => setIsMenuOpen(prevState => !prevState)} className="inline-flex items-center justify-center gap-2 rounded-lg bg-sky-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-gray-900">
                {currentStatus ? (
                    <>
                    <span>{statusLabels[currentStatus]}</span>
                    <ChevronDown size={20} />
                    </>
                ) : (
                    <>
                    <Plus size={20} />
                    <span>Adicionar à Coleção</span>
                    </>
                )}
            </button>
            {isMenuOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 z-20 w-56 origin-top-right rounded-md bg-gray-900 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-gray-700"> 
                    <div className="py-1" role="menu" aria-orientation="vertical">
                        {/* Opções do Menu */}
                        {Object.entries(statusLabels).map(([statusKey, statusLabel]) =>  (
                            <button key={statusKey} onClick={() => handleStatusChange(statusKey)} className={`block w-full text-left px-4 py-2 text-sm ${
                                    currentStatus === statusKey 
                                    ? 'bg-sky-700 text-white' // Destaca o status atual
                                    : 'text-gray-200 hover:bg-gray-700'
                                }`}
                                role="menuitem">
                                    {statusLabel}
                            </button>
                        ))}

                    </div>
                </div>
            )}
        </div>
    )
}