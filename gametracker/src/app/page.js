'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react'; // Ícone para o botão
import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function HomePage() {
  useEffect(() => {
     async function getGames() {
      const { data, error } = await supabase
        .from('games') // Nome da sua tabela
        .select('*'); // Seleciona todas as colunas
      
      if (error) {
        console.error('Erro ao buscar jogos:', error);
      } else {
        console.log('Jogos encontrados:', data);
      }
    }

    getGames();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 text-white">
      <div className="container mx-auto flex flex-col items-center justify-center gap-6 p-8 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">
            Organize. Jogue. Conquiste.
          </span>
        </h1>
        <p className="max-w-2xl text-lg text-gray-400 md:text-xl">
          Bem-vindo ao GamesTracker, a sua central definitiva para acompanhar todos os jogos da sua lista. Nunca mais se esqueça de um título!
        </p>
        <Link 
          href="/register" 
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-sky-500 px-6 py-3 text-lg font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Comece Agora Gratuitamente
          <ArrowRight className="h-5 w-5" />
        </Link>

      </div>
    </main>
  );
}