import { NextResponse } from "next/server";

export async function GET(request, {params}) {
    
    const apiKey = process.env.RAWG_API_KEY;
    const game = params.gameDetails;
    const url = `https://api.rawg.io/api/games/${game}?key=${apiKey}`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Erro ao pegar dados na API');
        }
        const data = await response.json();
        return NextResponse.json(data)

    } catch(error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}