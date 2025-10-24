import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const apiKey = process.env.RAWG_API_KEY;

    //const gameId  = params.gameId;
    const urlObject = new URL(request.url);
    const pathSegments = urlObject.pathname.split('/');
    const gameId = pathSegments[pathSegments.length - 2];
    
    const url = `https://api.rawg.io/api/games/${gameId}/screenshots?key=${apiKey}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Erro ao pegar dados na API');
        }
        const data = await response.json();
        const dataSliced=data.results.slice(0, 10); // Limitar a 10 screenshots

        return NextResponse.json(dataSliced, { status: 200 });
    } catch(error) {
        return NextResponse.json({ error: error.message || 'Erro ao pegar screenshots do jogo'}, { status: 500 });
    }
}