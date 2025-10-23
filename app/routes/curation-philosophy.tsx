import Logo from "~/components/logo";
import type { Route } from "./+types/curation-philosophy";
import AnimatedSection from "~/components/AnimationSector";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "CURATION PHILOSOPHY - GENERATIONAL" },
    { name: "description", content: "PURVEYOR OF THE MOST BEAUTIFUL, CULTURALLY SIGNIFICANT CLASSIC AUTOMOBILES IN THAILAND." },
  ];
}
export default function CurationPage() {
  return (
    <main className="min-h-screen w-full mb-20">
      <div className="md:p-10 p-5">
        <Logo />
      </div>

      {/* content */}
      {/*  */}
      <div className="grid md:grid-cols-12 gap-5 md:mt-[220px] mt-12 container-x">
        <div className=" md:col-span-7">
          <div className="md:text-[72px] text-[48px] leading-tight -mt-4 font-semibold mb-2">
            CURATION PHILOSOPHY
          </div>
          <img src="/images/M1.jpg"
            alt="" className="w-full" />
        </div>
        {/* text */}
        <div className="md:col-span-5">
          <AnimatedSection>
            <div className="font-bold text-[32px] mb-5">
              WHAT MAKES A CAR WORTHY OF GENERATIONS
            </div>
          </AnimatedSection>
          <div className="space-y-5 text-[22px]">
            <AnimatedSection>
              <div className="">Our approach to curation is grounded in the belief that classic cars are more than machines.
                They are design objects and ultimately -investments of passion. When we evaluate a car,
                we ask: Is this something a collector would be proud to own in 30 years?
                Would a son or daughter treasure this as part of a family legacy? <br /></div>
            </AnimatedSection>
            <AnimatedSection>
              <div className="">Much like an art curator carefully selects each piece before it adorns the walls of a museum,
                GENERATIONAL applies that same philosophy to the world of classic cars. Every vehicle in our online inventory,
                showroom, and ultimately our clients'
                collections is chosen with the eye of a connoisseur -
                one who sees not just a machine, but a moving piece of art worthy of preservation.</div>
            </AnimatedSection>
            <AnimatedSection>
              <div className="">Each vehicle we bring into our global inventory is selected with these philosophies in mind.</div>
            </AnimatedSection>
          </div>


          {/* Design Above All */}
          <div className="mt-10">
            <AnimatedSection>
              <div className="text-[32px] font-bold mb-5">
                Design Above All
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="text-[22px]">We look for timeless design-sculptural forms, precise lines, and details that have aged with grace.
                From the muscular arches of the Lamborghini Countach LP400, to the sculpted elegance of the Ferrari 250 GT/L "Lusso",
                and the purity of the Porsche 911,
                we study these automobiles as if they were architecture on wheels - because they are.</div>
            </AnimatedSection>
          </div>
          {/* Provenance & Originality */}
          <div className="mt-10 ">
            <AnimatedSection>
              <div className="text-[32px] font-bold mb-5">
                Provenance & Originality
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="text-[22px]">A car is only as valuable as its condition.
                We prioritize vehicles with clear provenance, verified histories from previous owners,
                original components, service records from respected garages,
                and minimal modifications.</div>
            </AnimatedSection>
            <AnimatedSection>
              <div className="text-[22px]">We believe art is best left untouched once it has passed through the hands of its creator -
                you don't alter the Mona Lisa's smile. It's perfect as it is.</div>
            </AnimatedSection>
          </div>

          {/* Driving Experience */}
          <div className="mt-10 ">
            <AnimatedSection>
              <div className="text-[32px] font-bold mb-5">
                Driving Experience
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="text-[22px]">We believe a classic car should be driven, not just displayed.
                Every vehicle we source must deliver an emotional response behind the wheel - sound,
                feel and mechanical character. We don't bring cars all the way to Thailand just for her to sit in the garage waiting for parts -
                the soul of the car must be alive.</div>
            </AnimatedSection>

          </div>
          {/* Rarity with Relevance */}
          <div className="mt-10 ">
            <AnimatedSection>
              <div className="text-[32px] font-bold mb-5">
                Rarity with Relevance
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="text-[22px]">Not every rare car is collectible.
                We curate models that matter: culturally significant and racing pedigree,
                or underappreciated legends whose time</div>
            </AnimatedSection>

          </div>
          {/* Cars That Belong in Your Future */}
          <div className="mt-10 ">
            <AnimatedSection>
              <div className="text-[32px] font-bold mb-5">
                Cars That Belong in Your Future
              </div>
            </AnimatedSection>

            <AnimatedSection>
              <div className="text-[22px]">Our philosophy is rooted in the long view.
                These are vehicles not just for today - but for tomorrow's curators,
                collectors, and connoisseurs. We exist to find, protect, and deliver those cars.</div>
            </AnimatedSection>


            <AnimatedSection>
              <div className="text-[22px]">This is how we curated GENERATIONAL.</div>
            </AnimatedSection>
          </div>
        </div>


      </div>



    </main>
  )
}
