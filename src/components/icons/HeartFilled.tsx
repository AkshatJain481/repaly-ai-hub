
import * as React from 'react';

export const HeartFilled = ({ 
  size = 24, 
  color = "currentColor",
  className,
  ...props 
}: {
  size?: number | string;
  color?: string;
  className?: string;
  [key: string]: any;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="M19.5 13.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
    </svg>
  );
};

export default HeartFilled;
