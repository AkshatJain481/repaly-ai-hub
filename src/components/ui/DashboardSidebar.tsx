import { useState, useRef } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AiFillHome, AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { IoLogOutOutline, IoPersonCircleOutline } from "react-icons/io5";
import { logout } from "@/redux/slices/user.slice";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { platformNavConfig } from "@/utils/constants";
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
      className={`flex items-center p-3 rounded-lg cursor-pointer relative transition-all duration-200 
      ${
        isActive
          ? "bg-purple-50 dark:bg-purple-900/20"
          : "hover:bg-gray-100 dark:hover:bg-gray-700"
      }`}
      onClick={onClick}
    >
      {isActive && (
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-600 dark:bg-purple-400 rounded-r" />
      )}
      <div
        className={`flex items-center justify-center ${isExpanded ? "w-6" : "w-full"}`}
      >
        {React.createElement(icon, {
          size: 22,
          className: `transition-colors ${
            isActive
              ? "text-purple-600 dark:text-purple-400"
              : "text-gray-600 dark:text-gray-300"
          }`,
        })}
      </div>
      {isExpanded && (
        <span
          className={`ml-3 font-medium text-base transition-all overflow-hidden whitespace-nowrap ${
            isActive
              ? "text-purple-600 dark:text-purple-400"
              : "text-gray-600 dark:text-gray-300"
          }`}
        >
          {label}
        </span>
      )}
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

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

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
      {/* Sidebar Container For Desktop */}
      <div
        className={`h-screen bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-600 shadow-sm hidden md:block transition-all duration-300 ease-in-out ${
          isExpanded ? "w-60" : "w-16"
        }`}
      >
        <div className="flex flex-col h-full py-4 gap-6">
          {/* Toggle Button */}
          <div
            className={`flex items-center px-3 ${isExpanded ? "justify-between" : "justify-center"}`}
          >
            {isExpanded && (
              <Link to="/dashboard" className="flex items-center">
                <span className="ml-2 font-semibold text-gray-800 dark:text-white text-nowrap">
                  Repaly AI
                </span>
              </Link>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
            >
              {isExpanded ? (
                <AiOutlineClose
                  size={18}
                  className="text-gray-600 dark:text-gray-300"
                />
              ) : (
                <AiOutlineMenu
                  size={18}
                  className="text-gray-600 dark:text-gray-300"
                />
              )}
            </button>
          </div>

          {/* Profile Section */}
          <div
            className={`px-3 ${isExpanded ? "flex items-center" : "flex justify-center"}`}
          >
            <div className="relative flex items-center justify-center w-8 h-8 overflow-hidden bg-gray-100 dark:bg-gray-600 rounded-full flex-shrink-0">
              {userProfile?.picture ? (
                <img
                  src={userProfile.picture}
                  alt={userProfile.name || "User"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <IoPersonCircleOutline
                  size={24}
                  className="text-gray-600 dark:text-gray-300"
                />
              )}
            </div>
            {isExpanded && (
              <div className="ml-3 overflow-hidden">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200 truncate">
                  {userProfile?.name || "UserName"}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {userProfile?.email || "username@email.com"}
                </p>
              </div>
            )}
          </div>

          <div className="px-2">
            <hr className="border-t border-gray-200 dark:border-gray-600" />
          </div>

          {/* Navigation Items */}
          <div className="flex-1 px-2 space-y-1 overflow-y-auto">
            <NavItem
              icon={AiFillHome}
              label="Home"
              isExpanded={isExpanded}
              isActive={isActive("/dashboard")}
              onClick={() => navigate("/dashboard")}
            />
            {renderDynamicNavItems(false)}
          </div>

          {/* Logout Button */}
          <div className="px-3 mb-2">
            <button
              onClick={() => dispatch(logout())}
              className={`w-full bg-purple-600 dark:bg-purple-500 text-white font-medium py-2 rounded flex items-center ${
                isExpanded ? "justify-center px-3" : "justify-center"
              } gap-2 hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors`}
            >
              <IoLogOutOutline size={20} />
              {isExpanded && <span>Logout</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed md:hidden inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 ${
          isOpen ? "right-0" : "-right-72"
        } h-screen w-72 bg-white dark:bg-gray-800 shadow-lg z-50 transition-all duration-300 md:hidden`}
      >
        <div className="flex flex-col h-full p-4 gap-6">
          <div className="flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center">
              <img
                src="/repaly-logo.png"
                className="h-8 w-8 rounded-full"
                alt="Repaly Logo"
              />
              <span className="ml-2 font-semibold text-gray-800 dark:text-white">
                Repaly
              </span>
            </Link>
            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <AiOutlineClose
                size={18}
                className="text-gray-600 dark:text-gray-300"
              />
            </button>
          </div>

          {/* Mobile Profile Section */}
          <div className="flex items-center space-x-3">
            <div className="relative flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 dark:bg-gray-600 rounded-full">
              {userProfile?.picture ? (
                <img
                  src={userProfile.picture}
                  alt={userProfile.name || "User"}
                  className="w-full h-full object-cover"
                />
              ) : (
                <IoPersonCircleOutline
                  size={28}
                  className="text-gray-600 dark:text-gray-300"
                />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                {userProfile?.name || "User Name"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {userProfile?.email || "username@email.com"}
              </p>
            </div>
          </div>

          <hr className="border-t border-gray-200 dark:border-gray-600" />

          {/* Mobile Navigation Items */}
          <div className="flex-1 space-y-1 overflow-y-auto">
            <NavItem
              icon={AiFillHome}
              label="Home"
              isExpanded={true}
              isActive={isActive("/dashboard")}
              onClick={() => {
                navigate("/dashboard");
                onClose();
              }}
            />
            {renderDynamicNavItems(true)}
          </div>

          {/* Mobile Logout Button */}
          <button
            onClick={() => dispatch(logout())}
            className="w-full bg-purple-600 dark:bg-purple-500 text-white font-medium py-3 px-4 rounded flex items-center justify-center gap-2 hover:bg-purple-700 dark:hover:bg-purple-600 transition-colors"
          >
            <IoLogOutOutline size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
