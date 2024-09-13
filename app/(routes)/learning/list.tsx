"use client";

import SemesterCard from "@/app/components/SemesterCard";
import { semesters } from "@/db/schema";

type Semesters = {
  semesters: Array<typeof semesters.$inferSelect>;
};

type Semester = {
  id: number;
  semesterName: string;
  userId: string;
  createdAt: Date;
};

export const List = ({ semesters }: Semesters) => {
  return (
    <div>
      {semesters.map((semester: Semester) => (
        <SemesterCard
          key={semester.id}
          semesterId={String(semester.id)}
          semesterName={semester.semesterName}
          createdAt={semester.createdAt}
        />
      ))}
    </div>
  );
};
