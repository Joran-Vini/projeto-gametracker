'use client';

import useFetchGames from "@/hooks/useFetchGames";
import { useParams } from "next/navigation";


export default function GamePage() {
    const params = useParams();


    const {games: game, isLoading, error}= useFetchGames(`/api/games/${params.games}`);
    console.log(game);

    return (
        <div>
            <section className="min-h-[60vh] relative flex items-center justify-center" style={{ backgroundImage: `url(${game.background_image_additional})`}} >
                <div className="absolute inset-0 bg-black/60">
                    <div className="relative z-10 text-center text-white p-4 max-w-4xl mx-auto">
                        <h1 className="font-extrabold text-4xl md:text-6xl tracking-tight">{game.name}</h1>
                        <div className="flex">

                        </div>
                    </div>
                </div>
            </section>
            <section>

            </section>
        </div>
    )
}