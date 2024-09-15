"use server";

import { cache } from "react";
import db from "@/db/drizzle";
import { auth, currentUser } from "@clerk/nextjs/server";
import { courses } from "@/db/schema";
import { eq } from "drizzle-orm";

// Create a semester card
export const createCourse = async (
  semesterId: number,
  courseName: string,
  passingLine: number
) => {
  const { userId } = await auth();
  const user = await currentUser();

  if (!userId || !user) {
    throw new Error("Unauthorized");
  }

  await db
    .insert(courses)
    .values({ semesterId, courseName, passingLine })
    .returning();
};

// Get all courses
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

// Delete a courses
export const deleteCourses = async (courseId: number) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!courseId) {
    throw new Error("No course id founded");
  }

  await db.delete(courses).where(eq(courses.id, courseId));
};

// update a course
export const updateCourse = async (
  courseId: number,
  updatedCourseName: string,
  updatedPassingLine: number
) => {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  await db
    .update(courses)
    .set({
      courseName: updatedCourseName,
      passingLine: updatedPassingLine,
    })
    .where(eq(courses.id, courseId));
};
