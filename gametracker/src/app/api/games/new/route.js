import { NextResponse } from "next/server";

export async function GET(request) {
    const apiKey = process.env.RAWG_API_KEY;
    
    const today = new Date();
    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(today.getDate() - 60);

  const formattedToday = today.toISOString().split('T')[0];
  const formattedSixtyDaysAgo = sixtyDaysAgo.toISOString().split('T')[0];
  
  const dates = `${formattedSixtyDaysAgo},${formattedToday}`;

  const url = `https://api.rawg.io/api/games?key=${apiKey}&dates=${dates}&ordering=-added&page_size=12`;

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