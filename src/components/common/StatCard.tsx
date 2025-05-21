
import React from "react";

interface StatCardProps {
  value: string;
  label: string;
  icon?: React.ReactElement;
  valueColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  icon,
  valueColor = "text-primary",
}) => {
  return (
    <div
      className="bg-card p-6 rounded-lg shadow-sm text-center transition-all hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex flex-col items-center gap-2">
        {icon && (
          <div className="text-primary mb-2">
            {icon}
          </div>
        )}
        <p
          className={`text-3xl md:text-4xl font-bold ${valueColor} leading-none`}
        >
          {value}
        </p>
        <p className="text-md text-muted-foreground">
          {label}
        </p>
      </div>
    </div>
  );
};

export default StatCard;
