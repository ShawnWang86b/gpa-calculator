ALTER TABLE "assignments" ALTER COLUMN "scored" SET DEFAULT 0;--> statement-breakpoint
ALTER TABLE "assignments" ALTER COLUMN "scored" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "assignments" ADD COLUMN "hurdle" integer DEFAULT 50;