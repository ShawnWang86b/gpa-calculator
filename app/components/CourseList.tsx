"use client";

import CourseCard from "@/app/components/CourseCard";
import { courses } from "@/db/schema";
import Link from "next/link";

type Props = {
  courses: Array<typeof courses.$inferInsert>;
};

export const CourseList = ({ courses }: Props) => {
  return (
    <div className="pt-6 grid grid-cols-3 gap-4">
      {courses.map((course: any) => (
        <Link href={`/courses/${course.id}`} key={course.id}>
          <div>
            <CourseCard oneCourse={course} />
          </div>
        </Link>
      ))}
    </div>
  );
};
