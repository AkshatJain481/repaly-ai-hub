
import { useState, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { secondaryTextColor, primaryColor } from "@/utils/constants";
import { logout } from "@/redux/slices/user.slice";
import { IoLogOutOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { platformNavConfig } from "@/utils/constants";
import { PiUserCircleDuotone } from "react-icons/pi";
import * as React from "react";

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  isExpanded: boolean;
  onClick: () => void;
  isActive: boolean;
  ref?: React.Ref<HTMLDivElement>;
}

const NavItem = ({
  icon,
  label,
  isExpanded,
  onClick,
  isActive,
}: NavItemProps) => {
  const itemRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={itemRef}
      className={`flex items-center p-2 rounded-lg cursor-pointer relative hover:bg-gray-100 ${
        isActive ? "text-primary" : "text-gray-600"
      }`}
      onClick={onClick}
    >
      {isActive && (
        <div
          className="absolute left-0 h-0 w-1 bg-primary rounded-full"
          style={{animation: isActive ? "expandVertical 0.3s forwards" : "none"}}
        />
      )}
      {React.createElement(icon, { 
        size: 32, 
        color: isActive ? primaryColor : secondaryTextColor 
      })}
      <span
        className={`ml-4 font-${isActive ? "bold" : "normal"} text-${
          isActive ? "primary" : "gray-600"
        } opacity-${isExpanded ? "100" : "0"} transition-all duration-300 ease-in-out overflow-hidden whitespace-nowrap text-lg`}
        style={{
          width: isExpanded ? "400px" : "0",
          color: isActive ? primaryColor : secondaryTextColor
        }}
      >
        {label}
      </span>
    </div>
  );
};

const DashboardSidebar = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const dispatch = useDispatch();
  const { activeAccount, userProfile } = useSelector(
    (state: RootState) => state.user
  );
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const renderDynamicNavItems = (isMobile: boolean) => {
    if (!activeAccount?.platformName) return null;

    const platformKey = activeAccount.platformName.toLowerCase();
    const config = platformNavConfig[platformKey];

    if (!config) return null;

    return config.map(({ label, icon, path }, index) => {
      return (
        <NavItem
          key={`${label}-${index}`}
          icon={icon}
          label={label}
          isExpanded={isMobile || isExpanded}
          isActive={isActive(path)}
          onClick={() => navigate(path)}
        />
      );
    });
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Sidebar Container For Desktop*/}
      <div
        className={`h-screen bg-white border-r-2 border-gray-200 border-solid hidden md:block transition-all duration-300 ease-in-out relative ${
          isExpanded ? "w-64" : "w-20"
        }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="flex flex-col h-full p-4 gap-8">
          {/* Profile Section */}
          <Link to={"/dashboard"}>
            {isExpanded ? (
              <img src="/repaly-logo.png" className="rounded-full" alt="Repaly Logo" />
            ) : (
              <img src="/logo.png" className="rounded-full h-[50px]" alt="Repaly Logo Icon" />
            )}
          </Link>
          <div className={`flex items-center ${isExpanded ? "" : "justify-center"} gap-3`}>
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full">
              {userProfile?.picture ? (
                <img src={userProfile.picture} alt={userProfile.name} className="w-full h-full object-cover" />
              ) : (
                <PiUserCircleDuotone size={40} />
              )}
            </div>
            {isExpanded && (
              <div className="flex flex-col gap-0">
                <p className="text-sm font-medium text-gray-700 overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out">
                  {userProfile?.name || "UserName"}
                </p>
                <p className="text-xs font-medium text-gray-500 overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out">
                  {userProfile?.email || "username@email.com"}
                </p>
              </div>
            )}
          </div>
          <hr className="border-t border-gray-200" />

          {/* Navigation Items */}
          <div className="flex flex-col gap-4 relative">
            <NavItem
              icon={AiFillHome}
              label="Home"
              isExpanded={isExpanded}
              isActive={isActive("/dashboard")}
              onClick={() => navigate("/dashboard")}
            />
            {renderDynamicNavItems(false)}
          </div>

          <div className="flex-grow"></div>

          <button
            onClick={() => dispatch(logout())}
            className="bg-purple-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2 hover:bg-purple-700"
          >
            <IoLogOutOutline size={24} />
            {isExpanded && "Logout"}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed md:hidden top-0 left-0 w-screen h-screen bg-black/60 z-50"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar Container For Mobile*/}
      <div
        className={`fixed top-0 ${
          isOpen ? "right-0" : "-right-64"
        } h-screen bg-white border-l-2 border-gray-200 w-64 z-[100] transition-right duration-300 ease-in-out md:hidden`}
      >
        <div className="flex flex-col h-full p-4 gap-8">
          {/* Profile Section */}
          <Link to={"/dashboard"}>
            <img src="/repaly-logo.png" className="rounded-full" alt="Repaly Logo" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="relative inline-flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 rounded-full">
              {userProfile?.picture ? (
                <img src={userProfile.picture} alt={userProfile.name} className="w-full h-full object-cover" />
              ) : (
                <PiUserCircleDuotone size={32} />
              )}
            </div>
            <div className="flex flex-col gap-0">
              <p className="text-sm font-medium text-gray-700 overflow-hidden whitespace-nowrap">
                {userProfile?.name || "User Name"}
              </p>
              <p className="text-xs font-medium text-gray-500 overflow-hidden whitespace-nowrap">
                {userProfile?.email || "username@email.com"}
              </p>
            </div>
          </div>
          <hr className="border-t border-gray-200" />

          {/* Navigation Items */}
          <div className="flex flex-col gap-4">
            <NavItem
              icon={AiFillHome}
              label="Home"
              isExpanded={true}
              isActive={isActive("/dashboard")}
              onClick={() => navigate("/dashboard")}
            />
            {renderDynamicNavItems(true)}
          </div>

          <div className="flex-grow"></div>

          <button
            onClick={() => dispatch(logout())}
            className="bg-purple-600 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2 hover:bg-purple-700"
          >
            <IoLogOutOutline size={24} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
