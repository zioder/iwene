"use client";

import Link from "next/link";
import { FadeImage } from "@/components/fade-image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

interface Project {
  id: number;
  slug: string;
  name: string;
  location: string;
  image: string;
  category: string;
}

export function CollectionSection({
  projects,
  categories,
  currentCategory,
}: {
  projects: Project[];
  categories: Record<string, string>;
  currentCategory?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleCategoryChange(value: string) {
    const params = new URLSearchParams(searchParams);
    if (value === "all") {
      params.delete("category");
    } else {
      params.set("category", value);
    }
    router.push(`/projets?${params.toString()}`);
  }

  return (
    <section id="accessories" className="bg-background">
      <div className="px-6 py-20 md:px-12 lg:px-20 md:py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
            Nos Projets
          </h2>
          <Select value={currentCategory || "all"} onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Tous les projets" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les projets</SelectItem>
              {Object.entries(categories).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="pb-24">
        {projects.length === 0 ? (
          <div className="px-6 md:px-12 lg:px-20 text-center py-12">
            <p className="text-muted-foreground">Aucun projet dans cette catégorie.</p>
          </div>
        ) : (
          <>
            <div className="flex gap-6 overflow-x-auto px-6 pb-4 md:hidden snap-x snap-mandatory scrollbar-hide">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projets/${project.slug}`}
                  className="group flex-shrink-0 w-[75vw] snap-center"
                >
                  <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                    <FadeImage
                      src={project.image || "/placeholder.svg"}
                      alt={project.name}
                      fill
                      className="object-cover group-hover:scale-105"
                    />
                  </div>

                  <div className="py-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium leading-snug text-foreground">
                          {project.name}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {project.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="hidden md:grid md:grid-cols-3 gap-8 md:px-12 lg:px-20">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  href={`/projets/${project.slug}`}
                  className="group"
                >
                  <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                    <FadeImage
                      src={project.image || "/placeholder.svg"}
                      alt={project.name}
                      fill
                      className="object-cover group-hover:scale-105"
                    />
                  </div>

                  <div className="py-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium leading-snug text-foreground">
                          {project.name}
                        </h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {project.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
