import { GoBell } from "react-icons/go";
import { GiHamburgerMenu } from "react-icons/gi";
import { ThemeToggle } from "./theme-toggle";

const DashboardNavbar = ({ onOpen }: { onOpen: () => void }) => {
  return (
    <div className="bg-white dark:bg-gray-900 px-4 py-3 border-b-2 border-solid border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between md:justify-end gap-0">
        <div className="flex items-center gap-3">
          <GoBell size={26} className="text-gray-500 dark:text-gray-300" />
          <ThemeToggle />
        </div>
        <GiHamburgerMenu
          className="cursor-pointer block md:hidden ml-2 text-gray-500 dark:text-gray-300"
          size={26}
          onClick={onOpen}
        />
      </div>
    </div>
  );
};

export default DashboardNavbar;
