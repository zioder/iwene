import { Header } from "@/components/header";
import { PhilosophySection } from "@/components/sections/philosophy-section";
import { TechnologySection } from "@/components/sections/technology-section";
import { EditorialSection } from "@/components/sections/editorial-section";
import { FooterSection } from "@/components/sections/footer-section";

export const metadata = {
  title: 'À Propos - IWENE',
  description: 'Découvrez la vision et les valeurs de IWENE.',
};

export default function About() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8">À Propos de IWENE</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Découvrez notre engagement envers l'excellence et la création de résidences premium en Tunisie.
        </p>
      </div>
      <PhilosophySection />
      <TechnologySection />
      <EditorialSection />
      <FooterSection />
    </main>
  );
}
