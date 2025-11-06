import { NextResponse } from "next/server";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request) {

    const apiKey = process.env.RAWG_API_KEY;
    const url = `https://api.rawg.io/api/games?key=${apiKey}&ordering=-rating&page_size=12&metacritic=90,100&exclude_additions`;

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    let userGamesMap = new Map();

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erro na API da RAWG: ${response.statusText}`);
        }
        const data = await response.json();

        if (userId) {
      
      const rawgIds = data.results.map(game => game.id);
     
      const userGames = await prisma.game.findMany({
        where: {
          userId: userId,
          rawgId: { in: rawgIds } 
        },
        select: { rawgId: true, id: true, status: true } 
      });

      userGames.forEach(game => {
        userGamesMap.set(game.rawgId, { dbId: game.id, status: game.status });
      });
    }
    
        const finalGames = data.results.map(game => ({
      ...game, 
      dbId: userGamesMap.get(game.id)?.dbId || null,
      statusInCollection: userGamesMap.get(game.id)?.status || null,
    }));


        return NextResponse.json(finalGames, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}