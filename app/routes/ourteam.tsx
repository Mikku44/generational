import Logo from "~/components/logo";
import type { Route } from "./+types/ourteam";
import AnimatedSection from "~/components/AnimationSector";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "OUR TEAM - GENERATIONAL" },
    { name: "description", content: "PURVEYOR OF THE MOST BEAUTIFUL, CULTURALLY SIGNIFICANT CLASSIC AUTOMOBILES IN THAILAND." },
  ];
}
export default function Ourteam() {
  return (
    <main className="min-h-screen mb-20 w-full ">
      <div className="md:p-10 p-5">
        <Logo />
      </div>

      {/* content */}
      <section className="md:mt-[220px] mt-18 mb-20 container-x">

        {/*  */}
        <div className="grid md:grid-cols-12  gap-5">
          <div className="md:col-span-7 w-full">
            <img src="/images/gray.png"
              alt="GENERATIONAL FOUNDER IMAGE" className="w-full" />
          </div>
          {/* text */}
          <div className="md:col-span-5 w-full">
            <AnimatedSection>
              <div className="font-bold text-[32px] mb-5">
                FOUNDER
              </div>
            </AnimatedSection>
            <div className="text-[22px] font-medium space-y-4">
              <AnimatedSection>
                <div className="">GENERATIONAL was founded by Kajkanit “Gem” Sakdisubha — a lifelong
                  car enthusiast and entrepreneur — together with a close group of friends
                  who share his deep passion for classic automobiles.</div>
              </AnimatedSection>
              <AnimatedSection>
                <div className="text-[22px] font-medium">Gem’s fascination with cars began at the age of six, behind the wheel of a
                  red toy Countach he drove around his family’s vacation home in Khao Yai.
                  Years later, while studying architecture in Milan and Bangkok, his
                  appreciation for design matured — particularly the sculptural beauty
                  found in automotive form. </div>
              </AnimatedSection>
              <AnimatedSection>
                <div className="text-[22px] font-medium">Before founding GENERATIONAL, Gem launched a successful startup
                  and co-founded a professional association, serving as both CEO and
                  President. These years of building, leading, and creating laid the
                  foundation for what would become his most personal venture.</div>
              </AnimatedSection>
              <AnimatedSection>
                <div className="text-[22px] font-medium">At what he calls the “ripe moment” — with enough experience behind him
                  and encouragement from the people around him — Gem set out to bring
                  his long-held dream to life: a company devoted to timeless machines,
                  worthy of being passed down through generations. Thus, the name was born.
                </div>
              </AnimatedSection>
              <AnimatedSection>
                <div className="text-[22px] font-medium">GENERATIONAL is Gem’s magnum opus — a love letter to the beauty of
                  automotive design, and his belief in cars not only as kinetic art, but as
                  meaningful investments, emotional totems, and lifelong dreams made
                  tangible
                </div>
              </AnimatedSection>

            </div>


          </div>


          <div className="mt-14 md:col-span-7"></div>
          <div className="mt-14  md:col-span-5">
            <AnimatedSection>
              <div className="font-semibold text-[32px] mb-5">
                CO-FOUNDERS
              </div>
            </AnimatedSection>
            <div className="space-y-4">
              <AnimatedSection>
                <div className="text-[22px] font-medium"> The co-founders of GENERATIONAL — all friends and respected seniors
                  of Gem — bring with them a wealth of experience, knowledge, and
                  genuine passion for automobiles.</div>
              </AnimatedSection>
              <AnimatedSection>
                <div className="text-[22px] font-medium"> As prominent members of Thailand’s most exclusive and intellectually
                  engaged car clubs, they represent the pinnacle of the country’s collector
                  community. Their personal collections and areas of expertise span an
                  impressive range  of marques: from Alfa Romeo, BMW, Ferrari,
                  Lamborghini, McLaren, Mercedes-Benz, and Porsche — to many other
                  significant and storied names.</div>
              </AnimatedSection>

              <AnimatedSection>
                <div className="text-[22px] font-medium">Together, their collective insight and appreciation for heritage and
                  engineering form the foundation that makes GENERATIONAL a truly
                  versatile and well-rounded presence across all corners of Thailand’s car
                  culture</div>
              </AnimatedSection>


            </div>
          </div>


          <div className="md:mt-14  md:col-span-7"></div>
          <div className="md:mt-14 md:col-span-5"></div>

          <div className="md:col-span-7">
            <img src="/images/ourteam-map.png"
              alt="" />
          </div>

          <div className="md:col-span-5">
            <AnimatedSection>
              <div className="font-semibold text-[32px] mb-5">
                INTERNATIONAL TEAM
              </div>
            </AnimatedSection>
            <div className="space-y-4">
              <AnimatedSection>
                <div className="text-[22px] font-medium"> Beyond its Thai roots, GENERATIONAL has established a truly global
                  footprint. With specialist team members based in the United Kingdom —
                  the world’s largest right-hand-drive classic car market — we are perfectly
                  positioned to source rare and iconic vehicles across the western
                  hemisphere.</div>
              </AnimatedSection>
              <AnimatedSection>
                <div className="text-[22px] font-medium">At the same time, our presence in Japan ensures a close watch on
                  emerging collectible markets throughout the eastern hemisphere,
                  including Japan and Hong Kong. Our international team, embedded in
                  these key automotive hubs, live and breathe cars. They are constantly on
                  the hunt for the finest and rarest vehicles — all with the singular goal of
                  curating the most exceptional collection for our clients in Thailand.</div>
              </AnimatedSection>
              <AnimatedSection>
                <div className="text-[22px] font-medium">With the combined dedication and global reach of our team, we deliver
                  more than just exceptional curated cars — we deliver trust, passion, and
                  lasting relationships</div>
              </AnimatedSection>
            </div>
          </div>


        </div>
      </section>
    </main>
  )
}
