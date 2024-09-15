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
import { createSemester } from "@/app/actions/semesterAction";
import { useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

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

const CreateSemester = () => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof semesterSchema>>({
    resolver: zodResolver(semesterSchema),
    defaultValues: {
      semesterName: "",
      semesterDesc: "",
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  async function onSubmit(values: z.infer<typeof semesterSchema>) {
    setLoading(true);
    try {
      await createSemester(values.semesterName, values.semesterDesc);
      setIsOpen(false);
      toast({
        title: "Create semester card success!",
      });
    } catch (error) {
      console.error("Error creating semester:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex ml-2 mr-2.5 justify-between items-center">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary">
            <Plus className="w-6 h-6 mr-2" />
            <p>NEW</p>
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px] w-full">
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
                      You can create a new semester card
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
                      name="semesterDesc"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Some descriptions ..."
                              className="resize-none focus:border-1 focus:border-leaf w-[300px] h-[100px]"
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

export default CreateSemester;
