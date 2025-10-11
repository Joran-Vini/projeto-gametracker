import { NextResponse } from "next/server";

export async function GET(request) {

    const apiKey = process.env.RAWG_API_KEY;
    const url = `https://api.rawg.io/api/games?key=${apiKey}&ordering=-rating&page_size=12&metacritic=90,100&exclude_additions`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro na API da RAWG: ${response.statusText}`);
        }
        const data = await response.json();

        return NextResponse.json(data.results);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}