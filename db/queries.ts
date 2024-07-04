import { cache } from "react";
import db from "./drizzle";

export const getCategories = cache(async () => {
  const data = await db.query.categories.findMany();

  return data;
});
