"use server";

import { cache } from "react";
import db from "@/db/drizzle";
import { auth, currentUser } from "@clerk/nextjs/server";
import { semesters, courses } from "@/db/schema";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Create a semester card
export const createCourse = async (courseInfo: {
  courseName: string;
  passingLine: number;
  semesterId: number;
}) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  const { courseName, passingLine, semesterId } = courseInfo;
  console.log("courseInfo", courseInfo);
  await db
    .insert(courses)
    .values({
      courseName,
      passingLine,
      semesterId,
    })
    .returning();
};

// Get all semesters
export const getCourses = cache(async (semester_id: number) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!semester_id) {
    throw new Error("No semester created");
  }

  const data = await db.query.courses.findMany({
    where: eq(courses.semesterId, semester_id),
  });

  return data;
});
