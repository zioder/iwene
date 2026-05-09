import { Header } from "@/components/header";
import { NewsSection } from "@/components/sections/news-section";
import { FooterSection } from "@/components/sections/footer-section";

export const metadata = {
  title: 'Nos actualités - IWENE',
  description: "Découvrez les dernières actualités d'Iwene.",
};

export default function Actualites() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="pt-32 pb-20 px-6 md:px-12 lg:px-20 flex-1">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8">Nos actualités</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mb-16">
          Restez informé sur nos dernières nouveautés, chantiers en cours et événements à ne pas manquer.
        </p>
        <NewsSection />
      </div>
      <FooterSection />
    </main>
  );
}
