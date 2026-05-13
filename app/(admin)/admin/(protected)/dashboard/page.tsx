import { db } from "@/lib/db";
import { projects, units, articles } from "@/lib/db/schema";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Building, Newspaper, FileText } from "lucide-react";

export default async function DashboardPage() {
  const [projectCount, unitCount, articleCount] = await Promise.all([
    db.$count(projects),
    db.$count(units),
    db.$count(articles),
  ]);

  const projectStats = await db
    .select({
      id: projects.id,
      name: projects.name,
      slug: projects.slug,
      totalUnits: projects.totalUnits,
    })
    .from(projects);

  const soldUnits = await db
    .select({ count: units.id })
    .from(units)
    .where(units.status === "sold");

  const availableUnits = await db
    .select({ count: units.id })
    .from(units)
    .where(units.status === "available");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Bienvenue dans le panneau d&apos;administration
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Projets</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectCount}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unités vendues
            </CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{soldUnits.length}</div>
            <p className="text-xs text-muted-foreground">
              sur {unitCount} unités
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Unités disponibles
            </CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableUnits.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Articles</CardTitle>
            <Newspaper className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{articleCount}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Projets</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {projectStats.map((project) => (
                <li key={project.id}>
                  <Link
                    href={`/admin/projets/${project.id}`}
                    className="text-sm hover:underline"
                  >
                    {project.name}
                  </Link>
                  <span className="text-xs text-muted-foreground ml-2">
                    ({project.totalUnits} unités)
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link
              href="/admin/projets"
              className="block text-sm hover:underline"
            >
              Gérer les projets →
            </Link>
            <Link
              href="/admin/actualites"
              className="block text-sm hover:underline"
            >
              Gérer les actualités →
            </Link>
            <Link href="/admin/pages" className="block text-sm hover:underline">
              Modifier les pages →
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
