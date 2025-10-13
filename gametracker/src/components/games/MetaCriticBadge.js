const getRatingColor = (metacritic) => {
    if (metacritic >= 75) return 'bg-green-600 text-white';
    if (metacritic >= 50) return 'bg-yellow-500 text-black';
    if (metacritic > 0) return 'bg-red-600 text-white';
    return 'bg-gray-500 text-white';
};

export default function MetacriticBadge({ score }) {
    if (!score) return null; // Não renderiza nada se não houver nota

    return (
        <div className={`flex items-center justify-center w-20 h-20 rounded-lg font-bold text-4xl ${getRatingColor(score)}`}>
            {score}
        </div>
    );
}