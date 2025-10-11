import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import TopGameList from "@/components/games/TopGameList"
import RecentGamesList from '@/components/games/RecentGamesList';

export default async function DashboardPage() {

    const session = await getServerSession(authOptions);

    return (
        <div className="p-8">
            <div>
                <h1 className="text-3xl font bold ">Bem vindo {session.user.username}</h1>
                <p className="mt-4">Aqui você vera sua lista de jogos</p>
            </div>
            <h2>Jogos Excelentes que talvez você não tenha jogado.</h2>
            <TopGameList />
            <h2>Jogos Recentes</h2>
            <RecentGamesList />
        </div>
    )
}