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
import { Plus } from "lucide-react";
import { createCourse } from "@/app/actions/courseAction";
import Image from "next/image";
import useStore from "@/app/store/useStore";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

type CourseFormData = z.infer<typeof courseSchema>;

const courseSchema = z.object({
  courseName: z
    .string()
    .min(3, { message: "Semester name must be at least 3 characters" })
    .max(30, { message: "Semester name cannot exceed 30 characters" }),
  passingLine: z.number().refine((val) => val >= 1 && val <= 100, {
    message: "Passing line must be between 1 and 100.",
  }),
});

type Props = {
  createSuccessTrigger: boolean;
  setCreateSuccessTrigger: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateCourse = ({
  createSuccessTrigger,
  setCreateSuccessTrigger,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const selectedSemesterId = useStore((state) => state.selectedSemesterId);

  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      courseName: "",
      passingLine: undefined,
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  async function onSubmit(values: z.infer<typeof courseSchema>) {
    setLoading(true);
    try {
      await createCourse(
        Number(selectedSemesterId),
        values.courseName,
        Number(values.passingLine)
      );
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

  return (
    <div className="flex ml-2 mr-2.5 gap-5 items-center">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary">
            <Plus className="w-6 h-6 mr-2" />
            <p>COURSE</p>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                      You can create a new course card
                    </p>
                    <FormField
                      control={form.control}
                      name="courseName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Course Name</FormLabel>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Machine Learning ..."
                              autoComplete="off"
                              className="focus:border-1 focus:border-leaf w-[300px] h-[50px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="passingLine"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Passing score</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Passing score, e.g. 50"
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
                <Button type="submit" variant="secondary" disabled={loading}>
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

export default CreateCourse;
