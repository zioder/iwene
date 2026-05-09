"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl transition-all duration-300 backdrop-blur-md rounded-full ${isScrolled ? "bg-background/90 shadow-lg" : "bg-background/40 shadow-sm"}`}
      style={{
        boxShadow: isScrolled ? "rgba(201, 169, 97, 0.15) 0px 0px 0px 1px, rgba(26, 26, 26, 0.04) 0px 1px 1px -0.5px, rgba(26, 26, 26, 0.04) 0px 3px 3px -1.5px" : "rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset"
      }}
    >
      <div className="flex items-center justify-between transition-all duration-300 px-4 pl-5 py-3">
        {/* Logo */}
        <Link href="/" className="transition-opacity duration-300 hover:opacity-80">
          <Image
            src="https://iwene.com.tn/wp-content/uploads/2024/04/logo-iwene-finale.png"
            alt="Iwene"
            width={120}
            height={40}
            className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium transition-colors text-foreground/80 hover:text-primary"
          >
            Accueil
          </Link>
          <Link
            href="/a-propos"
            className="text-sm font-medium transition-colors text-foreground/80 hover:text-primary"
          >
            À Propos
          </Link>
          <Link
            href="/projets"
            className="text-sm font-medium transition-colors text-foreground/80 hover:text-primary"
          >
            Nos projets
          </Link>
          <Link
            href="/nos-actualites"
            className="text-sm font-medium transition-colors text-foreground/80 hover:text-primary"
          >
            Nos actualités
          </Link>
        </nav>

        {/* CTA */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/contact"
            className="px-4 py-2 text-sm font-medium transition-all rounded-full bg-primary text-background hover:opacity-90"
          >
            CONTACT
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="transition-colors md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-border bg-background px-6 py-8 md:hidden rounded-b-2xl">
          <nav className="flex flex-col gap-6">
            <Link
              href="/projets"
              className="text-lg text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Projets
            </Link>
            <Link
              href="/galerie"
              className="text-lg text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Galerie
            </Link>
            <Link
              href="/a-propos"
              className="text-lg text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              À propos
            </Link>
            <Link
              href="/temoignages"
              className="text-lg text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Témoignages
            </Link>
            <Link
              href="/#contact"
              className="mt-4 bg-primary px-5 py-3 text-center text-sm font-medium text-background rounded-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Nous contacter
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
