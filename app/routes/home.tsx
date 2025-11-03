import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Logo from "~/components/logo";
import type { Route } from "./+types/home";
import AutoFadeImage from "~/components/AutoFadeImage";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "HOME - GENERATIONAL" },
    {
      name: "description",
      content:
        "PURVEYOR OF THE MOST BEAUTIFUL, CULTURALLY SIGNIFICANT CLASSIC AUTOMOBILES IN THAILAND.",
    },

    // — Open Graph (Facebook / LinkedIn / Line, etc.)
    { property: "og:title", content: "HOME - GENERATIONAL" },
    {
      property: "og:description",
      content:
        "Purveyor of the most beautiful, culturally significant classic automobiles in Thailand.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://generational-eta.vercel.app" },
    {
      property: "og:image",
      content: "https://generational-eta.vercel.app/images/Lamborghini_Countach_md.jpg", // ← change to your actual image
    },

    // — Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "HOME - GENERATIONAL" },
    {
      name: "twitter:description",
      content:
        "Purveyor of the most beautiful, culturally significant classic automobiles in Thailand.",
    },
    {
      name: "twitter:image",
      content: "https://generational-eta.vercel.app/images/Lamborghini_Countach_md.jpg", // ← same or different image is okay
    },
  ];
}

// https://generational-eta.vercel.app/images/Lamborghini_Countach_md.jpg

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
          <Logo />
        </div>
      </div>
      <main className="min-h-screen w-full ">
        {/* image container */}
        <div className="w-full h-screen lg:block hidden ">
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

        </div>


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

