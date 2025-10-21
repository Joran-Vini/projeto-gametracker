import MetacriticBadge from "./MetaCriticBadge";
import { MoreHorizontal } from "lucide-react";

const mockGame = {
  id: 1,
  title: "The Witcher 3: Wild Hunt",
  imageUrl: "https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg",
  metacritic: 93,
  status: 'PLAYING',
};

export default function ProfileGameList({ game=mockGame }) {
    return (
        <div className="flex w-full items-center gap-4 bg-gray-800 p-4 rounded-lg">
            <div className="w-20 h-24 flex-shrink-0 bg-cover bg-center rounded-md" style={{ backgroundImage: `url(${game.imageUrl})`}}>

            </div>
            <div className="flex-grow">
                <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-bold mb-1">
                        {game.title}
                    </h3>
                    <MetacriticBadge score={game.metacritic} />
                </div>
            </div>
            <div>
                <button className="p-2 rounded-full hover:bg-gray-700">
                    <MoreHorizontal className="text-gray-400" />
                </button>
            </div>

        </div>
    )
}