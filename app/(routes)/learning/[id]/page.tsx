"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getCourses } from "@/app/actions/courseAction";
import { CourseList } from "./course-list";
import CreateCourse from "./create-course";
import Image from "next/image";

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

  if (courses && courses.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-full ">
        <Image src="/no_content.png" width={60} height={60} alt="no content" />
        <p className=" text-black font-semibold mt-2">No courses founded!</p>
        <p className="text-sm text-muted-foreground font-semibold mt-2">
          You can create a new card by clicking the button or back
        </p>
        <CreateCourse semesterId={Number(semester_id)} />
      </div>
    );
  }

  return (
    <div>
      <CreateCourse semesterId={Number(semester_id)} />
      {courses && <CourseList courses={courses} />}
    </div>
  );
};

export default CoursePage;
