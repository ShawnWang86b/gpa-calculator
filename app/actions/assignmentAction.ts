"use server";

import { cache } from "react";
import db from "@/db/drizzle";
import { auth, currentUser } from "@clerk/nextjs/server";
import { semesters, courses, assignments } from "@/db/schema";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Create a semester card
export const createAssignment = async (assignmentInfo: {
  assignmentName: string;
  weight: number;
  fullMark: number;
  scored: number;
  courseId: number;
}) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const { assignmentName, weight, fullMark, scored, courseId } = assignmentInfo;

  await db
    .insert(assignments)
    .values({
      assignmentName,
      weight,
      fullMark,
      scored,
      courseId,
    })
    .returning();

  revalidatePath("/courses");
  //   redirect("/courses");
};

// Get all Assignment
export const getAssignments = cache(async (courseId: number) => {
  console.log("courseId--server", courseId);
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!courseId) {
    throw new Error("No course founded");
  }

  const data = await db.query.assignments.findMany({
    where: eq(assignments.courseId, courseId),
  });

  return data;
});
