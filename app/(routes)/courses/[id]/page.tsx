"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getCourses } from "@/app/actions/courseAction";
import CreateAssignment from "./create-assignment";

const AssignmentPage = () => {
  const pathname = usePathname();

  const [courses, setCourses] = useState<any[] | null>(null);
  const course_id = pathname.split("/").pop();

  return (
    <div>
      <CreateAssignment courseId={Number(course_id)} />
      <div>AssignmentPage:{course_id}</div>
    </div>
  );
};

export default AssignmentPage;
