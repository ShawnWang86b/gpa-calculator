import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Pencil, Trash2, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { deleteSemester, updateSemester } from "@/app/actions/semesterAction";
import useStore from "@/app/store/useStore";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";

type Props = {
  semesterId: string;
  semesterName: string;
  createdAt: Date;
};

const SemesterCard = ({ semesterId, semesterName, createdAt }: Props) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [newSemesterName, setNewSemesterName] = useState(semesterName);
  const selectedSemesterId = useStore((state) => state.setSelectedSemesterId);
  const currentSemesterId = useStore((state) => state.selectedSemesterId);

  // here is for refresh tab's content
  const setCurrentValue = useStore((state) => state.setCurrentValue);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (currentSemesterId === semesterId) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [currentSemesterId, semesterId]);

  const handleStoreSemesterId = () => {
    setCurrentValue(0);
    selectedSemesterId(semesterId);
  };

  const handleEdit = () => {
    updateSemester(Number(semesterId), newSemesterName);
    setEditModalOpen(false);
  };

  const handleDelete = () => {
    deleteSemester(Number(semesterId));
    setIsDeleteModalOpen(false);
  };

  return (
    <div
      className={cn(
        "flex-col justify-center items-center border-[1px] border-info/30 p-3 bg-muted w-full h-[150px] m-2 min-w-[300px]",
        isActive ? "bg-info-light" : "bg-white"
      )}
    >
      <div className="flex justify-between items-center">
        <div className="font-semibold">{semesterName}</div>
        <div className="ml-auto text-xs text-foreground">
          {dayjs(createdAt).format("MMM D, YYYY")}
        </div>
      </div>
      <div className="line-clamp-2 text-xs text-muted-foreground">
        Hi, lets have a meeting tomorrow to discuss the project. Ive been
        reviewing the project details and have some ideas Id like to shar
      </div>
      {/* <div className="flex-1 h-[1px] bg-slate-500 my-5" /> */}
      <div className="flex justify-end gap-5 mt-5 min-w-[200px]">
        <Button variant="primary" onClick={handleStoreSemesterId}>
          <Eye className="h-5 w-5 mr-2" />
          <p>CHECK</p>
        </Button>

        <Dialog open={isEditModalOpen} onOpenChange={setEditModalOpen}>
          <DialogTrigger asChild>
            <Button variant="primary">
              <Pencil className="h-5 w-5 mr-2" /> <p>EDIT</p>
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
                    onChange={(e) => setNewSemesterName(e.target.value)}
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
              <Trash2 className="h-5 w-5 mr-2" /> <p>DELETE</p>
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

export default SemesterCard;
