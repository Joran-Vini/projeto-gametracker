import { NextResponse } from "next/server";

export async function GET(request, context) {
    
    const apiKey = process.env.RAWG_API_KEY;
    const urlObject = new URL(request.url);
    // 2. Extraímos o último segmento do caminho (que deve ser o nosso 'gameDetails').
    // Ex: /api/games/gameDetails/the-witcher -> pega 'the-witcher'
    const pathSegments = urlObject.pathname.split('/');
    const game = pathSegments[pathSegments.length - 1]; // Pega o último item

    if (!game) {
        return NextResponse.json({ error: 'Identificador do jogo não fornecido' }, { status: 400 });
    }
    if (!apiKey) {
         return NextResponse.json({ error: 'Chave API não configurada' }, { status: 500 });
    }

    const url = `https://api.rawg.io/api/games/${game}?key=${apiKey}`;
    console.log("[API DETALHES] URL final para RAWG:", url);
    try {
        console.log("[API DETALHES] Fazendo fetch para RAWG...");
        const response = await fetch(url);
        console.log("[API DETALHES] Resposta da RAWG recebida, status:", response.status);

        if (!response.ok) {
            throw new Error('Erro ao pegar dados na API');
        }
        const data = await response.json();
        
        console.log("[API DETALHES] Dados recebidos da RAWG (Nome):", data?.name);

        return NextResponse.json(data)

    } catch(error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}