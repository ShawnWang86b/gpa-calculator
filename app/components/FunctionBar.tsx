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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteCourses, updateCourse } from "@/app/actions/courseAction";
import { createAssignment } from "@/app/actions/assignmentAction";
import Image from "next/image";
import useStore from "@/app/store/useStore";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

type CourseFormData = z.infer<typeof courseSchema>;
type AssignmentFormData = z.infer<typeof assignmentSchema>;

const courseSchema = z.object({
  courseName: z
    .string()
    .min(3, { message: "Semester name must be at least 3 characters" })
    .max(30, { message: "Semester name cannot exceed 30 characters" }),
  passingLine: z.number().refine((val) => val >= 1 && val <= 100, {
    message: "Passing line must be between 1 and 100.",
  }),
});

const assignmentSchema = z
  .object({
    assignmentName: z
      .string()
      .min(3, { message: "Semester name must be at least 3 characters" })
      .max(30, { message: "Semester name cannot exceed 30 characters" }),
    weight: z.number().refine((val) => val >= 1 && val <= 100, {
      message: "Passing line must be between 1 and 100.",
    }),
    fullMark: z.number().refine((val) => val >= 1 && val <= 500, {
      message: "Passing line must be between 1 and 500.",
    }),
    scored: z.number().refine((val) => val >= 1 && val <= 500, {
      message: "Scored mark must be between 1 and 500.",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.scored > data.fullMark) {
      ctx.addIssue({
        code: "custom",
        path: ["scored"],
        message: "Scored mark cannot exceed the full mark.",
      });
    }
  });

type FunctionBarProps = {
  courseName: string | undefined;
  passingLine: number | undefined;
  refetchTrigger: boolean;
  setRefetchTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  createSuccessTrigger: boolean;
  setCreateSuccessTrigger: React.Dispatch<React.SetStateAction<boolean>>;
};

const FunctionBar = ({
  courseName,
  passingLine,
  refetchTrigger,
  setRefetchTrigger,
  createSuccessTrigger,
  setCreateSuccessTrigger,
}: FunctionBarProps) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const course_Id = useStore((state) => state.currentValue);

  const [isOpen, setIsOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const courseForm = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      courseName: courseName,
      passingLine: passingLine,
    },
  });

  const assignmentForm = useForm<z.infer<typeof assignmentSchema>>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      assignmentName: "",
      weight: undefined,
      fullMark: undefined,
      scored: undefined,
    },
  });

  async function handleCourseSubmit(values: z.infer<typeof courseSchema>) {
    setLoading(true);
    try {
      await updateCourse(course_Id, values.courseName, values.passingLine);
      setCreateSuccessTrigger(!createSuccessTrigger);
      setIsOpen(false);
      toast({
        title: "Create course card success!",
      });
    } catch (error) {
      console.error("Error creating card:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = () => {
    try {
      deleteCourses(Number(course_Id));
      setCreateSuccessTrigger(!createSuccessTrigger);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error creating assignmnent:", error);
    }
  };

  async function handleAssignmentSubmit(
    values: z.infer<typeof assignmentSchema>
  ) {
    setLoading(true);
    try {
      await createAssignment(
        values.assignmentName,
        values.weight,
        values.fullMark,
        values.scored,
        course_Id
      );
      setRefetchTrigger(!refetchTrigger);
      setIsOpen(false);
      toast({
        title: "Create assignment card success!",
      });
    } catch (error) {
      console.error("Error creating card:", error);
    } finally {
      setLoading(false);
    }
  }

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
          <Form {...courseForm}>
            <form
              onSubmit={courseForm.handleSubmit(handleCourseSubmit)}
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
                      You can update your course card
                    </p>
                    <FormField
                      control={courseForm.control}
                      name="courseName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Machine Learning ..."
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
                      control={courseForm.control}
                      name="passingLine"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Passing score</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Passing score, e.g. 50"
                              autoComplete="off"
                              className="focus:border-1 focus:border-info w-[300px] h-[50px]"
                              {...field}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(parseInt(e.target.value));
                              }}
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
                <Button variant="ghost" onClick={() => setEditModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" disabled={loading}>
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </Form>
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
          <Form {...assignmentForm}>
            <form
              onSubmit={assignmentForm.handleSubmit(handleAssignmentSubmit)}
              className="space-y-8"
            >
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
                    <FormField
                      control={assignmentForm.control}
                      name="assignmentName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Assignment Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="e.g. Technical report ..."
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
                      control={assignmentForm.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Assignment weight, e.g. 25"
                              autoComplete="off"
                              className="focus:border-1 focus:border-leaf w-[300px] h-[50px]"
                              {...field}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(parseInt(e.target.value));
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={assignmentForm.control}
                      name="fullMark"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full mark</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Assignment full mark, e.g. 100"
                              autoComplete="off"
                              className="focus:border-1 focus:border-leaf w-[300px] h-[50px]"
                              {...field}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(parseInt(e.target.value));
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={assignmentForm.control}
                      name="scored"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Scored</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Assignment scored, e.g. 80"
                              autoComplete="off"
                              className="focus:border-1 focus:border-leaf w-[300px] h-[50px]"
                              {...field}
                              value={field.value}
                              onChange={(e) => {
                                field.onChange(parseInt(e.target.value));
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </DialogDescription>
              </DialogHeader>

              <DialogFooter>
                <Button variant="ghost" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" variant="secondary">
                  Create
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FunctionBar;
