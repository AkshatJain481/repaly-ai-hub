import { AiOutlineLoading } from "react-icons/ai";

const Loading = () => {
  return (
    <div className="flex h-[100vh] w-full items-center justify-center p-8">
      <AiOutlineLoading className="h-8 w-8 animate-spin text-primary" />
    </div>
  );
};

export default Loading;
