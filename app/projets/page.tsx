import { Header } from "@/components/header";
import { FeaturedProductsSection } from "@/components/sections/featured-products-section";
import { TechnologySection } from "@/components/sections/technology-section";
import { FooterSection } from "@/components/sections/footer-section";

export const metadata = {
  title: 'Projets - IWENE',
  description: 'Découvrez nos projets de résidences premium en Tunisie.',
};

export default function Projects() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8">Nos Projets</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Explorez notre collection de résidences premium conçues avec excellence et attention aux détails.
        </p>
      </div>
      <FeaturedProductsSection />
      <TechnologySection />
      <FooterSection />
    </main>
  );
}
