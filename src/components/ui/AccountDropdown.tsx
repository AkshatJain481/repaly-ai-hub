
import { socialMediaPlatforms } from "@/utils/constants";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { setActiveAccount } from "@/redux/slices/user.slice";
import { useDispatch } from "react-redux";
import { PiUserCircleDuotone } from "react-icons/pi";
import { useState, useRef, useEffect } from "react";
import * as React from "react";

const AccountDropdown = () => {
  const dispatch = useDispatch();
  const activeAccount = useSelector(
    (state: RootState) => state.user.activeAccount
  );
  const userAccounts = useSelector(
    (state: RootState) => state.user.userAccounts
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const socialMedia = (platformName: string | undefined) => {
    switch (platformName) {
      case "instagram":
        return socialMediaPlatforms[0];
      default:
        return socialMediaPlatforms[0];
    }
  };

  // Handle outside click to close the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (userAccounts.length === 0) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="border border-solid border-gray-200 cursor-pointer p-4 h-[55px] w-full flex justify-start items-center gap-3 bg-white shadow-sm rounded-md hover:bg-gray-50 hover:shadow-md transition-all duration-200"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <div className="flex items-center">
          <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full">
            {activeAccount?.profile_picture_url ? (
              <img 
                src={activeAccount.profile_picture_url} 
                alt={activeAccount.name || "User"} 
                className="w-full h-full object-cover"
              />
            ) : (
              <PiUserCircleDuotone size={48} />
            )}
          </div>
          <div className="ml-3 text-left">
            <p className="font-semibold text-gray-800">
              {activeAccount?.name || "Full Name"}
            </p>
            <p className="text-sm text-gray-500">
              {activeAccount?.username || "Username"}
            </p>
          </div>
        </div>
        {activeAccount?.platformName && (
          <div className="ml-auto">
            {React.createElement(socialMedia(activeAccount.platformName)?.icon, {
              size: 24,
              color: socialMedia(activeAccount.platformName)?.color
            })}
          </div>
        )}
      </button>

      {isMenuOpen && (
        <div className="absolute z-10 mt-1 w-full rounded-md shadow-lg border border-solid border-gray-100 bg-white p-1">
          {userAccounts.map((account, index) => (
            <div
              key={`${account.id}-${index}`}
              className="flex items-center justify-between gap-3 px-3 py-2 rounded-sm hover:bg-gray-100 cursor-pointer transition-all duration-200"
              onClick={() => {
                dispatch(setActiveAccount(account));
                setIsMenuOpen(false);
              }}
            >
              <div className="flex items-center">
                <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full">
                  {account?.profile_picture_url ? (
                    <img 
                      src={account.profile_picture_url} 
                      alt={account.name || "User"} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <PiUserCircleDuotone size={48} />
                  )}
                </div>
                <div className="ml-3 text-left">
                  <p className="font-medium text-gray-800">
                    {account?.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {account?.username}
                  </p>
                </div>
              </div>
              {account.platformName && (
                <div>
                  {React.createElement(socialMedia(account.platformName)?.icon, {
                    size: 24,
                    color: socialMedia(account.platformName)?.color
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountDropdown;
