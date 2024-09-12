"use client";

import SemesterCard from "@/app/components/SemesterCard";
import { semesters } from "@/db/schema";
type Props = {
  semesters: Array<typeof semesters.$inferSelect>;
};

export const List = ({ semesters }: Props) => {
  return (
    <div className="pt-6 grid grid-cols-2 gap-4 w-[1080px]">
      {semesters.map((semester: any) => (
        <SemesterCard
          key={semester.id}
          semesterId={semester.id}
          semesterName={semester.semesterName}
        />
      ))}
    </div>
  );
};
