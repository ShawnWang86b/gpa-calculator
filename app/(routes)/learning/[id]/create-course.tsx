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

type CourseInfo = {
  courseName: string;
  passingLine: number;
  semesterId: number;
};

type Props = {
  semesterId: number;
};

const CreateCourse = ({ semesterId }: Props) => {
  const [courseInfo, setCourseInfo] = useState<CourseInfo>({
    courseName: "",
    passingLine: 50,
    semesterId: semesterId,
  });
  console.log("courseInfo", courseInfo);
  //FIXME: passingLine can't over 100
  // FIXME: some limit for courseName
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    createCourse(courseInfo);
    setIsOpen(false);
  };

  const handleCourseNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCourseInfo((prevInfo) => ({
      ...prevInfo,
      courseName: e.target.value,
    }));
  };

  const handlePassingLineChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCourseInfo((prevInfo) => ({
      ...prevInfo,
      passingLine: parseInt(e.target.value) || 0,
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
            <DialogTitle>Create new course</DialogTitle>
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
                onChange={handleCourseNameChange}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Score
              </Label>
              <Input
                id="score"
                placeholder="Enter passing score"
                className="col-span-3"
                onChange={handlePassingLineChange}
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

export default CreateCourse;
