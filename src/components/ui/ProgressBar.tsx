import { Progress } from "@chakra-ui/react";

const ProgressBar = ({
  completePercentage,
}: {
  completePercentage: number;
}) => {
  return (
    <Progress.Root
      value={completePercentage}
      size={"xs"}
      minW={"200px"}
      colorPalette={"purple"}
      variant={"subtle"}
    >
      <Progress.Track>
        <Progress.Range />
      </Progress.Track>
    </Progress.Root>
  );
};

export default ProgressBar;
