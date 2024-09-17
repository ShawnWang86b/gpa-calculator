import { relations } from "drizzle-orm";
import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";

// Semesters table
export const semesters = pgTable("semesters", {
  id: serial("id").primaryKey(),
  semesterName: text("semester_name").notNull(),
  semesterDesc: text("semester_desc").notNull(),
  userId: text("user_id").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Courses table
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  courseName: text("course_name").notNull(),
  passingLine: integer("passing_line").notNull(),
  semesterId: integer("semester_id")
    .notNull()
    .references(() => semesters.id, { onDelete: "cascade" }),
});

// Assignments table
export const assignments = pgTable("assignments", {
  id: serial("id").primaryKey(),
  assignmentName: text("assignment_name").notNull(),
  weight: integer("weight").notNull(),
  fullMark: integer("full_mark").notNull().default(0),
  scored: integer("scored").notNull().default(0),
  hurdle: integer("hurdle").default(50),
  courseId: integer("course_id")
    .notNull()
    .references(() => courses.id, { onDelete: "cascade" }),
});

// Define relationships
export const semestersRelations = relations(semesters, ({ many }) => ({
  courses: many(courses),
}));

export const coursesRelations = relations(courses, ({ many, one }) => ({
  semester: one(semesters),
  assignments: many(assignments),
}));

export const assignmentsRelations = relations(assignments, ({ one }) => ({
  course: one(courses),
}));
