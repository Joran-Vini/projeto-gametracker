import { Monitor} from "lucide-react";
import { FaXbox, FaPlaystation } from "react-icons/fa";
import { BsNintendoSwitch } from "react-icons/bs";

function getRatingColor(rating) {
    if (rating >= 4) return 'bg-green-500';
    if (rating >= 3) return 'bg-yellow-500';
    return 'bg-red-500';
}

export default function GameCard({ game }) {
    return (
        <div className="relative h-96 w-64 rounded-xl shadow-lg bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url(${game.background_image})`}
      }>
            <div className="flex flex-col absolute justify-end p-4 top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent">
            <h3 className="text-xl font-bold">{game.name}</h3>
            <div className="flex gap-2 mt-1 ">
                {game.platforms.map(platform => {
                    const platformName = platform.platform.name.toLowerCase();

                    switch (true) {
                        case platformName.includes('pc'):
                             return <Monitor key={platform.platform.name} title="PC" className="text-gray-300" size={14} />;
      
                        case platformName.includes('playstation'):
                            return <FaPlaystation key={platform.platform.name} title="PlayStation" className="text-gray-300" size={16} />;
      
                        case platformName.includes('xbox'):
                            return <FaXbox key={platform.platform.name} title="Xbox" className="text-gray-300" size={15} />;
      
                        case platformName.includes('nintendo'):
                            return <BsNintendoSwitch key={platform.platform.name} title="Nintendo Switch" className="text-gray-300" size={15} />;
                        default:
                            return null;}
                }) }
            </div>
            </div>
            <div className={`absolute top-0 right-0 m-2 rounded-full px-2 py-1 text-sm font-bold ${getRatingColor(game.rating)}`}>
                {game.rating}
            </div>
        </div>
  );
}