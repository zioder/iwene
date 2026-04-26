import { Header } from "@/components/header";
import { GallerySection } from "@/components/sections/gallery-section";
import { FooterSection } from "@/components/sections/footer-section";

export const metadata = {
  title: 'Galerie - IWENE',
  description: 'Découvrez la galerie de photos de nos résidences premium.',
};

export default function Gallery() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8">Galerie</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Explorez nos résidences sous tous les angles. Des images détaillées de chaque projet pour vous inspirer.
        </p>
      </div>
      <GallerySection />
      <FooterSection />
    </main>
  );
}
