import { cache } from "react";
import db from "./drizzle";
import { auth } from "@clerk/nextjs/server";
import { semesters } from "./schema";
import { eq } from "drizzle-orm";

export const createSemester = async (semesterName: string) => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const data = await db
    .insert(semesters)
    .values({
      semesterName,
      userId,
    })
    .returning();

  return data;
};

export const updateSemester = async (semesterName: string) => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const data = await db
    .update(semesters)
    .set({
      semesterName,
    })
    .where(eq(semesters.userId, userId))
    .returning();

  return data;
};

// Get all semester
export const getSemesters = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const data = await db.query.semesters.findMany({
    where: eq(semesters.userId, userId),
  });

  return data;
});

export const deleteSemester = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    return null;
  }

  const data = await db
    .delete(semesters)
    .where(eq(semesters.userId, userId))
    .returning();

  return data;
});
