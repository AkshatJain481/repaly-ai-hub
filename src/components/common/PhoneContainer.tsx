import { useEffect, useState } from "react";
import { BsBatteryFull, BsReception4 } from "react-icons/bs";
import { FaRegSquare } from "react-icons/fa6";
import { IoChevronBack } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

const PhoneContainer = ({ children }: { children: React.ReactNode }) => {
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    })
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(
        new Date().toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "Asia/Kolkata",
        })
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-w-[340px]">
      <div className="relative w-[340px] mx-auto">
        {/* Volume Buttons */}
        <div className="absolute left-[-8px] top-[100px] w-[4px] h-[30px] bg-gray-700 rounded-l-sm z-20 shadow-md" />
        <div className="absolute left-[-8px] top-[140px] w-[4px] h-[30px] bg-gray-700 rounded-l-sm z-20 shadow-md" />
        <div className="absolute right-[-8px] top-[120px] w-[4px] h-[40px] bg-gray-700 rounded-r-sm z-20 shadow-md" />

        {/* Phone Frame */}
        <div className="relative w-[340px] border-[8px] border-solid border-black rounded-[40px] bg-black overflow-hidden shadow-xl">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[40%] h-[25px] bg-black rounded-b-[12px] z-30">
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-gray-700 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
          </div>

          {/* Screen Content */}
          <div className="bg-white dark:bg-gray-900 h-[650px] overflow-hidden relative">
            {/* Status Bar */}
            <div className="flex items-center justify-between text-xs px-3 pt-1.5 text-white bg-gray-900 dark:bg-gray-800">
              <span>{time}</span>
              <div className="flex items-center gap-2">
                <BsReception4 size={14} className="opacity-60" />
                <div className="flex items-center gap-1">
                  <span>100%</span>
                  <BsBatteryFull size={20} className="opacity-80" />
                </div>
              </div>
            </div>

            {/* App Content */}
            <div className="relative h-full">
              {children}
            </div>

            {/* Bottom Nav */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-around items-center px-6 py-3 bg-gray-900 dark:bg-gray-800 border-t border-white/10 text-white z-20">
              <RxHamburgerMenu className="text-xl" />
              <FaRegSquare className="text-base" />
              <IoChevronBack className="text-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneContainer;
