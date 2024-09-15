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
import { ChangeEvent, useState } from "react";
import { createAssignment } from "@/app/actions/assignmentAction";
import Image from "next/image";
import useStore from "@/app/store/useStore";

type AssignmentInfo = {
  assignmentName: string;
  weight: number;
  fullMark: number;
  scored: number;
  courseId: number;
};

type Props = {
  refetchTrigger: boolean;
  setRefetchTrigger: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateAssignment = ({ refetchTrigger, setRefetchTrigger }: Props) => {
  const course_Id = useStore((state) => state.currentValue);

  const [assignmentInfo, setAssignmentInfo] = useState<AssignmentInfo>({
    assignmentName: "",
    weight: 0,
    fullMark: 0,
    scored: 0,
    courseId: course_Id,
  });

  //FIXME: passingLine can't over 100
  // FIXME: require form validation
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async () => {
    try {
      await createAssignment(assignmentInfo);
      setRefetchTrigger(!refetchTrigger);
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating assignmnent:", error);
    }
  };

  const handleAssignmentNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAssignmentInfo((prevInfo) => ({
      ...prevInfo,
      assignmentName: e.target.value,
    }));
  };

  const handleWeightChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAssignmentInfo((prevInfo) => ({
      ...prevInfo,
      weight: parseInt(e.target.value) || 0,
    }));
  };

  const handleFullMarkChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAssignmentInfo((prevInfo) => ({
      ...prevInfo,
      fullMark: parseInt(e.target.value) || 0,
    }));
  };

  const handleScoredChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAssignmentInfo((prevInfo) => ({
      ...prevInfo,
      scored: parseInt(e.target.value) || 0,
    }));
  };

  return (
    <div className="flex ml-2 mr-2.5 gap-5 items-center">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary">
            <Plus className="w-6 h-6 mr-2" /> <p>ASSIGNMENT</p>
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
                  You can create a new assignment card
                </p>

                <Input
                  id="name"
                  placeholder="Assignment name, e.g. Mobile programming ..."
                  className="focus:border-1 focus:border-leaf"
                  onChange={handleAssignmentNameChange}
                />

                <Input
                  id="weight"
                  placeholder="weight of assignment, e.g. 50"
                  className="focus:border-1 focus:border-leaf"
                  onChange={handleWeightChange}
                />

                <Input
                  id="fullMark"
                  placeholder="Full mark of assignment, e.g. 30"
                  className="focus:border-1 focus:border-leaf"
                  onChange={handleFullMarkChange}
                />

                <Input
                  id="scored"
                  placeholder="scored, e.g. 20"
                  className="focus:border-1 focus:border-leaf"
                  onChange={handleScoredChange}
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

export default CreateAssignment;
