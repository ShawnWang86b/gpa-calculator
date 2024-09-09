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
import { ChangeEvent, useState } from "react";
import { createCourse } from "@/app/actions/courseAction";
import { createAssignment } from "@/app/actions/assignmentAction";

type AssignmentInfo = {
  assignmentName: string;
  weight: number;
  fullMark: number;
  scored: number;
  courseId: number;
};

type Props = {
  courseId: number;
};

const CreateAssignment = ({ courseId }: Props) => {
  const [assignmentInfo, setAssignmentInfo] = useState<AssignmentInfo>({
    assignmentName: "",
    weight: 25,
    fullMark: 0,
    scored: 0,
    courseId: courseId,
  });

  //FIXME: passingLine can't over 100
  // FIXME: some limit for courseName
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    createAssignment(assignmentInfo);
    setIsOpen(false);
  };

  const handleAssignmentNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAssignmentInfo((prevInfo) => ({
      ...prevInfo,
      assignmentName: e.target.value,
    }));
  };

  const handleAssignmentWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAssignmentInfo((prevInfo) => ({
      ...prevInfo,
      weight: parseInt(e.target.value) || 0,
    }));
  };

  const handleAssignmentFullMarkChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAssignmentInfo((prevInfo) => ({
      ...prevInfo,
      fullMark: parseInt(e.target.value) || 0,
    }));
  };

  const handleAssignmentScoredChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAssignmentInfo((prevInfo) => ({
      ...prevInfo,
      scored: parseInt(e.target.value) || 0,
    }));
  };

  return (
    <div className="flex mt-4 ml-2 mr-2.5 justify-between items-center">
      <p className="font-bold text-lg">courses List</p>
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
            <DialogTitle>Create new assignment</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Enter subject name"
                className="col-span-3"
                onChange={handleAssignmentNameChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="weight" className="text-right">
                Weight
              </Label>
              <Input
                id="weight"
                placeholder="Enter assignment weight"
                className="col-span-3"
                onChange={handleAssignmentWeightChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="full-mark" className="text-right">
                Full Mark
              </Label>
              <Input
                id="full-mark"
                placeholder="Enter assignment full mark"
                className="col-span-3"
                onChange={handleAssignmentFullMarkChange}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="scored" className="text-right">
                Scored
              </Label>
              <Input
                id="scored"
                placeholder="Enter Scored score"
                className="col-span-3"
                onChange={handleAssignmentScoredChange}
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

export default CreateAssignment;
