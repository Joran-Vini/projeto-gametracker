import MetacriticBadge from '@/components/games/MetaCriticBadge'
import { SiMetacritic } from "react-icons/si";
import { Monitor, Gamepad } from 'lucide-react';

export default function GameDetailsRightSide({ game }) {
    return (
        <div className="flex flex-col items-end gap-4">
                        <div className="flex items-center gap-3">
                            <SiMetacritic size={80} />
                            <MetacriticBadge score={game.metacritic} />
                        </div>
                         <h3 className="text-lg font-semibold text-gray-300">Gêneros</h3>
                        <div className="flex gap-2 flex-wrap justify-end max-w-xs">
                            {game.genres?.map((genre) => (
                                <span key={genre.id} className="bg-gray-800 rounded-full px-4 py-2 text-base">
                                    {genre.name}
                                </span>
                            ))}
                        </div>
                        <div className="mb-4">
                            <h4 className="font-bold text-xl mb-2">Plataformas</h4>
                            <div className="flex flex-col">
                                {game.platforms?.map((platform) => {
                                    const platformName = platform.platform.name;
                                    let IconComponent = Gamepad;
                                    if (platformName.includes('PC') || platformName.includes('Windows') || platformName.includes('Linux') || platformName.includes('macOS')) {
                                    IconComponent = Monitor; }
                                    return(
                                    <div key={platform.platform.id} className="flex items-center bg-gray-700 rounded-full px-3 py-1 text-sm text-gray-200 gap-1">
                                        <IconComponent size={16} />
                                        <p>{platformName}</p>
                                    </div>
                                )})}
                            </div>
                        </div>
                    </div>
    )
}