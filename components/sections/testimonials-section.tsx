"use client";

import Image from "next/image";

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-background">
      {/* About Image with Text Overlay */}
      <div className="relative aspect-[16/9] w-full">
        <Image
          src="https://iwene.com.tn/wp-content/uploads/2024/03/rendu-3-1.webp"
          alt="Iwene luxury residences showcase"
          fill
          className="object-cover"
        />
        {/* Fade gradient overlay - dark at bottom fading to transparent at top */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

        {/* Text Overlay */}
        <div className="absolute inset-0 flex items-end justify-center px-6 pb-16 md:px-12 md:pb-24 lg:px-20 lg:pb-32">
          <p className="mx-auto max-w-5xl text-2xl leading-relaxed text-white md:text-3xl lg:text-[2.5rem] lg:leading-snug text-center">
            Les résidences Iwene représentent l&apos;apogée du luxe en Tunisie —
            conçues pour les clients exigeants qui demandent l&apos;excellence dans chaque détail.
          </p>
        </div>
      </div>
    </section>
  );
}
