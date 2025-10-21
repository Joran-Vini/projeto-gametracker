import { NextResponse } from "next/server";

const MIN_PAGE = 15;
const MAX_PAGE = 35;

export async function GET(request) {
    const apiKey = process.env.RAWG_API_KEY;
    
    const randomPage = Math.floor(Math.random() * (MAX_PAGE - MIN_PAGE + 1)) + MIN_PAGE;

    const url = `https://api.rawg.io/api/games?key=${apiKey}&ordering=-added&page=${randomPage}&page_size=75`;

    try {
        const response = await fetch(url);
         if (!response.ok) {
            throw new Error(`Erro na API da RAWG: ${response.statusText}`);
        }
        const data = await response.json();

        const hiddenGems = data.results.filter(game => 
      game.background_image &&
      game.rating >= 3.8 &&
      game.ratings_count > 35
    );

        return NextResponse.json(hiddenGems);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

}
