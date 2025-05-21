
import { GoBell } from "react-icons/go";
import { GiHamburgerMenu } from "react-icons/gi";
import { secondaryTextColor } from "@/utils/constants";

const DashboardNavbar = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <div className="bg-white px-4 py-3 border-b-2 border-solid border-gray-200">
      <div className="flex items-center justify-end md:justify-end gap-0">
        <GoBell size={26} color={secondaryTextColor} />
        <GiHamburgerMenu 
          className="cursor-pointer block md:hidden ml-2" 
          size={26}
          onClick={onOpen} 
        />
      </div>
    </div>
  );
};

export default DashboardNavbar;
