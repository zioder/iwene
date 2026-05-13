"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, HardHat, Rocket, Home, DoorOpen, TrendingUp, Handshake } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface NewsItem {
  id: number;
  title: string;
  slug: string;
  content: string;
  createdAt: Date;
  image: string | null;
  published: boolean;
}

const statusStyles: Record<string, string> = {
  construction: "bg-amber-100 text-amber-800 border-amber-200",
  lancement: "bg-emerald-100 text-emerald-800 border-emerald-200",
  livraison: "bg-sky-100 text-sky-800 border-sky-200",
  evenement: "bg-violet-100 text-violet-800 border-violet-200",
  milestone: "bg-rose-100 text-rose-800 border-rose-200",
  partenariat: "bg-teal-100 text-teal-800 border-teal-200",
};

const categoryIcons: Record<string, React.ReactNode> = {
  construction: <HardHat className="w-4 h-4" />,
  lancement: <Rocket className="w-4 h-4" />,
  livraison: <Home className="w-4 h-4" />,
  evenement: <DoorOpen className="w-4 h-4" />,
  milestone: <TrendingUp className="w-4 h-4" />,
  partenariat: <Handshake className="w-4 h-4" />,
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
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

function getCategory(article: NewsItem) {
  const content = article.content.toLowerCase();
  if (content.includes("construction") || content.includes("travaux")) return "construction";
  if (content.includes("lancement") || content.includes("nouveau") || content.includes("coup d'en")) return "lancement";
  if (content.includes("livraison") || content.includes("livr")) return "livraison";
  if (content.includes("porte") || content.includes("événement") || content.includes("evenement")) return "evenement";
  if (content.includes("étage") || content.includes("jalon") || content.includes("cap")) return "milestone";
  if (content.includes("partenariat")) return "partenariat";
  return "milestone";
}

function getExcerpt(content: string, maxLength = 150) {
  if (content.length <= maxLength) return content;
  return content.substring(0, maxLength).trim() + "...";
}

export function NewsSection({ articles }: { articles: NewsItem[] }) {
  return (
    <section className="w-full">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {articles.map((article) => {
          const category = getCategory(article);
          return (
            <motion.article
              key={article.id}
              variants={itemVariants}
              className={cn(
                "group relative bg-card rounded-2xl border border-border overflow-hidden shadow-sm",
                "transition-all duration-500 ease-out",
                "hover:shadow-xl hover:-translate-y-2 hover:border-primary/20"
              )}
            >
              <Link href={`/nos-actualites/${article.slug}`} className="block">
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  
                  <div className="absolute top-4 left-4">
                    <Badge
                      variant="outline"
                      className={cn(
                        "backdrop-blur-md border font-medium px-3 py-1 text-xs",
                        statusStyles[category]
                      )}
                    >
                      <span className="mr-1.5">{categoryIcons[category]}</span>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Badge>
                  </div>
                </div>

                <div className="p-6 flex flex-col gap-4">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm">
                    <Calendar className="w-3.5 h-3.5" />
                    <time>{new Date(article.createdAt).toLocaleDateString("fr-FR")}</time>
                  </div>

                  <h3 className="text-lg font-semibold leading-snug text-card-foreground group-hover:text-primary transition-colors duration-300">
                    {article.title}
                  </h3>

                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
                    {getExcerpt(article.content)}
                  </p>

                  <div className="pt-2 mt-auto">
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all duration-300">
                      Lire la suite
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </Link>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
}
