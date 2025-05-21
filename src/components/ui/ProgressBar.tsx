
import { Progress } from "@/components/ui/progress";

const ProgressBar = ({
  completePercentage,
}: {
  completePercentage: number;
}) => {
  return (
    <Progress 
      value={completePercentage} 
      className="w-[200px] min-w-[200px]"
    />
  );
};

export default ProgressBar;
