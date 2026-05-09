"use client";

import Link from "next/link";

const footerLinks = {
  menu: [
    { label: "Accueil", href: "/" },
    { label: "À PROPOS", href: "/a-propos" },
    { label: "Nos projets", href: "/projets" },
    { label: "Nos actualités", href: "/nos-actualites" },
    { label: "CONTACT", href: "/contact" },
  ],
  projects: [
    { label: "Projets en cours", href: "/projets" },
    { label: "Projets réalisés", href: "/projets" },
    { label: "Futurs projets", href: "/projets" },
  ],
  contact: [
    { label: "Rue Ennasria Immeuble El Borj, 7eme Etage Sfax El Jadida Sfax,", href: "#", icon: "📍" },
    { label: "+216 74 405 620", href: "tel:+21674405620", icon: "📞" },
    { label: "+216 74 406 620", href: "tel:+21674406620", icon: "📠" },
    { label: "contact@iwene.com.tn", href: "mailto:contact@iwene.com.tn", icon: "✉️" },
  ],
};

export function FooterSection() {
  return (
    <footer className="bg-background">
      {/* Main Footer Content */}
      <div className="border-t border-border px-6 py-16 md:px-12 md:py-20 lg:px-20">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <Link href="/" className="text-lg font-medium text-primary">
              Iwene immobilière
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              La société Iwene est une société tunisienne de promotion immobilière agrée par le ministère de l’équipement et de l’habitat constituée en 2005.<br/><br/>
              Elle fait partie d’un groupe de sociétés fondé par les Cousins MOALLA.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">Menu</h4>
            <ul className="space-y-3">
              {footerLinks.menu.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="mb-4 text-sm font-medium text-foreground">Nos projets</h4>
            <ul className="space-y-3">
              {footerLinks.projects.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service */}
          <div className="col-span-2 md:col-span-1 lg:col-span-1">
            <h4 className="mb-4 text-sm font-medium text-foreground">Contact</h4>
            <ul className="space-y-3">
              {footerLinks.contact.map((link) => (
                <li key={link.label} className="flex gap-2">
                  <span className="text-muted-foreground">{link.icon}</span>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border px-6 py-6 md:px-12 lg:px-20">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-xs text-muted-foreground">
            Copyright © <a href="https://expert-dev-solutions.com/" className="text-primary hover:underline">Expert Dev Solutions</a> | All rights reserved.
          </p>

          

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Instagram
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Twitter
            </Link>
            <Link
              href="#"
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              YouTube
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
