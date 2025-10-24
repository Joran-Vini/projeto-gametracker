'use client';

import Image from "next/image";

export default function ScreenshotExpanded({ screenshotUrl, onClose }) {

    if (!screenshotUrl) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 cursor-zoom-out" onClick={onClose}>
            <div className="relative max-w-4xl max-h-4/5 w-full h-full p-4 flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <Image fill src={screenshotUrl} alt="Imagem Expandida" className="object-contain rounded-lg shadow-lg" sizes="(max-width: 768px) 90vw, (max-width: 1200px) 80vw, 70vw"/>
            {/* Botão de fechar */}
        <button className="absolute top-4 right-4 text-white text-3xl font-bold bg-gray-800 bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75 transition-all duration-200" onClick={onClose}>
          &times; {/*"X"*/}
        </button>
        </div>
    </div>
    );
}