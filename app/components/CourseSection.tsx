"use client";

import { useEffect, useState } from "react";
import { getCourses } from "@/app/actions/courseAction";
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
  const currentValue = useStore((state) => state.currentValue);

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

  if (!courses || courses.length === 0) {
    return (
      <div className="flex flex-col justify-start mt-20 xl:mt-0 xl:justify-center items-center flex-grow min-h-[calc(100vh-80px)]">
        <Image src="/no_content.png" width={60} height={60} alt="no content" />
        <p className=" text-black font-semibold mt-2">No courses founded!</p>
        <p className="text-sm text-muted-foreground font-semibold mt-2">
          Click on a semester card, then hit the button to create a new course
          card.
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
      <div className="border-b-[1px] pb-2 ">
        <CreateCourse
          createSuccessTrigger={createSuccessTrigger}
          setCreateSuccessTrigger={setCreateSuccessTrigger}
        />
      </div>

      {courses && (
        <CourseTabs
          courses={courses}
          createSuccessTrigger={createSuccessTrigger}
          setCreateSuccessTrigger={setCreateSuccessTrigger}
        />
      )}
    </div>
  );
};

export default CourseSection;
