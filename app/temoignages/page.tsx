import { Header } from "@/components/header";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CollectionSection } from "@/components/sections/collection-section";
import { FooterSection } from "@/components/sections/footer-section";

export const metadata = {
  title: 'Témoignages - IWENE',
  description: 'Découvrez les témoignages de nos clients satisfaits.',
};

export default function Testimonials() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-20 px-6 md:px-12 lg:px-20">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8">Témoignages</h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          Écoutez ce que nos clients disent de leurs expériences avec IWENE et nos résidences premium.
        </p>
      </div>
      <TestimonialsSection />
      <CollectionSection />
      <FooterSection />
    </main>
  );
}
