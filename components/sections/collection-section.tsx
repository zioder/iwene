"use client";

import Link from "next/link";
import { FadeImage } from "@/components/fade-image";

const accessories = [
  {
    id: 1,
    name: "RÉSIDENCE DIAR IWEN",
    description: "Projet Résidentiel",
    image: "https://iwene.com.tn/wp-content/uploads/2019/11/RESIDENCE-DIAR-IWEN-2-1.jpg",
    slug: "residence-diar-iwen",
  },
  {
    id: 2,
    name: "RÉSIDENCE IWEN",
    description: "Projet Résidentiel",
    image: "https://iwene.com.tn/wp-content/uploads/2024/03/rendu-3-1.webp",
    slug: "residence-iwene",
  },
  {
    id: 3,
    name: "RÉSIDENCE HORIZON",
    description: "Sfax El Jadida",
    image: "https://iwene.com.tn/wp-content/uploads/2019/11/RESIDENCE-HORIZON-1.jpg.png",
    slug: "residence-horizon",
  },
];

export function CollectionSection() {
  return (
    <section id="accessories" className="bg-background">
      {/* Section Title */}
      <div className="px-6 py-20 md:px-12 lg:px-20 md:py-10">
        <h2 className="text-3xl font-medium tracking-tight text-foreground md:text-4xl">
          Nos Projets
        </h2>
      </div>

      {/* Accessories Grid/Carousel */}
      <div className="pb-24">
        {/* Mobile: Horizontal Carousel */}
        <div className="flex gap-6 overflow-x-auto px-6 pb-4 md:hidden snap-x snap-mandatory scrollbar-hide">
          {accessories.map((accessory) => (
            <Link
              key={accessory.id}
              href={`/projets/${accessory.slug}`}
              className="group flex-shrink-0 w-[75vw] snap-center"
            >
              {/* Image */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                <FadeImage
                  src={accessory.image || "/placeholder.svg"}
                  alt={accessory.name}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-snug text-foreground">
                      {accessory.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {accessory.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 md:px-12 lg:px-20">
          {accessories.map((accessory) => (
            <Link
              key={accessory.id}
              href={`/projets/${accessory.slug}`}
              className="group"
            >
              {/* Image */}
              <div className="relative aspect-[2/3] overflow-hidden rounded-2xl bg-secondary">
                <FadeImage
                  src={accessory.image || "/placeholder.svg"}
                  alt={accessory.name}
                  fill
                  className="object-cover group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="py-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium leading-snug text-foreground">
                      {accessory.name}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {accessory.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
