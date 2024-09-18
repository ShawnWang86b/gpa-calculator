import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Loader className="h-6 w-6 animate-spin" />
    </div>
  );
};

export default Loading;
