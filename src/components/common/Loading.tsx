
import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <Loader className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
};

export default Loading;
