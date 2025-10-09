// src/app/api/search/route.js

import { NextResponse } from 'next/server';

export async function GET(request) {
  // Pega a URL da requisição para extrair os parâmetros de busca
  const { searchParams } = new URL(request.url);
  // Pega o parâmetro 'query' (o que o usuário digitou na busca)
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Nenhum termo de busca fornecido' }, { status: 400 });
  }

  const apiKey = process.env.RAWG_API_KEY;
  const url = `https://api.rawg.io/api/games?key=${apiKey}&search=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Erro na API da RAWG: ${response.statusText}`);
    }
    const data = await response.json();

    // Retorna os resultados para o seu front-end
    return NextResponse.json(data.results);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}