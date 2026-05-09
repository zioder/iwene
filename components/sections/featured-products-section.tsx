"use client";

import { FadeImage } from "@/components/fade-image";

const features = [
  {
    image: "https://iwene.com.tn/wp-content/uploads/2024/03/Rendu-1-1.webp",
    span: "col-span-2 row-span-2", // Large
  },
  {
    image: "https://iwene.com.tn/wp-content/uploads/2024/03/rendu-3-1.webp",
    span: "col-span-1 row-span-1", // Small
  },
  {
    image: "https://iwene.com.tn/wp-content/uploads/2024/03/rendu-2-1.webp",
    span: "col-span-1 row-span-1", // Small
  },
  {
    image: "https://iwene.com.tn/wp-content/uploads/2024/03/rendu-2.webp",
    span: "col-span-1 row-span-2", // Tall
  },
  {
    image: "https://iwene.com.tn/wp-content/uploads/2019/11/RESIDENCE-DIAR-IWEN-2-1.jpg",
    span: "col-span-1 row-span-1", // Small
  },
  {
    image: "https://iwene.com.tn/wp-content/uploads/2024/03/Rendu-1.webp",
    span: "col-span-2 row-span-1", // Wide
  },
  {
    image: "https://iwene.com.tn/wp-content/uploads/2023/10/1504024492_facade.angle01.t.jpg",
    span: "col-span-1 row-span-1", // Small
  },
  {
    image: "https://iwene.com.tn/wp-content/uploads/2019/11/RESIDENCE-DIAR-IWEN-1-1.jpg",
    span: "col-span-1 row-span-2", // Tall
  },
  {
    image: "https://iwene.com.tn/wp-content/uploads/2024/03/Rendu-3.webp",
    span: "col-span-2 row-span-1", // Wide
  },
  {
    image: "https://iwene.com.tn/wp-content/uploads/2023/10/chambre.t.jpg",
    span: "col-span-1 row-span-1", // Small
  },
];

export function FeaturedProductsSection() {
  return (
    <section id="projects" className="relative bg-background py-20 md:py-32">
      <div className="px-4 md:px-12 lg:px-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-foreground">Projets Phares</h2>
        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-7xl mx-auto auto-rows-[180px] md:auto-rows-[220px]">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`relative overflow-hidden rounded-lg border border-primary/20 hover:border-primary transition-colors ${feature.span}`}
            >
              <FadeImage
                src={feature.image || "/placeholder.svg"}
                alt={`Iwene residence ${index + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
