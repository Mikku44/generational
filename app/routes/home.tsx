import Logo from "~/components/logo";
import type { Route } from "./+types/home";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Classic Cars Thailand | Curated Collector Automobiles — GENERATIONAL" },
    {
      name: "description",
      content:
        "GENERATIONAL curates the most beautiful, culturally significant classic cars in Thailand — global sourcing, provenance verification, import and preservation.",
    },
    { tagName: "link", rel: "canonical", href: "https://www.generational.co/" },

    // — Open Graph (Facebook / LinkedIn / Line, etc.)
    { property: "og:title", content: "Classic Cars Thailand | Curated Collector Automobiles — GENERATIONAL" },
    {
      property: "og:description",
      content:
        "Source of the most beautiful, culturally significant classic automobiles in Thailand.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://www.generational.co/" },
    {
      property: "og:image",
      content: "https://www.generational.co/images/og.jpg",
    },
    { property: "og:image:alt", content: "Curated classic automobiles by GENERATIONAL Thailand" },
    { property: "og:site_name", content: "GENERATIONAL" },
    { property: "og:locale", content: "en_US" },

    // — Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "Classic Cars Thailand | Curated Collector Automobiles — GENERATIONAL" },
    {
      name: "twitter:description",
      content:
        "Source of the most beautiful, culturally significant classic automobiles in Thailand.",
    },
    {
      name: "twitter:image",
      content: "https://www.generational.co/images/og.jpg",
    },
    { name: "twitter:image:alt", content: "Curated classic automobiles by GENERATIONAL Thailand" },
    { name: "robots", content: "index, follow" },
  ];
}

// https://www.generational.co/images/Lamborghini_Countach_md.jpg

export default function Home() {
  return (
    <main className="h-screen w-full overflow-hidden">
      <div className="relative h-full">
        <div className="absolute z-10 w-full md:p-10 p-5">
          <Logo className="invert" />
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <video
            src="/videos/generational.webm"
            poster="/images/og.jpg"
            autoPlay
            loop
            muted
            webkit-playsinline="true"
            playsInline
            preload="auto"
            title="GENERATIONAL curated classic cars in Thailand — showroom film"
            aria-label="Showreel of culturally significant classic automobiles curated by GENERATIONAL Thailand"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>

      <p className="sr-only">
        GENERATIONAL is a Bangkok-based source of culturally significant classic
        automobiles, offering global sourcing, provenance verification, import,
        registration and preservation in Thailand.
      </p>
    </main>
  );
}

