'use client';

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import UserInputRating from "./gameDetails/UserInputRating";

export default function CompletedGameModal({ isOpen, onClose, onSave }) {
    const userNotes = useRef();
    const [isMounted, setIsMounted] = useState(false);
    const [rating, setRating] = useState(0);
    const [completedDate, setCompletedDate] = useState(new Date().toISOString().split('T')[0]); // Padrão: hoje

    useEffect(() => {
        setIsMounted(true); // O componente foi montado no lado do cliente
    }, []);

    function handleOnClose(event) {
        event.preventDefault();
        event.stopPropagation();
        onClose();
    }
    function handleOnSave(event) {
        event.preventDefault();
        event.stopPropagation();
        const userNotesValue = userNotes.current.value;
        onSave(userNotesValue, rating, completedDate);
    }

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            userNotes.current?.focus();
        } else {
            // Quando o modal fecha, restaura a rolagem
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const modalContent = (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={handleOnClose}>
            <div className="bg-gray-800 text-white w-full max-w-lg rounded-lg shadow-xl p-6 space-y-4" onClick={(event) => event.stopPropagation()}>
                <h2 className="text-2xl font-bold">Parabéns por finalizar!</h2>
                {/* Campo de Data */}
                <div className="space-y-1">
                    <label htmlFor="completeDate" className="text-sm font-medium text-gray-300">Data de Conclusão</label>
                    <input 
                        type="date" 
                        id="completeDate"
                        value={completedDate}
                        onChange={(event) => setCompletedDate(event.target.value)}
                        className="w-full p-2 bg-gray-700 rounded-md text-white border border-gray-600 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                </div>
                {/* Campo de Nota */}
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-300">Sua Avaliação (0-10)</label>
                    {/* Reutilizamos seu componente de input de nota! */}
                    <UserInputRating rating={rating} onRatingChange={setRating} />
                </div>
                {/* Campo de Notas (Textarea) */}
                <p className="text-gray-400">Quer adicionar alguma nota sobre sua experiência? (Opcional)</p>
                <textarea ref={userNotes} rows="5"
                    placeholder="Ex: Demorei 80h, o final foi incrível, mas não gostei da parte na agua" className="w-full p-2 bg-gray-700 rounded-md text-white border border-gray-600 focus:ring-2 focus:ring-sky-500 focus:outline-none" onClick={(event) => event.stopPropagation()}/>
                <div className="flex justify-end gap-4">
                    <button className="px-4 py-2 rounded-md text-gray-300 hover:bg-gray-700 transition-colors" onClick={handleOnClose} >Cancelar</button>
                    <button className="px-4 py-2 rounded-md bg-sky-600 hover:bg-sky-700 text-white font-semibold transition-colors" onClick={handleOnSave}>Salvar</button>
                </div>
            </div>
        </div>
    )

    if (isOpen && isMounted) {
        return createPortal(
            modalContent,
            document.body
        );
    } else {
        return null;
    }
} 