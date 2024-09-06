CREATE TABLE IF NOT EXISTS "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"sticker_id" integer NOT NULL,
	"quantity" integer NOT NULL,
	"total_price" numeric NOT NULL,
	"order_date" date DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	"customer_name" text NOT NULL,
	"customer_email" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shopping_cart" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_id" integer NOT NULL,
	"items" jsonb NOT NULL,
	"created_at" date DEFAULT 'CURRENT_TIMESTAMP' NOT NULL,
	"updated_at" date DEFAULT 'CURRENT_TIMESTAMP' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "stickers" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"price" numeric NOT NULL,
	"category_id" integer NOT NULL,
	"images" jsonb NOT NULL,
	"in_stock" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_sticker_id_stickers_id_fk" FOREIGN KEY ("sticker_id") REFERENCES "public"."stickers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "stickers" ADD CONSTRAINT "stickers_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
