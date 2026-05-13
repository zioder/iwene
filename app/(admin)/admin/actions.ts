"use server";

import { cookies } from "next/headers";
import { db } from "@/lib/db";
import { projects, units, articles } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";
import { revalidatePath } from "next/cache";

const COOKIE_NAME = "admin_session";
const SESSION_TOKEN = process.env.ADMIN_PASSWORD || "admin123";

export async function loginAction(password: string) {
  if (password !== SESSION_TOKEN) {
    return { success: false, error: "Invalid password" };
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, SESSION_TOKEN, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  return { success: true };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
  return { success: true };
}

export async function getProjects() {
  await requireAdmin();
  return db.select().from(projects).orderBy(desc(projects.createdAt));
}

export async function getProjectById(id: number) {
  await requireAdmin();
  const result = await db
    .select()
    .from(projects)
    .where(eq(projects.id, id))
    .limit(1);
  return result[0] || null;
}

export async function getProjectUnits(projectId: number) {
  await requireAdmin();
  return db
    .select()
    .from(units)
    .where(eq(units.projectId, projectId))
    .orderBy(units.floor, units.number);
}

export async function createProject(data: {
  name: string;
  slug: string;
  description: string;
  location: string;
  image: string;
  gallery: string[];
  features: string[];
  category: string;
  totalUnits: number;
  floors: number;
}) {
  await requireAdmin();
  const result = await db
    .insert(projects)
    .values(data)
    .returning();
  revalidatePath("/admin/projets");
  revalidatePath("/projets");
  return result[0];
}

export async function updateProject(
  id: number,
  data: {
    name: string;
    slug: string;
    description: string;
    location: string;
    image: string;
    gallery: string[];
    features: string[];
    category: string;
    totalUnits: number;
    floors: number;
  }
) {
  await requireAdmin();
  const result = await db
    .update(projects)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(projects.id, id))
    .returning();
  revalidatePath("/admin/projets");
  revalidatePath("/projets");
  return result[0];
}

export async function deleteProject(id: number) {
  await requireAdmin();
  await db.delete(units).where(eq(units.projectId, id));
  await db.delete(projects).where(eq(projects.id, id));
  revalidatePath("/admin/projets");
  return { success: true };
}

export async function toggleUnitStatus(unitId: number) {
  await requireAdmin();
  const unit = await db
    .select()
    .from(units)
    .where(eq(units.id, unitId))
    .limit(1);

  if (!unit[0]) return { error: "Unit not found" };

  const newStatus = unit[0].status === "sold" ? "available" : "sold";

  await db
    .update(units)
    .set({ status: newStatus })
    .where(eq(units.id, unitId));

  revalidatePath("/admin/projets/[id]", "page");
  revalidatePath("/projets", "layout");
  return { success: true, status: newStatus };
}

export async function updateUnitStatus(unitId: number, status: string) {
  await requireAdmin();
  await db
    .update(units)
    .set({ status })
    .where(eq(units.id, unitId));
  revalidatePath("/admin/projets/[id]", "page");
  revalidatePath("/projets", "layout");
  return { success: true };
}

export async function getArticles() {
  await requireAdmin();
  return db.select().from(articles).orderBy(desc(articles.createdAt));
}

export async function getArticleById(id: number) {
  await requireAdmin();
  const result = await db
    .select()
    .from(articles)
    .where(eq(articles.id, id))
    .limit(1);
  return result[0] || null;
}

export async function createArticle(data: {
  title: string;
  slug: string;
  content: string;
  image?: string;
  published?: boolean;
}) {
  await requireAdmin();
  const result = await db
    .insert(articles)
    .values(data)
    .returning();
  revalidatePath("/admin/actualites");
  return result[0];
}

export async function updateArticle(
  id: number,
  data: {
    title: string;
    slug: string;
    content: string;
    image?: string;
    published?: boolean;
  }
) {
  await requireAdmin();
  const result = await db
    .update(articles)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(articles.id, id))
    .returning();
  revalidatePath("/admin/actualites");
  return result[0];
}

export async function deleteArticle(id: number) {
  await requireAdmin();
  await db.delete(articles).where(eq(articles.id, id));
  revalidatePath("/admin/actualites");
  return { success: true };
}
