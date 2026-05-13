import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";
import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Calendar, ArrowLeft, Clock, HardHat, Rocket, Home, DoorOpen, TrendingUp, Handshake } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
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
  construction: <HardHat className="w-3.5 h-3.5" />,
  lancement: <Rocket className="w-3.5 h-3.5" />,
  livraison: <Home className="w-3.5 h-3.5" />,
  evenement: <DoorOpen className="w-3.5 h-3.5" />,
  milestone: <TrendingUp className="w-3.5 h-3.5" />,
  partenariat: <Handshake className="w-3.5 h-3.5" />,
};

function getCategory(content: string) {
  const lower = content.toLowerCase();
  if (lower.includes("construction") || lower.includes("travaux")) return "construction";
  if (lower.includes("lancement") || lower.includes("nouveau") || lower.includes("coup d'en")) return "lancement";
  if (lower.includes("livraison") || lower.includes("livr")) return "livraison";
  if (lower.includes("porte") || lower.includes("événement") || lower.includes("evenement")) return "evenement";
  if (lower.includes("étage") || lower.includes("jalon") || lower.includes("cap")) return "milestone";
  if (lower.includes("partenariat")) return "partenariat";
  return "milestone";
}

function formatDate(date: Date) {
  return new Date(date).toLocaleDateString("fr-FR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getReadingTime(content: string) {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return minutes;
}

function formatContent(content: string) {
  return content.split("\n").filter((p) => p.trim());
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const articleList = await db
    .select()
    .from(articles)
    .where(eq(articles.slug, slug))
    .limit(1);
  const article = articleList[0];
  if (!article) return { title: "Article non trouvé" };
  return {
    title: `${article.title} - IWENE`,
    description: article.content.substring(0, 160),
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const articleList = await db
    .select()
    .from(articles)
    .where(eq(articles.slug, slug))
    .limit(1);
  const article = articleList[0];

  if (!article) {
    notFound();
  }

  const category = getCategory(article.content);
  const readingTime = getReadingTime(article.content);
  const paragraphs = formatContent(article.content);

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {article.image && (
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover opacity-20"
              priority
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>

        <div className="relative z-10 px-6 md:px-12 lg:px-20 max-w-4xl mx-auto">
          <Link
            href="/nos-actualites"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Retour aux actualités</span>
          </Link>

          <Badge
            variant="outline"
            className={cn(
              "backdrop-blur-md border font-medium px-3 py-1 text-xs mb-6",
              statusStyles[category]
            )}
          >
            <span className="mr-1.5">{categoryIcons[category]}</span>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Badge>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-6 text-muted-foreground">
            <div className="inline-flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time className="text-sm capitalize">{formatDate(article.createdAt!)}</time>
            </div>
            <div className="inline-flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{readingTime} min de lecture</span>
            </div>
          </div>
        </div>
      </section>

      {article.image && (
        <section className="px-6 md:px-12 lg:px-20 max-w-4xl mx-auto -mt-4 mb-16">
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden border border-border shadow-xl">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              priority
            />
          </div>
        </section>
      )}

      <section className="px-6 md:px-12 lg:px-20 max-w-4xl mx-auto mb-24">
        <div className="prose prose-lg max-w-none">
          <div className="border-l-4 border-primary pl-6 py-2 mb-12">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-normal italic">
              {paragraphs[0]}
            </p>
          </div>

          <div className="space-y-6">
            {paragraphs.slice(1).map((paragraph, index) => (
              <p
                key={index}
                className="text-lg text-foreground/80 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border">
          <Link
            href="/nos-actualites"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Voir toutes les actualités
          </Link>
        </div>
      </section>

      <FooterSection />
    </main>
  );
}
