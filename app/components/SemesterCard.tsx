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
import { useState } from "react";
import { deleteSemester, updateSemester } from "@/app/actions/semesterAction";
import Link from "next/link";

type Props = {
  semesterId: string;
  semesterName: string;
};

const SemesterCard = ({ semesterId, semesterName }: Props) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [newSemesterName, setNewSemesterName] = useState(semesterName);

  const handleEdit = () => {
    updateSemester(Number(semesterId), newSemesterName);
    setEditModalOpen(false);
  };

  const handleDelete = () => {
    deleteSemester(Number(semesterId));
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="flex-col justify-center items-center border-2 border-[black] w-full h-[160px] bg-slate-200 p-4 m-2 rounded-lg cursor-pointer hover:bg-slate-300 group">
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
      <div className="flex justify-end gap-5">
        <Link href={`/learning/${semesterId}`}>
          <Button variant="primary">
            <Eye className="h-5 w-5 mr-2" />
            <p>CHECK</p>
          </Button>
        </Link>
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
