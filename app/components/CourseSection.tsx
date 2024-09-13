"use client";

import { useEffect, useState } from "react";
import { getCourses } from "@/app/actions/courseAction";
import { CourseList } from "@/app/components/CourseList";
import CreateCourse from "@/app/components/CreateCourse";
import Image from "next/image";
import useStore from "@/app/store/useStore";
import CourseTabs from "@/app/components/CourseTabs";

type Props = {
  id: number;
  courseName: string;
  passingLine: number;
  semesterId: number;
};

const CourseSection = () => {
  const [courses, setCourses] = useState<Props[] | null>(null);
  const [createSuccessTrigger, setCreateSuccessTrigger] = useState(false);
  const semester_id = useStore((state) => state.selectedSemesterId);

  useEffect(() => {
    if (semester_id) {
      const fetchCourses = async () => {
        try {
          const result = await getCourses(Number(semester_id));
          setCourses(result);
        } catch (error) {
          console.error("Error fetching semesters:", error);
        }
      };

      fetchCourses();
    }
  }, [semester_id, createSuccessTrigger]);

  console.log("semester_id", semester_id);
  console.log("courses111", courses);
  if (!courses || courses.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-[90vh]">
        <Image src="/no_content.png" width={60} height={60} alt="no content" />
        <p className=" text-black font-semibold mt-2">No courses founded!</p>
        <p className="text-sm text-muted-foreground font-semibold mt-2">
          You can create a new card by clicking the button or back
        </p>
        <div className="mt-2">
          <CreateCourse
            createSuccessTrigger={createSuccessTrigger}
            setCreateSuccessTrigger={setCreateSuccessTrigger}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="border-b-[1px] p-1">
        <CreateCourse
          createSuccessTrigger={createSuccessTrigger}
          setCreateSuccessTrigger={setCreateSuccessTrigger}
        />
      </div>

      {courses && <CourseTabs courses={courses} />}
    </div>
  );
};

export default CourseSection;
