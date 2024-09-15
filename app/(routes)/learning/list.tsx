"use client";

import SemesterCard from "@/app/components/SemesterCard";
import useStore from "@/app/store/useStore";
import { semesters } from "@/db/schema";

type Semesters = {
  semesters: Array<typeof semesters.$inferSelect>;
};

type Semester = {
  id: number;
  semesterName: string;
  semesterDesc: string;
  userId: string;
  createdAt: Date;
};

export const List = ({ semesters }: Semesters) => {
  const setSelectedSemesterId = useStore(
    (state) => state.setSelectedSemesterId
  );

  // set a default semester Id when user first navigate to route /learning
  const defaultSemesterId = semesters[0].id.toString();
  setSelectedSemesterId(defaultSemesterId);

  return (
    <div className="h-[800px] scroll-container">
      {semesters.map((semester: Semester) => (
        <SemesterCard
          key={semester.id}
          semesterId={String(semester.id)}
          semesterName={semester.semesterName}
          semesterDesc={semester.semesterDesc}
          createdAt={semester.createdAt}
        />
      ))}
    </div>
  );
};
