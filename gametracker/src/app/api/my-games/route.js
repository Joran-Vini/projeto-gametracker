import { NextResponse } from "next/server";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET(request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }
    try {
        const userGames = await prisma.game.findMany({
        where: {
            userId: session.user.id,
        },
        orderBy: {
            createdAt: 'desc',
        }
    });
        return NextResponse.json(userGames, { status: 200 });   
    } catch (error) {
        console.error("Erro ao buscar jogos do usuário:", error);
        return NextResponse.json({ error: 'Ocorreu um erro ao buscar os jogos do usuário.' }, { status: 500 });
    }
}

export async function POST(request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }
    

    try {
        const gameData = await request.json();

        const initialStatus = gameData.status || 'BACKLOG';

        if (!gameData.id || !gameData.name) {
            return NextResponse.json({ error: 'Dados do jogo incompletos' }, { status: 400 });
        }

        const validStatuses = ['PLAYING', 'COMPLETED', 'BACKLOG', 'WISHLIST'];
         if (!validStatuses.includes(initialStatus)) {
            return NextResponse.json({ error: 'Status inicial inválido' }, { status: 400 });
        }

        const newGame = await prisma.game.create({data: {
            rawgId: gameData.id,
            title: gameData.name,
            imageUrl: gameData.background_image,
            userId: session.user.id,
            rating: gameData.rating,      
            metacritic: gameData.metacritic, 
            status: initialStatus,
            userNotes: gameData.userNotes || null,
            completedOn: gameData.completedOn ? new Date(gameData.completedOn) : null,
            userRating: gameData.userRating || null,
    }});
        return NextResponse.json(newGame, { status: 201 });

    } catch(error) {
        console.error("Erro ao adicionar jogo:", error);

        // Tratamento para o erro de 'jogo duplicado'
        if (error.code === 'P2002') { // P2002 é o código de erro do Prisma para 'unique constraint failed'
            return NextResponse.json({ error: 'Este jogo já está na sua coleção.' }, { status: 409 }); // 409: Conflito
        }
        
        return NextResponse.json({ error: 'Ocorreu um erro ao adicionar o jogo.' }, { status: 500 });
    }

}

export async function PUT(request) {
    const session = await getServerSession(authOptions);
    if (!session) { 
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
    }
    
    try {
        const {gameId, newStatus, userRating, userNotes, completedOn} = await request.json();

    // Validação: Ver se recebemos os dados necessários
        if (!gameId ) {
            return NextResponse.json({ error: 'ID do jogo é obrigatório' }, { status: 400 });
        }
        if (userRating === undefined && newStatus === undefined) {
            return NextResponse.json({ error: 'Nenhum dado para atualizar fornecido (status ou nota)' }, { status: 400 });
        } 
        if (userNotes !== undefined) {
            dataToUpdate.userNotes = userNotes; 
        }
        if (completedOn !== undefined) {
            dataToUpdate.completedOn = completedOn ? new Date(completedOn) : null;
        }

        
        const dataToUpdate = {};

        if (newStatus !== undefined) {
            // Validação: Ver se o status enviado é válido
        const validStatuses = ['PLAYING', 'COMPLETED', 'BACKLOG', 'WISHLIST'];
        if (!validStatuses.includes(newStatus)) {
            return NextResponse.json({ error: 'Status inválido' }, { status: 400 });
        }
        dataToUpdate.status = newStatus;
        }

        if (userRating !== undefined) {
            const ratingNum = parseFloat(userRating);
            if (isNaN(ratingNum) || ratingNum < 0 || ratingNum > 10) {
                 return NextResponse.json({ error: 'Nota inválida. Deve ser um número entre 0 e 10.' }, { status: 400 });
            }
            dataToUpdate.userRating = ratingNum;
        }

            const updatedGame = await prisma.game.update({
                where: {
                    id: gameId,
                    userId: session.user.id,
                }, 
                data: dataToUpdate
            });
            return NextResponse.json(updatedGame, { status: 200 });
    } catch (error) {
        if (error.code === 'P2025') { // Código de erro do Prisma para "Record to update not found."
            return NextResponse.json({ error: 'Jogo não encontrado ou não pertence a este usuário.' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Ocorreu um erro ao atualizar o jogo.' }, { status: 500 });
    }
}

export async function DELETE(request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: 'Não autorizado' }, { status: 401 }); }

    const {searchParams} = new URL(request.url);
    const gameId = searchParams.get('gameId');

    if (!gameId) {
        return NextResponse.json({ error: 'ID do jogo é obrigatório' }, { status: 400 });
    }
    try {
        await prisma.game.delete({
            where: {
                    id: parseInt(gameId),
                    userId: session.user.id,
                }
        });
        return NextResponse.json({ message: 'Jogo removido com sucesso.' }, { status: 200 });
    } catch (error) {
        console.error("Erro ao deletar jogo:", error);
        if (error.code === 'P2025') { // Jogo não encontrado
            return NextResponse.json({ error: 'Jogo não encontrado ou não pertence a este usuário.' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Ocorreu um erro ao deletar o jogo.' }, { status: 500 });
    }
}