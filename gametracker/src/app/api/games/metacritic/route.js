import { NextResponse } from "next/server";

export async function GET(request) {
    const apiKey = process.env.RAWG_API_KEY;
    const url = `https://api.rawg.io/api/games?key=${apiKey}&ordering=-metacritic&page_size=15&exclude_additions=true`;

    try {
        const response = await fetch(url);
         if (!response.ok) {
            throw new Error(`Erro na API da RAWG: ${response.statusText}`);
        }
        const data = await response.json();

        const filteredGames = data.results.filter(game => game.rating > 4 && game.ratings_count > 175);

        return NextResponse.json(filteredGames);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}