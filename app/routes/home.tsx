import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Logo from "~/components/logo";
import type { Route } from "./+types/home";

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
    <div ref={containerRef} className="h-[300vh]">
      <main className="min-h-screen w-full md:p-10 p-5 sticky top-0 flex h-screen justify-between flex-col">
        {/* image container */}
        <div className="w-full h-screen absolute z-0 left-0 top-0 overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex h-full w-[300%]"
          >
            {/* Image 1 */}
            <div className="w-screen h-screen flex-shrink-0">
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
            <div className="w-screen h-screen flex-shrink-0">
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
            <div className="w-screen h-screen flex-shrink-0">
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
        </div>

        <div className="fixed w-[90%] mx-auto z-10">
          <Logo />
        </div>
      </main>
    </div>
  );
}