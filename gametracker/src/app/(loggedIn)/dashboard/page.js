import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import GameCards from "@/components/games/GameCards"

export default async function DashboardPage() {

    const session = await getServerSession(authOptions);

    return (
        <div className="p-8">
            <h1 className="text-3xl font bold "></h1>
            <p className="mt-4">Aqui você vera sua lista de jogos</p>
            <GameCards />
        </div>
    )
}