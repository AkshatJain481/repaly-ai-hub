
import React from 'react';

interface PhoneContainerProps {
  children: React.ReactNode;
}

const PhoneContainer: React.FC<PhoneContainerProps> = ({ children }) => {
  return (
    <div className="relative w-[330px] h-[600px] mx-auto">
      <div className="absolute inset-0 bg-black rounded-[36px] shadow-lg overflow-hidden">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-black z-20 rounded-b-xl"></div>
        
        {/* Screen */}
        <div className="absolute inset-0 overflow-hidden bg-gray-900">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PhoneContainer;
