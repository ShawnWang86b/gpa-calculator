import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Trash2, Eye } from "lucide-react";
import { useState } from "react";
import { deleteAssignment } from "@/app/actions/assignmentAction";
import Image from "next/image";
import { Input } from "@/components/ui/input";

type Assignment = {
  id: number;
  assignmentName: string;
  weight: number;
  fullMark: number;
  scored: number;
  courseId: number;
};

type Props = {
  assignment: Assignment;
  assignmentRefetchTrigger: boolean;
  setAssignmentRefetchTrigger: () => void;
};

const AssignmentCard = ({
  assignment,
  assignmentRefetchTrigger,
  setAssignmentRefetchTrigger,
}: Props) => {
  console.log("assignment", assignment);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleEdit = () => {
    // updateSemester(Number(semesterId), newSemesterName);
    // setEditModalOpen(false);
  };

  const handleDelete = () => {
    deleteAssignment(Number(assignment.id));
    setAssignmentRefetchTrigger(!assignmentRefetchTrigger);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="border-[1px] border-info/30 rounded-md p-4 bg-muted w-[300px] mb-3">
      <p className="font-bold uppercase">{assignment.assignmentName}</p>
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <p className="">weight:</p>
          <p className="text-sm">{assignment.weight}</p>
        </div>
        <div className="flex items-center justify-between">
          <p>full mark:</p>
          <p className="text-sm">{assignment.fullMark}</p>
        </div>
        <div className="flex items-center justify-between">
          <p>scored:</p>
          <p className="text-sm">{assignment.scored}</p>
        </div>
      </div>
      <div className="flex mt-4 gap-2 justify-end">
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
                    You can update your semester card name
                  </p>
                  <Input
                    type="text"
                    placeholder="Semester one ..."
                    className="focus:border-1 focus:border-info"
                    // onChange={(e) => setNewSemesterName(e.target.value)}
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
              <Button
                variant="ghost"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="mars" onClick={handleDelete}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AssignmentCard;
