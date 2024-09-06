import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  integer,
  timestamp,
  foreignKey,
} from "drizzle-orm/pg-core";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  clerkId: text("clerkId").notNull(),
  firstName: text("firstName").notNull(),
  lastName: text("lastName").notNull(),
  photo: text("photo").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Semesters table
export const semesters = pgTable("semesters", {
  id: serial("id").primaryKey(),
  semesterName: text("semester_name").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id), // Foreign key
});

// Courses table
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  courseName: text("course_name").notNull(),
  semesterId: integer("semester_id")
    .notNull()
    .references(() => semesters.id), // Foreign key
});

// Assignments table
export const assignments = pgTable("assignments", {
  id: serial("id").primaryKey(),
  assignmentName: text("assignment_name").notNull(),
  weight: integer("weight").notNull(),
  fullMark: integer("full_mark").default(0),
  scored: integer("scored").default(0),
  courseId: integer("course_id")
    .notNull()
    .references(() => courses.id), // Foreign key
});

// Define relationships
export const usersRelations = relations(users, ({ many }) => ({
  semesters: many(semesters),
}));

export const semestersRelations = relations(semesters, ({ many, one }) => ({
  user: one(users),
  courses: many(courses),
}));

export const coursesRelations = relations(courses, ({ many, one }) => ({
  semester: one(semesters),
  assignments: many(assignments),
}));

export const assignmentsRelations = relations(assignments, ({ one }) => ({
  course: one(courses),
}));
