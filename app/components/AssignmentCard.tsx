import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  deleteAssignment,
  updateAssignment,
} from "@/app/actions/assignmentAction";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";

type Assignment = {
  id: number;
  assignmentName: string;
  weight: number;
  fullMark: number;
  scored: number;
  hurdle: number;
  courseId: number;
};

type Props = {
  assignment: Assignment;
  assignmentRefetchTrigger: boolean;
  setAssignmentRefetchTrigger: React.Dispatch<React.SetStateAction<boolean>>;
};

type AssignmentFormData = z.infer<typeof assignmentSchema>;
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
    hurdle: z
      .number()
      .optional()
      .default(50)
      .refine((val) => val >= 1 && val <= 100, {
        message: "Hurdle must be between 1 and 100.",
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

const AssignmentCard = ({
  assignment,
  assignmentRefetchTrigger,
  setAssignmentRefetchTrigger,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const assignmentForm = useForm<z.infer<typeof assignmentSchema>>({
    resolver: zodResolver(assignmentSchema),
    defaultValues: {
      assignmentName: assignment.assignmentName,
      weight: assignment.weight,
      fullMark: assignment.fullMark,
      scored: assignment.scored,
      hurdle: assignment.hurdle,
    },
  });

  async function handleAssignmentSubmit(
    values: z.infer<typeof assignmentSchema>
  ) {
    setLoading(true);
    try {
      await updateAssignment(
        Number(assignment.id),
        values.assignmentName,
        Number(values.weight),
        Number(values.fullMark),
        Number(values.scored),
        Number(values.hurdle)
      );
      setAssignmentRefetchTrigger(!assignmentRefetchTrigger);
      setEditModalOpen(false);
      toast({
        title: "Update assignment card success!",
      });
    } catch (error) {
      console.error("Error creating card:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleDelete = () => {
    try {
      deleteAssignment(Number(assignment.id));
      setAssignmentRefetchTrigger(!assignmentRefetchTrigger);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error delete assignmnent:", error);
    }
  };

  return (
    <div className="border-[1px] border-info/30 rounded-md p-4 bg-muted w-[280px] mb-2">
      <p className="font-bold uppercase">{assignment.assignmentName}</p>
      <div className="mt-4">
        <div className="flex items-center justify-between">
          <p className="">Weight(%):</p>
          <p className="text-sm">{assignment.weight}%</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Full mark:</p>
          <p className="text-sm">{assignment.fullMark}</p>
        </div>
        <div className="flex items-center justify-between">
          <p>Scored:</p>
          <p className="text-sm">
            <span className="">{assignment.scored}</span>/{assignment.fullMark}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p>Hurdle:</p>
          <p className="text-sm">{assignment.hurdle}</p>
        </div>
      </div>
      <div className="flex mt-4 justify-end">
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
            <Form {...assignmentForm}>
              <form
                onSubmit={assignmentForm.handleSubmit(handleAssignmentSubmit)}
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
                        You can update your assignment details
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
                  <Button
                    variant="ghost"
                    onClick={() => setEditModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="primary">
                    Submit
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
                    Are you sure you want to delete this assignment card?
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
