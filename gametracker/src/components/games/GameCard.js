export default function GameCard({ game }) {
    return (
        <div className="h-96 w-64 rounded-xl shadow-lg 
                 bg-cover bg-center 
                 transition-transform hover:scale-105">
                    <h1>{game.name}</h1>
        </div>
    )
}