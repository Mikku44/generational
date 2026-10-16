import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Logo from "~/components/logo";
import type { Route } from "./+types/home";
import AutoFadeImage from "~/components/AutoFadeImage";


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
        "Purveyor of the most beautiful, culturally significant classic automobiles in Thailand.",
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
        "Purveyor of the most beautiful, culturally significant classic automobiles in Thailand.",
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Transform scroll progress to horizontal translation
  const x = useTransform(
    scrollYProgress,
    [0, 1],
    [isMobile ? "0%" : "0%", isMobile ? "-68%" : "-67.2%"]
  );

  const INTERVAL = 10000; // 10 seconds


  return (
    <div ref={containerRef} className="h-screen relative">

      <div className="fixed z-10 w-full">
        <div className="md:p-10 p-5  flex h-screen justify-between flex-col">
          <Logo className="invert" />
        </div>
      </div>
      <main className="min-h-screen w-full ">
        {/* image container */}
        {/* <div className="w-full h-screen lg:block hidden ">
          <AutoFadeImage
            // className="h-[100%]"
            images={["/images/Lamborghini_Countach_md.jpg",
              "/images/RRA_8482.jpg",
              "/images/Ferr_512_RRA42.jpg",
              "/images/930 Turbo.jpg",

            ]} interval={INTERVAL} />

        </div>
        <div className="w-full h-screen lg:hidden block ">
          <AutoFadeImage
            // className="h-[100%]"
            images={["/images/Lamborghini_Countach.jpg",
              "/images/RRA_8482.jpg",
              "/images/Ferr_512_RRA42.jpg",
              "/images/930 Turbo.jpg",

            ]} interval={INTERVAL} />

        </div> */}
        {/* <div className="w-full h-screen ">
          <AutoFadeImage
            // className="h-[100%]"
            images={[
              "/videos/generational.webp",
              

            ]} interval={INTERVAL} />

        </div>  */}

        <div className="absolute inset-0 left-0 top-0 h-screen w-full overflow-hidden">
          <video
            src="/videos/generational.webm"
            autoPlay
            loop
            muted
            webkit-playsinline
            playsInline
            preload="auto"
            title="GENERATIONAL curated classic cars in Thailand — showroom film"
            aria-label="Showreel of culturally significant classic automobiles curated by GENERATIONAL Thailand"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* SEO / AEO crawlable intro — visually hidden, keeps fullscreen design intact */}
        <section className="sr-only" aria-label="About GENERATIONAL">
          <h1>Classic Cars in Thailand — Curated Collector Automobiles by GENERATIONAL</h1>
          <p>
            GENERATIONAL is a Bangkok-based purveyor of the most beautiful, culturally
            significant classic automobiles in Thailand, offering global sourcing,
            provenance verification, import, registration and preservation for
            discerning collectors.
          </p>
          <h2>What does GENERATIONAL do?</h2>
          <p>
            We discover historically important cars worldwide, verify provenance and
            condition, manage shipping, Thai import and registration, and preserve
            each car for long-term collector value.
          </p>
          <nav aria-label="Primary">
            <a href="/curation-philosophy">Curation philosophy</a>
            <a href="/ourservice">Our services</a>
            <a href="/inventory">Inventory</a>
            <a href="/ourteam">Our team</a>
            <a href="/contact">Contact</a>
          </nav>
        </section>

      </main>


    </div>
  );

  return <motion.div
    style={{ x }}
    className="flex h-full w-[300%] snap-always snap-proximity snap-x"
  >
    {/* Image 1 */}
    <div className="w-screen h-screen flex-shrink-0 snap-center">
      <img draggable={false} src="/images/Lamborghini_Countach_md.jpg"
        alt="yellow car - GENERATIONAL image"
        className="w-full h-full object-cover hidden md:block"
      />
      <img draggable={false} src="/images/Lamborghini_Countach.jpg"
        alt="yellow car - GENERATIONAL image"
        className="w-full h-full object-cover md:hidden"
      />
    </div>

    {/* Image 2 */}
    <div className="w-screen h-screen flex-shrink-0 snap-center">
      <img draggable={false} src="/images/Ferr_512_RRA42.jpg"
        alt="yellow car - GENERATIONAL image"
        className="w-full h-full object-cover hidden md:block"
      />
      <img draggable={false} src="/images/Ferr_512_RRA42.jpg"
        alt="yellow car - GENERATIONAL image"
        className="w-full h-full object-cover md:hidden"
      />
    </div>

    {/* Image 3 */}
    <div className="w-screen h-screen flex-shrink-0 snap-center">
      <img draggable={false} src="/images/930 Turbo.jpg"
        alt="yellow car - GENERATIONAL image"
        className="w-full h-full object-cover hidden md:block"
      />
      <img draggable={false} src="/images/930 Turbo.jpg"
        alt="yellow car - GENERATIONAL image"
        className="w-full h-full object-cover md:hidden"
      />
    </div>
  </motion.div>
}

