import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Logo from "~/components/logo";
import type { Route } from "./+types/home";
import AutoFadeImage from "~/components/AutoFadeImage";

  export function meta({ }: Route.MetaArgs) {
    return [
      { title: "HOME - GENERATIONAL" },
      { name: "description", content: "PURVEYOR OF THE MOST BEAUTIFUL, CULTURALLY SIGNIFICANT CLASSIC AUTOMOBILES IN THAILAND." },
    ];
  }


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


  return (
    <div ref={containerRef} className="h-screen">
      <main className="min-h-screen w-full md:p-10 p-5 sticky top-0 flex h-screen justify-between flex-col">
        {/* image container */}
        <div className="w-full h-screen lg:block hidden absolute z-0 left-0 top-0 overflow-hidden">
        <AutoFadeImage
            // className="h-[100%]"
            images={["/images/Lamborghini_Countach_md.jpg",
              "/images/RRA_8482.jpg",
              "/images/Ferr_512_RRA42.jpg",
              "/images/930 Turbo.jpg",

            ]} interval={3000} />
          
        </div>
        <div className="w-full h-screen lg:hidden block absolute z-0 left-0 top-0 overflow-hidden">
        <AutoFadeImage
            // className="h-[100%]"
            images={["/images/Lamborghini_Countach.jpg",
              "/images/RRA_8482.jpg",
              "/images/Ferr_512_RRA42.jpg",
              "/images/930 Turbo.jpg",

            ]} interval={3000} />
          
        </div>

        <div className="">
          <Logo />
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

