import GameCard from "./GameCard";



const jogoExemplo = {
  name: "Cyberpunk 2077",
  background_image: "https://media.rawg.io/media/games/26d/26d4437715bee602f7dda27e081e12d4.jpg",
  rating: 4.1,
  // ... e muitas outras informações
};
export default function GameCards() {
    return (
        <GameCard game={jogoExemplo}/>
    )
}