import { NextResponse } from "next/server";

export async function GET(request) {

    const apiKey = process.env.RAWG_API_KEY;
    const urlObject = new URL(request.url);

    const pathSegments = urlObject.pathname.split('/');
    const gameId = pathSegments[pathSegments.length - 2];
    //const gameId = params.gameId;
    const url = `https://api.rawg.io/api/games/${gameId}/game-series?key=${apiKey}`;


    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Erro ao pegar dados na API');;
        }
        const data = await response.json();

        const filteredList = data.results.filter(game => game.ratings_count > 25);
         const sortedList = filteredList.sort((a, b) => b.rating - a.rating);

        return NextResponse.json(sortedList);
    } catch(error) {
         return NextResponse.json({ error: error.message }, { status: 500 });
    }

}