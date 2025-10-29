'use client';

import { useEffect, useState } from "react";


export default function UserInputRating({rating=0, onRatingChange }) {

    const [currentRating, setCurrentRating] = useState(rating);

    useEffect(() => {
        setCurrentRating(parseFloat(rating).toFixed(1));
    }, [rating]);

    function handleInputChange(event) {
        let value = event.target.value;

        if (value === '' || value === '.') {
            setCurrentRating(value); 
            return;
        }
        let numValue = parseFloat(value);

        if (isNaN(numValue)) {
            numValue = 0; // Se não for número, volta pra 0
        } else if (numValue < 0) {
            numValue = 0;
        } else if (numValue > 10) {
            numValue = 10;
        }
        
        // Atualiza o estado com o número validado
        setCurrentRating(numValue);
    }

    function handleOnBlur() {
        let numValue = parseFloat(currentRating);
        if (isNaN(numValue) || numValue < 0) {
            numValue = 0;
        }
        setCurrentRating(numValue.toFixed(1));
    }

    function handleOnSaveClick() {
        const finalRating = parseFloat(currentRating); 
        if (!isNaN(finalRating)) { // Só salva se for um número válido
             onRatingChange(finalRating);
        } else {
             onRatingChange(0); // Ou algum tratamento de erro
        }
    }

    return (
        <div className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg">
            <input type="number" min="0" max="10" step="1" value={currentRating} onChange={handleInputChange} onBlur={handleOnBlur} className="w-24 px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"/>
            <button onClick={handleOnSaveClick} className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors text-sm font-semibold">
                Salvar sua Avaliação
            </button>
        </div>
    )
}