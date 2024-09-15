"use server";

import { cache } from "react";
import db from "@/db/drizzle";
import { auth, currentUser } from "@clerk/nextjs/server";
import { assignments } from "@/db/schema";
import { eq } from "drizzle-orm";

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
};

// Get all Assignment
export const getAssignments = cache(async (courseId: number) => {
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

// delete a assignment
export const deleteAssignment = async (assignmentsId: number) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!assignmentsId) {
    throw new Error("No assignmentsId id founded");
  }

  await db.delete(assignments).where(eq(assignments.id, assignmentsId));
};

// update a assignment
export const updateAssignment = async (
  assignmentId: number,
  updatedAssignmentName: string,
  updatedWeight: number,
  updatedFullMark: number,
  updatedScored: number
) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db
    .update(assignments)
    .set({
      assignmentName: updatedAssignmentName,
      weight: updatedWeight,
      fullMark: updatedFullMark,
      scored: updatedScored,
    })
    .where(eq(assignments.id, assignmentId));
};
