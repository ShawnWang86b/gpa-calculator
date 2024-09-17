"use client";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { deleteSemester, updateSemester } from "@/app/actions/semesterAction";
import useStore from "@/app/store/useStore";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

type Props = {
  semesterId: string;
  semesterName: string;
  semesterDesc: string;
  createdAt: Date;
};

type SemesterFormData = z.infer<typeof semesterSchema>;
const semesterSchema = z.object({
  semesterName: z
    .string()
    .min(3, { message: "Semester name must be at least 3 characters" })
    .max(50, { message: "Semester name cannot exceed 50 characters" }),
  semesterDesc: z
    .string()
    .min(10, {
      message: "Description must be at least 10 characters.",
    })
    .max(160, {
      message: "Description must not be longer than 30 characters.",
    }),
});

const SemesterCard = ({
  semesterId,
  semesterName,
  semesterDesc,
  createdAt,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

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

  const form = useForm<z.infer<typeof semesterSchema>>({
    resolver: zodResolver(semesterSchema),
    defaultValues: {
      semesterName: semesterName,
      semesterDesc: semesterDesc,
    },
  });

  function onSubmit(values: z.infer<typeof semesterSchema>) {
    setLoading(true);
    try {
      updateSemester(
        Number(semesterId),
        values.semesterName,
        values.semesterDesc
      );
      setEditModalOpen(false);
      toast({
        title: "Semester card update success!",
      });
    } catch (error) {
      console.error("Error updating semester:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = () => {
    try {
      deleteSemester(Number(semesterId));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error delete semester:", error);
    }
  };

  return (
    <div
      className={cn(
        "flex-col justify-center items-center rounded-md border-[1px] border-info/30 p-3 bg-muted w-full h-[130px] m-2 min-w-[300px] cursor-pointer",
        isActive ? "bg-info-light/20" : "bg-white"
      )}
      onClick={handleStoreSemesterId}
    >
      <div className="flex justify-between items-center">
        <div className="font-semibold">{semesterName}</div>
        <div className="ml-auto text-xs text-foreground">
          {dayjs(createdAt).format("MMM D, YYYY")}
        </div>
      </div>
      <div className="line-clamp-2 text-xs text-muted-foreground">
        {semesterDesc}
      </div>

      <div className="flex justify-end mt-4 min-w-[200px]">
        <Dialog open={isEditModalOpen} onOpenChange={setEditModalOpen}>
          <DialogTrigger>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="primaryOutline">
                    <Pencil className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Edit</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
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
                      <FormField
                        control={form.control}
                        name="semesterName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Semester Name</FormLabel>
                            <FormControl>
                              <Input
                                type="text"
                                placeholder="Semester one ..."
                                autoComplete="off"
                                className="focus:border-1 focus:border-info w-[300px] h-[50px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="semesterDesc"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Some descriptions ..."
                                className="resize-none focus:border-1 focus:border-info w-[300px] h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter className="mt-5">
                  <Button
                    variant="ghost"
                    onClick={() => setEditModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    Save
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
          <DialogTrigger>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="marsOutline" className="m-0">
                    <Trash2 className="h-5 w-5 " />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
                    Are you sure you want to delete this semester card?
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
