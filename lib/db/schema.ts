import {
  pgTable,
  serial,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  numeric,
} from "drizzle-orm/pg-core";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description").notNull(),
  location: varchar("location", { length: 255 }).notNull(),
  image: text("image").notNull(),
  gallery: text("gallery").array().notNull().default([]),
  features: text("features").array().notNull().default([]),
  category: varchar("category", { length: 50 }).notNull().default("realized"),
  latitude: numeric("latitude"),
  longitude: numeric("longitude"),
  totalUnits: integer("total_units").notNull(),
  floors: integer("floors").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const units = pgTable("units", {
  id: serial("id").primaryKey(),
  projectId: integer("project_id")
    .notNull()
    .references(() => projects.id, { onDelete: "cascade" }),
  unitId: varchar("unit_id", { length: 50 }).notNull(),
  floor: integer("floor").notNull(),
  number: varchar("number", { length: 50 }).notNull(),
  type: varchar("type", { length: 50 }).notNull(),
  area: numeric("area").notNull(),
  rooms: integer("rooms").notNull(),
  orientation: varchar("orientation", { length: 50 }).notNull(),
  status: varchar("status", { length: 20 }).notNull().default("available"),
  row: integer("row").notNull(),
  col: integer("col").notNull(),
});

export const articles = pgTable("articles", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  content: text("content").notNull(),
  image: text("image"),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
