"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getCourses } from "@/app/actions/courseAction";
import { CourseList } from "./course-list";
import CreateCourse from "./create-course";

type Props = {
  id: number;
  courseName: string;
  passingLine: number;
  semesterId: number;
};

const CoursePage = () => {
  const pathname = usePathname();

  const [courses, setCourses] = useState<Props[] | null>(null);
  const semester_id = pathname.split("/").pop();

  useEffect(() => {
    if (semester_id) {
      const fetchSemesters = async () => {
        try {
          const result = await getCourses(Number(semester_id));
          setCourses(result);
        } catch (error) {
          console.error("Error fetching semesters:", error);
        }
      };

      fetchSemesters();
    }
  }, [semester_id]);
  // create a course
  console.log("courses", courses);
  // display courses
  return (
    <div>
      semester id is :{semester_id}
      <CreateCourse semesterId={Number(semester_id)} />
      {courses && <CourseList courses={courses} />}
    </div>
  );
};

export default CoursePage;
