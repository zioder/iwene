"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

const projectCategories = [
  { value: "ongoing", label: "Projets en cours" },
  { value: "realized", label: "Projets réalisés" },
  { value: "future", label: "Futurs projets" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl transition-all duration-300 backdrop-blur-md ${
        isMenuOpen
          ? "bg-background rounded-3xl shadow-lg"
          : `${isScrolled ? "bg-background/90 shadow-lg" : "bg-background/40 shadow-sm"} rounded-full`
      }`}
      style={{
        boxShadow: isMenuOpen
          ? "rgba(201, 169, 97, 0.15) 0px 0px 0px 1px, rgba(26, 26, 26, 0.04) 0px 1px 1px -0.5px, rgba(26, 26, 26, 0.04) 0px 3px 3px -1.5px"
          : isScrolled
          ? "rgba(201, 169, 97, 0.15) 0px 0px 0px 1px, rgba(26, 26, 26, 0.04) 0px 1px 1px -0.5px, rgba(26, 26, 26, 0.04) 0px 3px 3px -1.5px"
          : "rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
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
          {isHome ? (
            <a
              href="#a-propos"
              className="text-sm font-medium transition-colors text-foreground/80 hover:text-primary"
            >
              À Propos
            </a>
          ) : (
            <Link
              href="/#a-propos"
              className="text-sm font-medium transition-colors text-foreground/80 hover:text-primary"
            >
              À Propos
            </Link>
          )}
          <div
            className="relative group"
          >
            <Link
              href="/projets"
              className="text-sm font-medium transition-colors text-foreground/80 hover:text-primary flex items-center gap-1"
            >
              Nos projets
              <ChevronDown className="h-3 w-3 transition-transform group-hover:rotate-180" />
            </Link>
            <div className="absolute top-full left-0 pt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <div className="bg-background border border-border rounded-lg shadow-lg py-2">
                {projectCategories.map((cat) => (
                  <Link
                    key={cat.value}
                    href={`/projets?category=${cat.value}`}
                    className="block px-4 py-2 text-sm text-foreground/80 hover:text-primary hover:bg-muted"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
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
              href="/"
              className="text-lg text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            {isHome ? (
              <a
                href="#a-propos"
                className="text-lg text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                À Propos
              </a>
            ) : (
              <Link
                href="/#a-propos"
                className="text-lg text-foreground"
                onClick={() => setIsMenuOpen(false)}
              >
                À Propos
              </Link>
            )}
            <div className="space-y-3">
              <p className="text-lg text-foreground font-medium">Nos projets</p>
              {projectCategories.map((cat) => (
                <Link
                  key={cat.value}
                  href={`/projets?category=${cat.value}`}
                  className="block text-base text-foreground/70 pl-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {cat.label}
                </Link>
              ))}
            </div>
            <Link
              href="/nos-actualites"
              className="text-lg text-foreground"
              onClick={() => setIsMenuOpen(false)}
            >
              Nos actualités
            </Link>
            <Link
              href="/contact"
              className="mt-4 bg-primary px-5 py-3 text-center text-sm font-medium text-background rounded-full"
              onClick={() => setIsMenuOpen(false)}
            >
              CONTACT
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
