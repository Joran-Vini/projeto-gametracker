import GamecardConsoleSymbol from './GameCardConsoleSymbol';
import GameCardButton from './GameCardButton';


function getRatingColor(rating) {
    if (rating >= 4) return 'bg-green-500';
    if (rating >= 3) return 'bg-yellow-500';
    return 'bg-red-500';
}

export default function GameCard({ game }) {

  

    return (
        <div className="relative h-96 w-64 rounded-xl shadow-lg bg-cover bg-center overflow-hidden group"
      style={{
        backgroundImage: `url(${game.background_image})`}
      }>
            <div className="flex flex-col absolute justify-end p-4 top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent">
            <h3 className="text-xl font-bold">{game.name}</h3>
            <GamecardConsoleSymbol game={game}/>
            </div>
            <div className={`absolute top-0 right-0 m-2 rounded-full px-2 py-1 text-sm font-bold opacity-100 group-hover:opacity-0 ${ getRatingColor(game.rating)}`}>
                {game.rating * 2}
            </div>
            <div className="absolute top-2 right-2">
              <GameCardButton game={game} />
            </div>
        </div>
  );
}