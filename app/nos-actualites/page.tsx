import { Header } from "@/components/header";
import { NewsSection } from "@/components/sections/news-section";
import { FooterSection } from "@/components/sections/footer-section";
import { db } from "@/lib/db";
import { articles } from "@/lib/db/schema";
import { eq, desc } from "drizzle-orm";

export const metadata = {
  title: 'Nos actualités - IWENE',
  description: "Découvrez les dernières actualités d'Iwene.",
};

export default async function Actualites() {
  const articleList = await db
    .select()
    .from(articles)
    .where(eq(articles.published, true))
    .orderBy(desc(articles.createdAt));

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="pt-32 pb-20 px-6 md:px-12 lg:px-20 flex-1">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8">Nos actualités</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mb-16">
          Restez informé sur nos dernières nouveautés, chantiers en cours et événements à ne pas manquer.
        </p>
        <NewsSection articles={articleList} />
      </div>
      <FooterSection />
    </main>
  );
}
