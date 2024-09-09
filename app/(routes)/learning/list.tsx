"use client";

import SemesterCard from "@/app/components/SemesterCard";
import { semesters } from "@/db/schema";
import Link from "next/link";

type Props = {
  semesters: Array<typeof semesters.$inferSelect>;
};

export const List = ({ semesters }: Props) => {
  return (
    <div className="pt-6 grid grid-cols-3 gap-4">
      {semesters.map((semester: any) => (
        <Link href={`/learning/${semester.id}`} key={semester.id}>
          <div>
            <SemesterCard semesterName={semester.semesterName} />
          </div>
        </Link>
      ))}
    </div>
  );
};
