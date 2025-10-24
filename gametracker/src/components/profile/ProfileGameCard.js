'use client';

import { useState } from "react";
import MetacriticBadge from "../games/MetaCriticBadge";
import { MoreHorizontal } from "lucide-react";
import ProfileGameCardButton from "./ProfileGameCardButton";

export default function ProfileGameCard({ game }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    function handleOnClick() {
        setIsMenuOpen((prevState) => !prevState);
    }

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
            <div className="relative">
                <button className="p-2 rounded-full hover:bg-gray-700" onClick={handleOnClick} aria-label="Opções do jogo">
                    <MoreHorizontal className="text-gray-400" />
                </button>
                <ProfileGameCardButton isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} game={game}/>
            </div>

        </div>
    )
}