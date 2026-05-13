import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import { eq } from "drizzle-orm";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

async function updateCategories() {
  console.log("Updating existing projects to 'realized'...");
  await db.update(schema.projects).set({ category: "realized" });
  console.log("Done!");
}

updateCategories().catch(console.error);
