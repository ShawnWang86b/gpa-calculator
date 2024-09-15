"use client";

import { assignments, courses } from "@/db/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import useStore from "@/app/store/useStore";
import Image from "next/image";
import { getAssignments } from "../actions/assignmentAction";
import AssignmentCard from "@/app/components/AssignmentCard";
import FunctionBar from "@/app/components/FunctionBar";

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
  courseId: number;
};

const CourseTabs = ({
  courses,
  createSuccessTrigger,
  setCreateSuccessTrigger,
}: Props) => {
  const currentValue = useStore((state) => state.currentValue);
  const setCurrentValue = useStore((state) => state.setCurrentValue);
  const [currentCourse, setCurrentCourse] = useState<Course>();
  const [assignments, setAssignments] = useState<Assignment[] | undefined>([]);
  const [refetchTrigger, setRefetchTrigger] = useState(false);
  const [assignmentRefetchTrigger, setAssignmentRefetchTrigger] =
    useState(false);

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

            setAssignments(result);
          } catch (error) {
            console.error("Error fetching assignments:", error);
          }
        };

        fetchAssignments();
      }
    }
  }, [currentValue, courses, refetchTrigger, assignmentRefetchTrigger]);

  return (
    <Tabs defaultValue={courses[0].id?.toString()} className="h-screen">
      <TabsList className="mt-5 mb-3">
        {courses.map((course: any) => (
          <>
            <TabsTrigger
              value={course.id.toString()}
              key={course.id}
              className="mr-1"
              onClick={() => setCurrentValue(course.id)}
            >
              <div>
                <p> {course.courseName}</p>
                <div className="text-xs">
                  Passing line: {course.passingLine}%
                </div>
                <div className="text-xs">
                  Courses number: {assignments?.length || 0}
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
                <p className="text-sm text-muted-foreground font-semibold mt-2">
                  Hit the new assignment button to create a new assignment card.
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-3 bg-slate-100">
                {assignments?.map((assignment: any) => (
                  <div key={assignment.id}>
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
