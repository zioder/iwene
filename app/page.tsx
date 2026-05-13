import { Header } from "@/components/header";
import { HeroSection } from "@/components/sections/hero-section";
import { PhilosophySection } from "@/components/sections/philosophy-section";
import { TechnologySection } from "@/components/sections/technology-section";
import { CollectionSection } from "@/components/sections/collection-section";
import { GallerySection } from "@/components/sections/gallery-section";
import { FeaturedProductsSection } from "@/components/sections/featured-products-section";
import { EditorialSection } from "@/components/sections/editorial-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FooterSection } from "@/components/sections/footer-section";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";
import { Suspense } from "react";

export default async function Home() {
  const categoryLabels: Record<string, string> = {
    ongoing: "Projets en cours",
    realized: "Projets réalisés",
    future: "Futurs projets",
  };

  const projectList = await db
    .select({
      id: projects.id,
      slug: projects.slug,
      name: projects.name,
      location: projects.location,
      image: projects.image,
      category: projects.category,
    })
    .from(projects);

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <PhilosophySection />
      <FeaturedProductsSection />
      <TechnologySection />
      <Suspense fallback={<div className="px-6 md:px-12 lg:px-20 py-12">Chargement...</div>}>
        <CollectionSection projects={projectList} categories={categoryLabels} />
      </Suspense>
      <TestimonialsSection />
      <FooterSection />
    </main>
  );
}
