"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FolderPlus } from "lucide-react";
import { createSemester } from "@/app/actions/semesterAction";
import { useState } from "react";

const CreateSemester = () => {
  const [semesterName, setSemesterName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    createSemester(semesterName);
    setIsOpen(false);
  };

  return (
    <div className="flex mt-4 ml-2 mr-2.5 justify-between items-center">
      <p className="font-bold text-lg">Semester List</p>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="login"
            className="border-2 border-black hover:border-[#a4c3eb]"
          >
            <FolderPlus className="w-6 h-6 mr-2" /> <p>Create</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create new semester</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Enter semester name"
                className="col-span-3"
                onChange={(e) => setSemesterName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSubmit}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateSemester;
