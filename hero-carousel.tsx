import { useEffect, useState } from "react";
import slideHand from "@/assets/slide-hand.jpg.asset.json";
import slideOpen from "@/assets/slide-open.jpg.asset.json";
import slidePour from "@/assets/slide-pour.jpg.asset.json";

const SLIDES = [
  { src: slideHand.url, alt: "Pot FilaBio tenu en main" },
  { src: slideOpen.url, alt: "Pot FilaBio ouvert avec gélules et verre d'eau" },
  { src: slidePour.url, alt: "Gélules FilaBio versées dans la main" },
];

const DURATION = 4000;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), DURATION);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0">
      {SLIDES.map((s, i) => (
        <img
          key={s.src}
          src={s.src}
          alt={s.alt}
          className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute bottom-5 end-6 z-10 flex gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            type="button"
            aria-label={`Photo ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all ${
              i === index ? "w-6 bg-primary" : "w-2 bg-primary/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
