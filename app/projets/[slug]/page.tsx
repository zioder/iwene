import { notFound } from "next/navigation";
import Image from "next/image";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { UnitAvailability } from "@/components/unit-availability";
import { projects, getProjectBySlug, getProjectStats } from "@/lib/project-data";
import { MapPin, Building2, Calendar, Check } from "lucide-react";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Projet non trouvé" };
  return {
    title: `${project.name} - IWENE`,
    description: project.description,
  };
}

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const stats = getProjectStats(project);

  return (
    <main className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>

        <div className="relative z-10 px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground tracking-tight">
              {project.name}
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground leading-relaxed">
              {project.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm">
                <MapPin className="w-4 h-4" />
                {project.location}
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-full text-sm">
                <Building2 className="w-4 h-4" />
                {project.totalUnits} appartements
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-medium">
                <Calendar className="w-4 h-4" />
                {stats.available} disponibles
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Image */}
      <section className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto -mt-4 mb-16">
        <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-border shadow-xl">
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            priority
          />
        </div>
      </section>

      {/* Features */}
      <section className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto mb-20">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
              Caractéristiques
            </h2>
            <ul className="space-y-3">
              {project.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-muted-foreground"
                >
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-6">
              Disponibilité des unités
            </h2>
            <div className="bg-card border border-border rounded-2xl p-6 md:p-8">
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                    {stats.available}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Disponibles
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600 dark:text-red-400">
                    {stats.sold}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Vendus
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                    {stats.reserved}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Réservés
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 bg-muted rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-emerald-500 transition-all duration-1000"
                  style={{
                    width: `${(stats.available / stats.total) * 100}%`,
                  }}
                />
                <div
                  className="h-full bg-red-500 transition-all duration-1000"
                  style={{ width: `${(stats.sold / stats.total) * 100}%` }}
                />
                <div
                  className="h-full bg-amber-500 transition-all duration-1000"
                  style={{
                    width: `${(stats.reserved / stats.total) * 100}%`,
                  }}
                />
              </div>
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>0%</span>
                <span>100% ({stats.total} unités)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unit Availability Interactive Section */}
      <section className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto mb-24">
        <UnitAvailability project={project} />
      </section>

      <FooterSection />
    </main>
  );
}
