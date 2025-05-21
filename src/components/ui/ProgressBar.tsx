
import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  completePercentage: number;
}

const ProgressBar = ({ completePercentage }: ProgressBarProps) => {
  return (
    <Progress 
      value={completePercentage} 
      className="w-[200px] min-w-[200px]"
    />
  );
};

export default ProgressBar;
