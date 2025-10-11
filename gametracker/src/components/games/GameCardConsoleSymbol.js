import { Monitor} from "lucide-react";
import { FaXbox, FaPlaystation } from "react-icons/fa";
import { BsNintendoSwitch } from "react-icons/bs";

const iconMap = {
    pc: <Monitor title="PC" className="text-gray-300" size={14} />,
    playstation: <FaPlaystation title="PlayStation" className="text-gray-300" size={16} />,
    xbox: <FaXbox title="Xbox" className="text-gray-300" size={15} />,
    nintendo: <BsNintendoSwitch title="Nintendo Switch" className="text-gray-300" size={15} />,
};


export default function GameCardConsoleSymbol({ game }) {
    const platformFamilies = new Set(); // Um Set não permite itens duplicados
        game.platforms?.forEach((p) => {
        const platformName = p.platform.name.toLowerCase();
        if (platformName.includes('pc')) platformFamilies.add('pc');
        if (platformName.includes('playstation')) platformFamilies.add('playstation');
        if (platformName.includes('xbox')) platformFamilies.add('xbox');
        if (platformName.includes('nintendo')) platformFamilies.add('nintendo');
    });

    // Transformamos o Set em um Array para poder usar o .map()
    const uniquePlatforms = [...platformFamilies];
    return (
        <div className="flex gap-2 mt-1 ">
                    
        {uniquePlatforms.map(family => (
                    <div key={family}>
                        {iconMap[family]}
                    </div>
                    ))}
        </div>
    )
}