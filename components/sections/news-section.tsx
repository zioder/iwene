"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, HardHat, Rocket, Home, DoorOpen, TrendingUp, Handshake } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  icon: React.ReactNode;
  image: string;
  status: "construction" | "lancement" | "livraison" | "evenement" | "milestone" | "partenariat";
}

const newsData: NewsItem[] = [
  {
    id: 1,
    title: "Résidence Lumière est en cours de construction",
    excerpt:
      "Les travaux avancent à bon rythme avec la finalisation des fondations et le début de l'élévation des structures. Livraison prévue au premier semestre 2026.",
    date: "15 Mars 2026",
    category: "En construction",
    icon: <HardHat className="w-4 h-4" />,
    image: "https://iwene.com.tn/wp-content/uploads/2024/03/Rendu-1-1.webp",
    status: "construction",
  },
  {
    id: 2,
    title: "Résidence Horizon a débuté la construction",
    excerpt:
      "C'est officiel ! Le coup d'envoi des travaux de la Résidence Horizon a été donné. Un projet ambitieux de 120 logements avec vue panoramique sur la mer.",
    date: "2 Mars 2026",
    category: "Nouveau projet",
    icon: <Rocket className="w-4 h-4" />,
    image: "https://iwene.com.tn/wp-content/uploads/2024/03/rendu-3-1.webp",
    status: "lancement",
  },
  {
    id: 3,
    title: "Résidence Élégance a livré ses premiers logements",
    excerpt:
      "Nous sommes fiers d'annoncer la livraison des premières clés aux résidents de la Résidence Élégance. Un nouveau chapitre commence pour ses heureux propriétaires.",
    date: "20 Février 2026",
    category: "Livraison",
    icon: <Home className="w-4 h-4" />,
    image: "https://iwene.com.tn/wp-content/uploads/2024/03/rendu-2-1.webp",
    status: "livraison",
  },
  {
    id: 4,
    title: "Résidence Panorama ouvre ses portes visiteurs",
    excerpt:
      "Venez découvrir nos appartements témoins et espaces communs lors de nos journées portes ouvertes ce week-end. Une occasion unique de projeter votre futur chez vous.",
    date: "10 Février 2026",
    category: "Événement",
    icon: <DoorOpen className="w-4 h-4" />,
    image: "https://iwene.com.tn/wp-content/uploads/2023/10/1504024492_facade.angle01.t.jpg",
    status: "evenement",
  },
  {
    id: 5,
    title: "Résidence Azure atteint son 10ème étage",
    excerpt:
      "Un cap symbolique est franchi avec la coulée de la dalle du 10ème étage. Ce projet phare du centre-ville prend forme jour après jour.",
    date: "28 Janvier 2026",
    category: "Jalon",
    icon: <TrendingUp className="w-4 h-4" />,
    image: "https://iwene.com.tn/wp-content/uploads/2024/03/Rendu-1-1.webp",
    status: "milestone",
  },
  {
    id: 6,
    title: "Partenariat stratégique avec un nouveau promoteur",
    excerpt:
      "Iwene renforce son réseau avec un partenariat majeur visant à développer de nouveaux projets durables et innovants sur le territoire national.",
    date: "15 Janvier 2026",
    category: "Partenariat",
    icon: <Handshake className="w-4 h-4" />,
    image: "https://iwene.com.tn/wp-content/uploads/2024/03/rendu-3-1.webp",
    status: "partenariat",
  },
];

const statusStyles: Record<string, string> = {
  construction: "bg-amber-100 text-amber-800 border-amber-200",
  lancement: "bg-emerald-100 text-emerald-800 border-emerald-200",
  livraison: "bg-sky-100 text-sky-800 border-sky-200",
  evenement: "bg-violet-100 text-violet-800 border-violet-200",
  milestone: "bg-rose-100 text-rose-800 border-rose-200",
  partenariat: "bg-teal-100 text-teal-800 border-teal-200",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function NewsSection() {
  return (
    <section className="w-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {newsData.map((news) => (
          <motion.article
            key={news.id}
            variants={itemVariants}
            className={cn(
              "group relative bg-card rounded-2xl border border-border overflow-hidden shadow-sm",
              "transition-all duration-500 ease-out",
              "hover:shadow-xl hover:-translate-y-2 hover:border-primary/20"
            )}
          >
            {/* Image Container */}
            <div className="relative h-56 overflow-hidden">
              <Image
                src={news.image || "/placeholder.svg"}
                alt={news.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <Badge
                  variant="outline"
                  className={cn(
                    "backdrop-blur-md border font-medium px-3 py-1 text-xs",
                    statusStyles[news.status]
                  )}
                >
                  <span className="mr-1.5">{news.icon}</span>
                  {news.category}
                </Badge>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Calendar className="w-3.5 h-3.5" />
                <time>{news.date}</time>
              </div>

              <h3 className="text-lg font-semibold leading-snug text-card-foreground group-hover:text-primary transition-colors duration-300">
                {news.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                {news.excerpt}
              </p>

              <div className="pt-2 mt-auto">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all duration-300">
                  Lire la suite
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
