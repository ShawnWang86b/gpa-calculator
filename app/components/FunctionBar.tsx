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
import { ArrowBigLeftDash, Pencil, Plus, Trash2 } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import {
  createCourse,
  deleteCourses,
  updateCourse,
} from "@/app/actions/courseAction";
import {
  createAssignment,
  deleteAssignment,
} from "@/app/actions/assignmentAction";
import Link from "next/link";
import Image from "next/image";
import useStore from "@/app/store/useStore";

type AssignmentInfo = {
  assignmentName: string;
  weight: number;
  fullMark: number;
  scored: number;
  courseId: number;
};

type CourseUpdateInfo = {
  courseName: string;
  passingLine: number;
  courseId: number;
};

type Props = {
  refetchTrigger: boolean;
  setRefetchTrigger: () => void;
  createSuccessTrigger: boolean;
  setCreateSuccessTrigger: () => void;
};

const FunctionBar = ({
  refetchTrigger,
  setRefetchTrigger,
  createSuccessTrigger,
  setCreateSuccessTrigger,
}: any) => {
  const course_Id = useStore((state) => state.currentValue);
  console.log("courseId", course_Id);
  const [assignmentInfo, setAssignmentInfo] = useState<AssignmentInfo>({
    assignmentName: "",
    weight: 0,
    fullMark: 0,
    scored: 0,
    courseId: course_Id,
  });
  const [courseUpdateInfo, setCourseUpdateInfo] = useState<CourseUpdateInfo>({
    courseName: "",
    passingLine: 0,
    courseId: course_Id,
  });

  //FIXME: passingLine can't over 100
  // FIXME: require form validation
  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = () => {
    updateCourse(
      course_Id,
      courseUpdateInfo.courseName,
      courseUpdateInfo.passingLine
    );
    setCreateSuccessTrigger(!createSuccessTrigger);
    setEditModalOpen(false);
  };

  const handleDelete = () => {
    try {
      deleteCourses(Number(course_Id));
      setCreateSuccessTrigger(!createSuccessTrigger);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error creating assignmnent:", error);
    }
  };

  const handleCreateAssignmentSubmit = async () => {
    try {
      await createAssignment(assignmentInfo);
      setRefetchTrigger(!refetchTrigger);
      setIsOpen(false);
    } catch (error) {
      console.error("Error creating assignmnent:", error);
    }
  };

  // update course info
  const handleCourseNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCourseUpdateInfo((prevInfo) => ({
      ...prevInfo,
      courseName: e.target.value,
    }));
  };

  const handlePassingLineChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCourseUpdateInfo((prevInfo) => ({
      ...prevInfo,
      passingLine: parseInt(e.target.value) || 0,
    }));
  };

  // new assignment
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
      {/* edit a course */}
      <Dialog open={isEditModalOpen} onOpenChange={setEditModalOpen}>
        <DialogTrigger asChild>
          <Button variant="primary">
            <Pencil className="h-5 w-5 mr-2" />
            <p>EDIT</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogDescription>
              <div className="flex flex-col items-center gap-5">
                <Image
                  src="/edit_confirm.png"
                  height={60}
                  width={60}
                  alt="planets"
                  className="group-hover:animate-spin"
                />
                <p className="text-black font-semibold">
                  You can update your course card
                </p>
                <Input
                  type="text"
                  placeholder="Course name e.g. Java"
                  className="focus:border-1 focus:border-info"
                  onChange={handleCourseNameChange}
                />

                <Input
                  type="text"
                  placeholder="Passing line, e.g. 50"
                  className="focus:border-1 focus:border-info"
                  onChange={handlePassingLineChange}
                />
              </div>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-5">
            <Button variant="ghost" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" onClick={handleEdit}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* delete a course */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogTrigger asChild>
          <Button variant="mars">
            <Trash2 className="h-5 w-5 mr-2" />
            <p>DELETE</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogDescription>
              <div className="flex flex-col items-center gap-5">
                <Image
                  src="/delete_confirm.png"
                  height={60}
                  width={60}
                  alt="planets"
                  className="group-hover:animate-spin"
                />
                <p className="text-black font-semibold">
                  Are you sure you want to delete?
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-5">
            <Button variant="ghost" onClick={() => setIsDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="mars" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* create a assignment */}
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
            <Button
              type="submit"
              variant="secondary"
              onClick={handleCreateAssignmentSubmit}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FunctionBar;
