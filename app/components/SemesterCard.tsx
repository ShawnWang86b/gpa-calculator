import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Pencil, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type Props = {
  semesterName: string;
};

const SemesterCard = ({ semesterName }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

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
        <div>{semesterName}</div>
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
        {/* Delete modal */}
        <Dialog>
          <DialogTrigger asChild>
            {/* <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild> */}
            <Button variant="login">
              <Trash2 className="h-5 w-5" />
            </Button>
            {/* </TooltipTrigger>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider> */}
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue="Pedro Duarte"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  defaultValue="@peduarte"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SemesterCard;
