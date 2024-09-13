"use client";

import { assignments, courses } from "@/db/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import useStore from "@/app/store/useStore";
import { GridBackground } from "@/components/ui/gridBackground";
import { getAssignments } from "../actions/assignmentAction";
import AssignmentCard from "./AssignmentCard";

type Props = {
  courses: Array<typeof courses.$inferInsert>;
};

type Assignment = {
  assignments: typeof assignments.$inferInsert;
};

const CourseTabs = ({ courses }: Props) => {
  const currentValue = useStore((state) => state.currentValue);
  const setCurrentValue = useStore((state) => state.setCurrentValue);
  const [assignments, setAssignments] = useState<Assignment[] | undefined>([]);

  // FIXME: here has bug, fix later
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
      const course = courses.find((course: any) => currentValue === course.id);
      const courseId = course?.id;

      if (courseId) {
        const fetchAssignments = async () => {
          try {
            const result = await getAssignments(Number(courseId));
            console.log("result", result);
            //@ts-ignore
            setAssignments(result);
          } catch (error) {
            console.error("Error fetching assignments:", error);
          }
        };

        fetchAssignments();
      }
    }
  }, [currentValue, courses]);

  return (
    <Tabs defaultValue={courses[0].id?.toString()} className="h-screen ">
      <TabsList className="h-[100px]">
        {courses.map((course: any) => (
          <>
            <TabsTrigger
              value={course.id.toString()}
              key={course.id}
              className="mr-1"
              onClick={() => setCurrentValue(course.id)}
            >
              {course.courseName}
            </TabsTrigger>
          </>
        ))}
      </TabsList>
      <TabsContent
        value={currentValue.toString()}
        className="h-full w-full border-t-2 border-info"
      >
        <div className="grid grid-cols-2">
          {assignments?.length === 0 ? (
            <div>no con</div>
          ) : (
            assignments?.map((assignment: any) => (
              <div key={assignment.id}>
                <AssignmentCard assignment={assignment} />
              </div>
            ))
          )}
        </div>
        <p className="z-10">this is {currentValue}</p>
      </TabsContent>
    </Tabs>
  );
};

export default CourseTabs;
