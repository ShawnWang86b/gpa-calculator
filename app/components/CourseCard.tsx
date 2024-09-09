import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Course = {
  id: number;
  courseName: string;
  passingLine: number;
  semesterId: number;
};

type Props = {
  oneCourse: Course;
};

const CourseCard = ({ oneCourse }: Props) => {
  return (
    <div className="flex-col gap-5 justify-center items-center border-2 border-[black] w-[315px] h-[150px] bg-slate-200 p-4 m-2 rounded-lg cursor-pointer hover:bg-slate-300 group">
      <div className="flex justify-between items-center">
        <div>
          <Image
            src="/planets/planet03.png"
            height={40}
            width={40}
            alt="planets"
            className="group-hover:animate-spin"
          />
        </div>
        <div>{oneCourse.courseName}</div>
        <div>{`Passing score: ${oneCourse.passingLine}%`}</div>
      </div>
      <div className="flex-1 h-[1px] bg-slate-500 my-5" />
      <div className="flex justify-end">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="login">
                <Pencil className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="login">
                <Trash2 className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default CourseCard;
