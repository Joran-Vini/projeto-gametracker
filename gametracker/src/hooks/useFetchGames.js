'use client';

import { useEffect, useState } from "react";

export default function useFetchGames(url) {
    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null);
    useEffect(() => {
        async function fetchGames(){
        setIsLoading(true);
        setError(null);
    try {
            const response = await fetch(url);
                
            if (!response.ok) {
                throw new Error("Erro ao pegar dados da API");
                }
                const data = await response.json();
                setGames(data);
            } catch (error) {
                console.error(error);
                setError(error.message);
            }
            finally {
                setIsLoading(false);
            }}
            fetchGames()
    }, 
    [url]);
    return { games, isLoading, error };
        }