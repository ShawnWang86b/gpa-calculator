import { cn } from "@/lib/utils";
import SideBarItem from "@/app/components/SideBarItem";

type Props = {
  className?: string;
};

const SideBar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex h-full 2xl:w-[120px] 2xl:fixed left-0 top-0 px-6 border-r-[1px] border-slate-200 flex-col bg-muted",
        className
      )}
    >
      <SideBarItem />
      <SideBarItem />
      <SideBarItem />
      <SideBarItem />
    </div>
  );
};

export default SideBar;
