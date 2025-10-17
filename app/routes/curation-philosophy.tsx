import type { Route } from "./+types/curation-philosophy";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "CURATION PHILOSOPHY - GENERATIONAL" },
    { name: "description", content: "PURVEYOR OF THE MOST BEAUTIFUL, CULTURALLY SIGNIFICANT CLASSIC AUTOMOBILES IN THAILAND." },
  ];
}
export default function CurationPage() {
  return (
    <main className="min-h-screen w-full p-10 max-w-7xl mx-auto">
      <div className="md:text-[120px] text-[50px] h-auto text-wrap
     text-center  tracking-[30px] relative z-1 w-full overflow-hidden">
        GENERATIONAL
      </div>

      {/* content */}
      <section className="mb-20">
        <div className="text-xl font-medium mb-2">
          CURATION PHILOSOPHY
        </div>
        {/*  */}
        <div className="grid md:grid-cols-2 gap-5">
          <div className="basis-1/2">
            <img src="https://images.unsplash.com/photo-1662128364478-e89fd638ad80?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=676"
              alt="" />
          </div>
          {/* text */}
          <div className="">
            <div className="font-medium text-xl mb-2">
              WHAT MAKES A CAR WORTHY OF GENERATIONS
            </div>
            <div className="grid gap-4">
              <div className="">Our approach to curation is grounded in the belief that classic cars are more than machines.
                They are design objects and ultimately -investments of passion. When we evaluate a car,
                we ask: Is this something a collector would be proud to own in 30 years?
                Would a son or daughter treasure this as part of a family legacy? <br /></div>
              <div className="">Much like an art curator carefully selects each piece before it adorns the walls of a museum,
                GENERATIONAL applies that same philosophy to the world of classic cars. Every vehicle in our online inventory,
                showroom, and ultimately our clients'
                collections is chosen with the eye of a connoisseur -
                one who sees not just a machine, but a moving piece of art worthy of preservation.</div>
              <div className="">Each vehicle we bring into our global inventory is selected with these philosophies in mind.</div>
            </div>


            {/* Design Above All */}
            <div className="mt-10">
              <div className="text-xl font-medium mb-2">
                Design Above All
              </div>

              <div className="">We look for timeless design-sculptural forms, precise lines, and details that have aged with grace.
                From the muscular arches of the Lamborghini Countach LP400, to the sculpted elegance of the Ferrari 250 GT/L "Lusso",
                and the purity of the Porsche 911,
                we study these automobiles as if they were architecture on wheels - because they are.</div>
            </div>
            {/* Provenance & Originality */}
            <div className="mt-10 grid gap-4">
              <div className="text-xl font-medium mb-2">
                Provenance & Originality
              </div>

              <div className="">A car is only as valuable as its condition.
                We prioritize vehicles with clear provenance, verified histories from previous owners,
                original components, service records from respected garages,
                and minimal modifications.</div>
              <div className="">We believe art is best left untouched once it has passed through the hands of its creator -
                you don't alter the Mona Lisa's smile. It's perfect as it is.</div>
            </div>

            {/* Driving Experience */}
            <div className="mt-10 grid gap-4">
              <div className="text-xl font-medium mb-2">
                Driving Experience
              </div>

              <div className="">We believe a classic car should be driven, not just displayed.
                Every vehicle we source must deliver an emotional response behind the wheel - sound,
                feel and mechanical character. We don't bring cars all the way to Thailand just for her to sit in the garage waiting for parts -
                the soul of the car must be alive.</div>

            </div>
            {/* Rarity with Relevance */}
            <div className="mt-10 grid gap-4">
              <div className="text-xl font-medium mb-2">
                Rarity with Relevance
              </div>

              <div className="">Not every rare car is collectible.
                We curate models that matter: culturally significant and racing pedigree,
                or underappreciated legends whose time</div>

            </div>
            {/* Cars That Belong in Your Future */}
            <div className="mt-10 grid gap-4">
              <div className="text-xl font-medium mb-2">
                Cars That Belong in Your Future
              </div>

              <div className="">Our philosophy is rooted in the long view.
                These are vehicles not just for today - but for tomorrow's curators,
                collectors, and connoisseurs. We exist to find, protect, and deliver those cars.</div>


              <div className="">This is how we curated GENERATIONAL.</div>
            </div>
          </div>


        </div>
      </section>


    </main>
  )
}
