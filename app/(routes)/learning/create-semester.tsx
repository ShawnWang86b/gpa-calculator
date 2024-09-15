"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { createSemester } from "@/app/actions/semesterAction";
import { useState } from "react";
import Image from "next/image";

const CreateSemester = () => {
  const [semesterName, setSemesterName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    createSemester(semesterName);
    setIsOpen(false);
  };

  return (
    <div className="flex ml-2 mr-2.5 justify-between items-center">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary">
            <Plus className="w-6 h-6 mr-2" /> <p>NEW</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogDescription>
              <div className="flex flex-col items-center gap-5">
                <Image
                  src="/create_confirm.png"
                  height={60}
                  width={60}
                  alt="planets"
                  className="group-hover:animate-spin"
                />
                <p className="text-black font-semibold">
                  You can name a new semester card
                </p>
                <Input
                  type="text"
                  placeholder="Semester one ..."
                  className="focus:border-1 focus:border-leaf"
                  onChange={(e) => setSemesterName(e.target.value)}
                />
              </div>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="secondary" onClick={handleSubmit}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateSemester;
