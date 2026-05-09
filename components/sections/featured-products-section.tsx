"use client";

import { motion } from "framer-motion";
import { FadeImage } from "@/components/fade-image";

const features = [
  {
    image: "/images/bento/1.png",
    span: "col-span-2 row-span-1",
    sizes: "(max-width: 768px) 100vw, 50vw",
  },
  {
    image: "/images/bento/2.png",
    span: "col-span-2 row-span-1",
    sizes: "(max-width: 768px) 100vw, 50vw",
  },
  {
    image: "/images/bento/3.png",
    span: "col-span-1 row-span-1",
    sizes: "(max-width: 768px) 50vw, 25vw",
  },
  {
    image: "/images/bento/4.png",
    span: "col-span-2 row-span-1",
    sizes: "(max-width: 768px) 100vw, 50vw",
  },
  {
    image: "/images/bento/5.png",
    span: "col-span-1 row-span-2",
    sizes: "(max-width: 768px) 50vw, 25vw",
  },
  {
    image: "/images/bento/6.png",
    span: "col-span-2 row-span-1",
    sizes: "(max-width: 768px) 100vw, 50vw",
  },
  {
    image: "/images/bento/7.png",
    span: "col-span-1 row-span-2",
    sizes: "(max-width: 768px) 50vw, 25vw",
  },
  {
    image: "/images/bento/9.png",
    span: "col-span-2 row-span-1",
    sizes: "(max-width: 768px) 100vw, 50vw",
  },
  {
    image: "/images/bento/1.png",
    span: "col-span-1 row-span-1",
    sizes: "(max-width: 768px) 50vw, 25vw",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 1, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function FeaturedProductsSection() {
  return (
    <section id="projects" className="relative bg-background py-20 md:py-32">
      <div className="px-4 md:px-12 lg:px-20">
        <motion.div
          className="@container grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 w-full max-w-7xl mx-auto grid-flow-dense auto-rows-[calc(50cqi-0.375rem)] md:auto-rows-[calc(25cqi-0.75rem)]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`group relative overflow-hidden rounded-lg border border-primary/20 hover:border-primary transition-colors will-change-transform ${feature.span}`}
            >
              <FadeImage
                src={feature.image || "/placeholder.svg"}
                alt={`Iwene residence ${index + 1}`}
                fill
                sizes={feature.sizes}
                fadeDelay={index * 100}
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
