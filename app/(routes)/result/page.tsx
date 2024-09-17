"use client";

import useStore from "@/app/store/useStore";
import { BackgroundLines } from "@/components/ui/background-lines";

const Result = () => {
  const prediction = useStore((state) => state.predictionValue);

  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 z-0">
      <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
        Hello, <br />
        {prediction.userName}
      </h2>
      <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
        To reach your target score of {prediction.assignmentTargetScore} <br />
        you need to get
        {prediction.requireScore > 100
          ? `This score is not achievable.`
          : prediction.requireScore}
      </p>
    </BackgroundLines>
  );
};

export default Result;
