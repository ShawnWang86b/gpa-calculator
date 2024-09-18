"use client";

import { courses } from "@/db/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import useStore from "@/app/store/useStore";
import Image from "next/image";
import { getAssignments } from "../actions/assignmentAction";
import AssignmentCard from "@/app/components/AssignmentCard";
import FunctionBar from "@/app/components/FunctionBar";
import { FilePlus } from "lucide-react";

type Props = {
  courses: Array<typeof courses.$inferSelect>;
  createSuccessTrigger: boolean;
  setCreateSuccessTrigger: React.Dispatch<React.SetStateAction<boolean>>;
};

type Course = {
  id: number;
  courseName: string;
  passingLine: number;
};

type Assignment = {
  assignmentName: string;
  weight: number;
  fullMark: number;
  scored: number;
  id: number;
  hurdle: number;
  courseId: number;
};

const CourseTabs = ({
  courses,
  createSuccessTrigger,
  setCreateSuccessTrigger,
}: Props) => {
  const currentValue = useStore((state) => state.currentValue);
  const setCurrentValue = useStore((state) => state.setCurrentValue);
  const setAssingmentValue = useStore((state) => state.setAssignmentValue);
  const [currentCourse, setCurrentCourse] = useState<Course>();
  const [assignments, setAssignments] = useState<Assignment[] | undefined>([]);
  const [refetchTrigger, setRefetchTrigger] = useState(false);
  const [assignmentRefetchTrigger, setAssignmentRefetchTrigger] =
    useState(false);
  const [assignmentCounts, setAssignmentCounts] = useState<
    Record<number, number>
  >({});

  useEffect(() => {
    if (courses.length > 0 && !currentValue) {
      const firstCourseId = courses[0].id;
      if (firstCourseId !== undefined) {
        setCurrentValue(firstCourseId);
      }
    }
  }, [courses, currentValue, setCurrentValue]);

  useEffect(() => {
    if (courses && currentValue) {
      const course = courses.find(
        (course: Course) => currentValue === course.id
      );

      setCurrentCourse(course);
      const courseId = course?.id;

      if (courseId) {
        const fetchAssignments = async () => {
          try {
            const result = await getAssignments(Number(courseId));
            //@ts-ignore
            setAssignments(result);
            //@ts-ignore
            setAssingmentValue(result);
          } catch (error) {
            console.error("Error fetching assignments:", error);
          }
        };

        fetchAssignments();
      }
    }
  }, [
    currentValue,
    courses,
    refetchTrigger,
    assignmentRefetchTrigger,
    setAssingmentValue,
  ]);

  const handleAssignmentNumber = async (course_id: number) => {
    const result = await getAssignments(course_id);
    const length = result.length;
    setAssignmentCounts((prev) => ({
      ...prev,
      [course_id]: length,
    }));
  };

  useEffect(() => {
    // Trigger initial loading for all courses (optional)
    courses.forEach((course) => {
      handleAssignmentNumber(course.id);
    });
    setAssignmentRefetchTrigger(assignmentRefetchTrigger);
  }, [courses, assignmentRefetchTrigger]);

  return (
    <Tabs defaultValue={courses[0].id?.toString()} className="h-screen">
      <TabsList className="mt-9 mb-5 ml-5">
        {courses.map((course: Course) => (
          <>
            <TabsTrigger
              value={course.id.toString()}
              key={course.id}
              className="mr-1"
              onClick={() => {
                setCurrentValue(course.id);
              }}
            >
              <div>
                <p> {course.courseName}</p>
                <div className="text-xs">
                  Passing line: {course.passingLine}%
                </div>
                <div className="text-xs">
                  Assignments number:{" "}
                  {assignmentCounts[course.id] ?? "Loading..."}
                </div>
              </div>
            </TabsTrigger>
          </>
        ))}
      </TabsList>
      <TabsContent
        value={currentValue.toString()}
        className="h-full w-full border-t-[1px] px-4"
      >
        <div>
          {assignments?.length === 0 ? (
            <>
              <div className="h-12 border-b-[1px]">
                <FunctionBar
                  courseName={currentCourse?.courseName}
                  passingLine={currentCourse?.passingLine}
                  refetchTrigger={refetchTrigger}
                  setRefetchTrigger={setRefetchTrigger}
                  createSuccessTrigger={createSuccessTrigger}
                  setCreateSuccessTrigger={setCreateSuccessTrigger}
                />
              </div>
              <div className="flex flex-col justify-start mt-20 xl:mt-0 xl:justify-center items-center flex-grow min-h-[calc(100vh-300px)]">
                <Image
                  src="/no_course.png"
                  width={60}
                  height={60}
                  alt="no course"
                />
                <p className=" text-black font-semibold mt-2">
                  No assignment founded!
                </p>
                <p className="text-sm text-muted-foreground font-semibold mt-2 inline-flex">
                  Hit the <FilePlus className="mx-2" /> button to create a new
                  assignment card.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="h-12 border-b-[1px]">
                <FunctionBar
                  courseName={currentCourse?.courseName}
                  passingLine={currentCourse?.passingLine}
                  refetchTrigger={refetchTrigger}
                  setRefetchTrigger={setRefetchTrigger}
                  createSuccessTrigger={createSuccessTrigger}
                  setCreateSuccessTrigger={setCreateSuccessTrigger}
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-5 2xl:grid-cols-3 2xl:gap-x-12 mt-5 bg-slate-100 ">
                {assignments?.map((assignment: Assignment) => (
                  <div key={assignment.id} className="min-w-[200px]">
                    <AssignmentCard
                      assignment={assignment}
                      assignmentRefetchTrigger={assignmentRefetchTrigger}
                      setAssignmentRefetchTrigger={setAssignmentRefetchTrigger}
                    />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default CourseTabs;
