import Logo from "~/components/logo";
import type { Route } from "./+types/ourteam";
import AnimatedSection from "~/components/AnimationSector";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "OUR TEAM - GENERATIONAL" },
    {
      name: "description",
      content:
        "Meet the GENERATIONAL team: dedicated experts curating the most beautiful and culturally significant classic automobiles in Thailand for discerning collectors.",
    },

    // — Open Graph
    { property: "og:title", content: "OUR TEAM - GENERATIONAL" },
    {
      property: "og:description",
      content:
        "Get to know the GENERATIONAL team — experts committed to sourcing and preserving Thailand’s most historically significant classic automobiles.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://generational-eta.vercel.app/ourteam" },
    {
      property: "og:image",
      content: "https://generational-eta.vercel.app/images/Lamborghini_Diablo.jpg", // replace with your team image
    },

    // — Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "OUR TEAM - GENERATIONAL" },
    {
      name: "twitter:description",
      content:
        "Get to know the Generational team — experts committed to sourcing and preserving Thailand’s most historically significant classic automobiles.",
    },
    {
      name: "twitter:image",
      content: "https://generational-eta.vercel.app/images/Lamborghini_Diablo.jpg",
    },
  ];
}

export default function Ourteam() {
  return (
    <main className="min-h-screen mb-20 w-full ">
      <div className="md:p-10 p-5">
        <Logo />
      </div>

      {/* content */}
      <section className="md:mt-[220px] mt-[200px] mb-20 container-x">

        {/*  */}
        <div className="grid md:grid-cols-12 gap-5">
          <div className="md:col-span-7 w-full lg:max-h-[490px]">
            <div className="w-full h-auto overflow-hidden flex items-end">
              <video
                src="/videos/9_16.mp4"
                preload="true"
                autoPlay
                muted
                loop
                playsInline
                webkit-playsinline="true"
                className="w-full"
              />


            </div>
          </div>
          {/* text */}
          <div className="md:col-span-5 w-full">
            <AnimatedSection>
              <div className="font-bold text-[26px] -mt-2 mb-5">
                FOUNDER
              </div>
            </AnimatedSection>
            <div className="text-[20px] font-medium space-y-4">
              <AnimatedSection>
                <div className="">GENERATIONAL was founded by Akkaporn “Pam” Vichitranon, Kajkanit “Gem” Sakdisubha,
                  and Seth “Perth” Sethaputra — two generations of automotive enthusiasts united by
                  a shared devotion to the world’s most significant classic automobiles.</div>
              </AnimatedSection>
              <AnimatedSection>
                <div className="text-[20px] font-medium space-y-4">
                  <p className="font-semibold ">About Akkaporn</p>

                  <p>
                    A Chulalongkorn and Harvard-trained lawyer, and a serving committee member of the Classic Car Association of Thailand,
                    Akkaporn brings a rare breadth of legal, commercial, and collector expertise to GENERATIONAL.
                  </p>
                  <p>As a deeply respected figure within Thailand’s classic car community,
                    his real-world experience and intimate knowledge of some of the world’s most significant marques — including Porsche, Ferrari,
                    and Aston Martin — have long inspired fellow enthusiasts and collectors across the country.</p>

                  <p>His distinctly curatorial approach places profound importance on provenance and the historical narrative of each automobile — values that remain relatively new,
                    yet increasingly vital,
                    within Thailand’s evolving collector landscape.</p>
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <div className="text-[20px] font-medium space-y-4">
                  <p className="font-semibold ">About Kajkanit</p>

                  <p>
                    The driving force behind GENERATIONAL,
                    Kajkanit is the originator of its vision and the catalyst who brought the founding team together.
                  </p>

                  <p>
                    An architect by training, his lifelong appreciation for form, proportion,
                    and aesthetic beauty has naturally extended from the world of buildings to the world of automobiles.
                  </p>

                  <p>
                    His early years as Chief Executive Officer of a venture-backed startup, followed by his tenure as president of an industry association,
                    helped shape the company-building mentality and philosophy that underpin GENERATIONAL today.
                  </p>

                  <p>
                    Regarded as his magnum opus,
                    GENERATIONAL reflects Kajkanit’s commitment to curating the world’s most beautiful and significant automobiles for Thailand’s most discerning collectors.
                  </p>
                </div>
              </AnimatedSection>


              <AnimatedSection>
                <div className="text-[20px] font-medium space-y-4">
                  <p className="font-semibold ">About Seth</p>

                  <p>
                    Born into a family of classic car collectors,
                    Seth’s passion for automobiles was shaped from an early age,
                    nurtured by a lifelong immersion in the world of significant motor cars.
                  </p>

                

                  <p>
                    Today, Seth plays a pivotal role in the stewardship of GENERATIONAL’s collection,
                     bringing both operational discipline and an authentic collector’s sensibility to every automobile under our care.
                  </p>

                </div>
              </AnimatedSection>


            </div>


          </div>

          {/* 
          <div className="mt-14 md:col-span-7"></div>
          <div className="mt-14  md:col-span-5">
            <AnimatedSection>
              <div className="font-semibold text-[26px] mb-5">
                CO-FOUNDERS
              </div>
            </AnimatedSection>
            <div className="space-y-4">
              <AnimatedSection>
                <div className="text-[20px] font-medium"> The co-founders of GENERATIONAL — all friends and respected seniors
                  of Gem — bring with them a wealth of experience, knowledge, and
                  genuine passion for automobiles.</div>
              </AnimatedSection>
              <AnimatedSection>
                <div className="text-[20px] font-medium"> As prominent members of Thailand’s most exclusive and intellectually
                  engaged car clubs, they represent the pinnacle of the country’s collector
                  community. Their personal collections and areas of expertise span an
                  impressive range  of marques: from Alfa Romeo, BMW, Ferrari,
                  Lamborghini, McLaren, Mercedes-Benz, and Porsche — to many other
                  significant and storied names.</div>
              </AnimatedSection>

              <AnimatedSection>
                <div className="text-[20px] font-medium">Together, their collective insight and appreciation for heritage and
                  engineering form the foundation that makes GENERATIONAL a truly
                  versatile and well-rounded presence across all corners of Thailand’s car
                  culture</div>
              </AnimatedSection>


            </div>
          </div> */}


          <div className="md:mt-14  md:col-span-7"></div>
          <div className="md:mt-14 md:col-span-5"></div>

          <div className="md:col-span-7">
            <img src="/images/ourteam-map.png"
              alt="" />
          </div>

          <div className="md:col-span-5">
            <AnimatedSection>
              <div className="font-semibold text-[26px] mb-5 -mt-2">
                INTERNATIONAL TEAM
              </div>
            </AnimatedSection>
            <div className="space-y-4">
              <AnimatedSection>
                <div className="text-[20px] font-medium"> Beyond its Thai roots, GENERATIONAL has established a truly global
                  footprint. With specialist team members based in the United Kingdom —
                  the world’s largest right-hand-drive classic car market — we are perfectly
                  positioned to source rare and iconic vehicles across the western
                  hemisphere.</div>
              </AnimatedSection>
              <AnimatedSection>
                <div className="text-[20px] font-medium">At the same time, our presence in Japan ensures a close watch on
                  emerging collectible markets throughout the eastern hemisphere,
                  including Japan and Hong Kong. Our international team, embedded in
                  these key automotive hubs, live and breathe cars. They are constantly on
                  the hunt for the finest and rarest vehicles — all with the singular goal of
                  curating the most exceptional collection for our clients in Thailand.</div>
              </AnimatedSection>
              <AnimatedSection>
                <div className="text-[20px] font-medium">With the combined dedication and global reach of our team, we deliver
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
