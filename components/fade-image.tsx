"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";

interface FadeImageProps extends Omit<ImageProps, "onLoad"> {
  fadeDelay?: number;
}

export function FadeImage({ className, fadeDelay = 0, ...props }: FadeImageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, fadeDelay);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [fadeDelay]);

  return (
    <div ref={ref} className="relative h-full w-full overflow-hidden">
      <Image
        {...props}
        className={`${className || ""} transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isVisible && isLoaded
            ? "opacity-100 scale-100 [filter:blur(0px)]"
            : "opacity-0 scale-[1.08] [filter:blur(12px)]"
        }`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
