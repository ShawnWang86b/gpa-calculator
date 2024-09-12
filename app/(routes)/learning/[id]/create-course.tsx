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
import { Label } from "@/components/ui/label";
import { ArrowBigLeftDash, Plus } from "lucide-react";
import { ChangeEvent, useState } from "react";
import { createCourse } from "@/app/actions/courseAction";
import Link from "next/link";
import Image from "next/image";

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
    <div className="flex mt-4 ml-2 mr-2.5 gap-5 items-center">
      <Link href="/learning">
        <Button variant="primary">
          <ArrowBigLeftDash className="w-6 h-6 mr-2" /> <p>BACK</p>
        </Button>
      </Link>
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
                  id="name"
                  placeholder="Subject, Machine Learning ..."
                  className="focus:border-1 focus:border-leaf"
                  onChange={handleCourseNameChange}
                />

                <Input
                  id="score"
                  placeholder="Passing score, e.g. 50"
                  className="focus:border-1 focus:border-leaf"
                  onChange={handlePassingLineChange}
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

export default CreateCourse;
