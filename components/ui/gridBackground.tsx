import React from "react";

type Props = {
  children: React.ReactNode;
};
export function GridBackground({ children }: Props) {
  return (
    <div className="h-full w-full bg-slate-200 bg-grid-small-black/[0.3] relative flex items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      {/* <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_80%,black)]"></div> */}
      {/* <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8"></p> */}
      {children}
    </div>
  );
}
