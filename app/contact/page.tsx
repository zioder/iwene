import { Header } from "@/components/header";
import { FooterSection } from "@/components/sections/footer-section";

export const metadata = {
  title: 'Contact - IWENE',
  description: 'Contacter Iwene immobilière.',
};

export default function Contact() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="pt-32 pb-20 px-6 md:px-12 lg:px-20 flex-1">
        <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-8">Contactez-nous</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mb-8">
          N'hésitez pas à nous contacter pour toutes vos demandes de renseignements.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12 text-lg">
          <div>
            <h3 className="font-semibold text-2xl mb-4">Par Téléphone</h3>
            <p className="mb-2">Tél: +216 74 405 620</p>
            <p>Fax: +216 74 406 620</p>
          </div>
          <div>
            <h3 className="font-semibold text-2xl mb-4">Sur Place / En ligne</h3>
            <p className="mb-2">Adresse: Rue Ennasria Immeuble El Borj, 7eme Etage Sfax El Jadida Sfax</p>
            <p>Email: contact@iwene.com.tn</p>
          </div>
        </div>
      </div>
      <FooterSection />
    </main>
  );
}
