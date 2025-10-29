import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

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

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id || null;

    const url = `https://api.rawg.io/api/games/${game}?key=${apiKey}`;
    
    try {
        
        const response = await fetch(url);
       
        if (!response.ok) {
            throw new Error('Erro ao pegar dados na API');
        }
        const data = await response.json();
        
        let userGameData = null;
        if (userId && data.id) { // Só buscamos se tivermos userId e o rawgId
            userGameData = await prisma.game.findFirst({
                where: {
                    userId: userId,
                    rawgId: data.id, // Procuramos pelo ID da RAWG
                }
            });
        }
        const combinedGameData = {
            ...gameDataFromRawg, // Começamos com todos os dados da RAWG
            userRating: userGameData?.userRating ?? null, // Adicionamos a nota do usuário (ou null)
            statusInCollection: userGameData?.status ?? null, // Adicionamos o status (ou null)
            // Adicionamos o ID do nosso banco, se existir, pode ser útil
            dbId: userGameData?.id ?? null, 
        };

        return NextResponse.json(data)

    } catch(error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}