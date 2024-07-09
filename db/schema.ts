import { relations } from "drizzle-orm";
import {
  pgTable,
  serial,
  text,
  integer,
  boolean,
  date,
  decimal,
  jsonb,
} from "drizzle-orm/pg-core";

// Categories table
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
});

// Stickers table
export const stickers = pgTable("stickers", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  price: decimal("price").notNull(),
  category_id: integer("category_id")
    .references(() => categories.id)
    .notNull(),
  images: jsonb("images").notNull(),
  in_stock: boolean("in_stock").notNull().default(true),
});

// Orders table
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  sticker_id: integer("sticker_id")
    .references(() => stickers.id)
    .notNull(),
  quantity: integer("quantity").notNull(),
  total_price: decimal("total_price").notNull(),
  order_date: date("order_date").notNull().default("CURRENT_TIMESTAMP"),
  customer_name: text("customer_name").notNull(),
  customer_email: text("customer_email").notNull(),
});

// Shopping Cart table
export const shoppingCart = pgTable("shopping_cart", {
  id: serial("id").primaryKey(),
  customer_id: integer("customer_id").notNull(),
  items: jsonb("items").notNull(), // Array of sticker ids and quantities
  created_at: date("created_at").notNull().default("CURRENT_TIMESTAMP"),
  updated_at: date("updated_at").notNull().default("CURRENT_TIMESTAMP"),
});
