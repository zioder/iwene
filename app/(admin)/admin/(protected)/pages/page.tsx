import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, ExternalLink } from "lucide-react";

const pages = [
  {
    title: "Page d&apos;accueil",
    description: "Modifier le contenu de la page principale",
    href: "/",
  },
  {
    title: "À propos",
    description: "Modifier la page À propos",
    href: "/a-propos",
  },
  {
    title: "Contact",
    description: "Modifier la page Contact",
    href: "/contact",
  },
  {
    title: "Projets",
    description: "Modifier la page Projets",
    href: "/projets",
  },
  {
    title: "Nos Actualités",
    description: "Modifier la page Nos Actualités",
    href: "/nos-actualites",
  },
];

export default function PagesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Pages</h1>
        <p className="text-muted-foreground mt-1">
          Gérez le contenu de vos pages
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {pages.map((page) => (
          <Card key={page.title}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                <CardTitle>{page.title}</CardTitle>
              </div>
              <CardDescription>{page.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Link href={page.href} target="_blank">
                  <Button variant="outline" size="sm">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Voir la page
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-yellow-800">
          <strong>Note :</strong> Le contenu des pages statiques (À propos, Contact) est géré directement dans les fichiers du projet.
          Utilisez les sections <strong>Projets</strong> et <strong>Nos Actualités</strong> pour gérer le contenu dynamique.
        </p>
      </div>
    </div>
  );
}
