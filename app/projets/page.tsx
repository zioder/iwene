import { Header } from "@/components/header";
import { CollectionSection } from "@/components/sections/collection-section";
import { FooterSection } from "@/components/sections/footer-section";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { Suspense } from "react";

export const metadata = {
  title: 'Nos Projets - IWENE',
  description: 'Découvrez nos projets de résidences premium en Tunisie.',
};

const categoryLabels: Record<string, string> = {
  ongoing: "Projets en cours",
  realized: "Projets réalisés",
  future: "Futurs projets",
};

export default async function Projects({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  let projectList = await db
    .select({
      id: projects.id,
      slug: projects.slug,
      name: projects.name,
      location: projects.location,
      image: projects.image,
      category: projects.category,
    })
    .from(projects);

  if (category && categoryLabels[category]) {
    projectList = projectList.filter((p) => p.category === category);
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8">Nos Projets</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Explorez notre collection de résidences premium conçues avec excellence et attention aux détails.
        </p>
      </div>
      <Suspense fallback={<div className="px-6 md:px-12 lg:px-20 py-12">Chargement...</div>}>
        <CollectionSection projects={projectList} categories={categoryLabels} currentCategory={category} />
      </Suspense>
      <FooterSection />
    </main>
  );
}
