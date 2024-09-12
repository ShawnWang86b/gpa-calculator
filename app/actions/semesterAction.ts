"use server";

import { cache } from "react";
import db from "@/db/drizzle";
import { auth, currentUser } from "@clerk/nextjs/server";
import { semesters } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Create a semester card
export const createSemester = async (semesterName: string) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  await db
    .insert(semesters)
    .values({
      semesterName,
      userId,
    })
    .returning();

  revalidatePath("/learning");
  redirect("/learning");
};

// Get all semesters
export const getSemesters = cache(async () => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  const data = await db.query.semesters.findMany({
    where: eq(semesters.userId, userId),
  });

  return data;
});

// Delete a semester
// FIXME: will change semester_id from num to string
export const deleteSemester = async (semester_id: number) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db.delete(semesters).where(eq(semesters.id, semester_id));
  revalidatePath("/learning");
};

// Update the semester info
export const updateSemester = async (
  semester_id: number,
  updatedSemesterName: string
) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db
    .update(semesters)
    .set({ semesterName: updatedSemesterName })
    .where(eq(semesters.id, semester_id));
  revalidatePath("/learning");
};
