
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";
import { ReactNode } from "react";

interface MetricCardProps {
  title: string;
  value?: number;
  percentChange?: number;
  isPositive?: boolean;
  iconBgColor: string;
  icon: ReactNode;
}

const MetricCard = ({
  title,
  value,
  percentChange,
  isPositive,
  iconBgColor,
  icon,
}: MetricCardProps) => {
  // Determine if we should show percentage change
  const showPercentage = percentChange !== undefined;

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 h-full w-full">
      <div className="flex gap-4">
        <div className="flex items-center justify-center">
          <div className={`${iconBgColor} rounded-full p-2 text-white text-3xl`}>
            {icon}
          </div>
        </div>
        <div className="p-0">
          <p className="text-gray-500 text-md font-bold">
            {title}
          </p>
          <div className="flex items-center">
            <p className="text-4xl font-bold mr-2">
              {value ?? "No Data"}
            </p>

            {showPercentage && (
              <div className={`flex items-center text-sm ${isPositive ? "text-green-500" : "text-red-500"}`}>
                {isPositive ? (
                  <ArrowUpIcon className="mr-1 h-4 w-4" />
                ) : (
                  <ArrowDownIcon className="mr-1 h-4 w-4" />
                )}
                <p>{Math.abs(percentChange)}%</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
