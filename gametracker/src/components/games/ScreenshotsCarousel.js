'use client';

import useFetchGames from "@/hooks/useFetchGames";
import Carousel from './Carousel';
import ScreenshotExpanded from "./ScreenshotExpanded";
import Image from "next/image";
import { useState } from "react";


export default function ScreenshotsCarousel({ gameId }) {
    const [expandedImage, setExpandedImage] = useState(null);
    const url = gameId ? `/api/games/${gameId}/screenshots` : null;
    
    const {games: screenshots, isLoading, error} = useFetchGames(url);
   
     if (isLoading) {
    return (
        <Carousel>
                {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="flex-shrink-0">
                        <div className="h-48 w-80 rounded-lg bg-gray-700 animate-pulse"></div>
                    </div>
                ))}
            </Carousel>
  );
  }
   if (error) {
    return <p className="text-center text-red-400 h-96 flex items-center justify-center">Falha ao carregar jogos.</p>;
  }

  if (!screenshots || screenshots.length === 0) {
    return <p className="text-center text-gray-400 h-96 flex items-center justify-center">Nenhuma screenshot disponível.</p>;
  }

    return (
        <>
            <Carousel>
                {screenshots.map(screenshot => (
                    <div key={screenshot.id} className="flex-shrink-0 relative h-48 w-80 rounded-lg overflow-hidden" onClick={() => setExpandedImage(screenshot.image)}>
                        <Image src={screenshot.image} alt="prints do jogo" className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" fill/>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 text-white text-4xl">
                        🔍
                    </div>
                </div>
                ))}
            </Carousel>
            <ScreenshotExpanded screenshotUrl={expandedImage} onClose={() => setExpandedImage(null)}/>
        </>
    )
}