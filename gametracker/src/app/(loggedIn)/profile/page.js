import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { CheckCircle, Gamepad2, UserCircle2, Gamepad, Gift } from "lucide-react";
import Link from "next/link";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);

    
    const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
     });
    const userGames = await prisma.game.findMany({
    where: { userId: session.user.id },
    });

    const totalGames = userGames.length;
    const completedGames = userGames.filter(game => game.status === 'COMPLETED').length;
    const playingGames = userGames.filter(game => game.status === 'PLAYING').length;
    const wishlist = userGames.filter(game => game.status === 'WISHLIST').length;

     const joinDate = new Date(user.createdAt).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

    return (
    <main className="container mx-auto p-8 text-white">
      <div className="bg-gray-800 rounded-lg p-6 flex items-center space-x-6 mb-12">
        {/* Seção cabeçalho usuario */}
        <div className="flex-shrink-0">
            <div className="h-24 w-24 rounded-full bg-gray-700 flex items-center justify-center">
                <UserCircle2 size={48} className="text-gray-500" />
            </div>
        </div>
        <div>
            <h2 className="text-3xl font-bold">{user.username}</h2>
            <p className="text-gray-400">Membro desde {joinDate}</p>
        </div>
      </div>

      {/* Seção de estatisticas */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Suas Estatísticas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Card de Stat: Total de Jogos */}
          <Link href="/profile/my-games">
              <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center transition-transform hover:scale-105 cursor-pointer">
                <Gamepad2 size={32} className="text-sky-400" />
                <span className="text-4xl font-bold mt-2">{totalGames}</span>
                <span className="text-sm text-gray-400">Jogos na Coleção</span>
              </div>
          </Link>
          {/* Card de Stat: Jogos Finalizados */}
          <Link href="/profile/my-games?status=COMPLETED"> 
              <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center transition-transform hover:scale-105 cursor-pointer">
                <CheckCircle size={32} className="text-green-400" />
                <span className="text-4xl font-bold mt-2">{completedGames}</span>
                <span className="text-sm text-gray-400">Finalizados</span>
              </div>
          </Link>
           {/* Card de Stat: Jogos Atualmente jogando */}
          <Link href="/profile/my-games?status=PLAYING">
              <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center transition-transform hover:scale-105 cursor-pointer">
                <Gamepad size={32} className="text-yellow-400" />
                <span className="text-4xl font-bold mt-2">{playingGames}</span>
                <span className="text-sm text-gray-400">Jogando</span>
              </div>
          </Link>
           {/* Card de Stat: Jogos Lista de Desejo */}
          <Link href="/profile/my-games?status=WISHLIST">
              <div className="bg-gray-800 p-4 rounded-lg flex flex-col items-center justify-center transition-transform hover:scale-105 cursor-pointer">
                <Gift size={32} className="text-pink-400" />
                <span className="text-4xl font-bold mt-2">{wishlist}</span>
                <span className="text-sm text-gray-400">Lista de Desejo</span>
              </div>
          </Link>

        </div>
      </section>
    </main>
    )
}