import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import GameList from "@/components/games/GameList"

export default async function DashboardPage() {

    const session = await getServerSession(authOptions);


    return (
        <div className="p-8 space-y-12">
            <div>
                <h1 className="text-3xl font bold ">Bem vindo {session.user.username}</h1>
                <p className="mt-4">Aqui você vera sua lista de jogos</p>
            </div>
            <section>
                <h2 className="text-2xl font-bold border-b border-gray-700 pb-2 mb-4">Jogos Populares que talvez você não tenha jogado.</h2>
                <GameList url='/api/games/top-12-popular'/>
            </section>
            <section>
                <h2 className="text-2xl font-bold border-b border-gray-700 pb-2 mb-4">Jogos Recentes</h2>
                <GameList url='api/games/new' />
            </section>
            <section>
                <h2 className="text-2xl font-bold border-b border-gray-700 pb-2 mb-4">Melhores Jogos Segundo o Metacritic.</h2>
                <GameList url='/api/games/metacritic'/>
            </section>
            <section>
                <h2 className="text-2xl font-bold border-b border-gray-700 pb-2 mb-4">Jogos Subestimados</h2>
                <GameList url='/api/games/hiddenGems'/>
            </section>
        </div>
    )
}