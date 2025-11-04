import Logo from "~/components/logo";
import { motion, useScroll, useTransform } from "framer-motion";
import type { Route } from "./+types/ourservice";
import AnimatedSection from "~/components/AnimationSector";
import { useRef } from "react";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "OUR SERVICE - GENERATIONAL" },
    {
      name: "description",
      content:
        "Discover Generational’s services: expert curation, provenance verification, and preservation of the most beautiful and culturally significant classic automobiles in Thailand.",
    },

    // — Open Graph
    { property: "og:title", content: "OUR SERVICE - GENERATIONAL" },
    {
      property: "og:description",
      content:
        "Generational provides expert curation and preservation services for historically significant classic automobiles, ensuring authenticity and excellence.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://generational-eta.vercel.app/ourservice" },
    {
      property: "og:image",
      content: "https://generational.co.th/og-service.jpg", // replace with your service image
    },

    // — Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "OUR SERVICE - GENERATIONAL" },
    {
      name: "twitter:description",
      content:
        "Generational provides expert curation and preservation services for historically significant classic automobiles, ensuring authenticity and excellence.",
    },
    {
      name: "twitter:image",
      content: "https://generational.co.th/og-service.jpg",
    },
  ];
}


export default function OurService() {
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // scale from 1 to 1.1
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);


  const steps = [
    {
      title: "1. Global Discovery Begins",
      content: [
        "Our sourcing specialists continually scan the world's most respected showrooms, private collections, and auctions to identify exceptional vehicles.",
        "These curated opportunities are added to our live global inventory database, updated in real-time for our clients to explore.",
      ],
    },
    {
      title: "2. A Conversation of Dreams",
      content: [
        "Clients are invited to visit our Bangkok showroom to browse this curated selection and share their own automotive aspirations.",
        "Our advisors offer professional guidance — recommending both available stock and potential future acquisitions based on your taste and goals.",
      ],
    },
    {
      title: "3. Seeing the Car - As It Is",
      content: [
        "For any vehicle of interest, our local teams provide detailed photography and live video walkthroughs from the actual car — ensuring full transparency, provenance, and condition.",
      ],
    },
    {
      title: "4. Expert Mechanical Inspection (Optional)",
      content: [
        "Should further assurance be desired, we arrange for a technical inspection by a marque-specific specialist. This detailed mechanical evaluation gives peace of mind before commitment.",
      ],
    },
    {
      title: "5. Securing the Vehicle",
      content: [
        "Once a car is selected, we issue an initial deposit invoice to reserve the vehicle and initiate the acquisition process.",
      ],
    },
    {
      title: "6. See It Yourself (Optional)",
      content: [
        "Clients are welcome to travel to view the car in person before finalizing the purchase.",
      ],
    },
    {
      title: "7. Purchase & Import Begins",
      content: [
        "Upon receiving the second installment payment, GENERATIONAL begins the full logistics operation: international shipping, customs preparation, and all import arrangements to Thailand.",
      ],
    },
    {
      title: "8. Arrival, Registration & Final Preparation",
      content: [
        "Once the vehicle arrives in Thailand, our team oversees all import duties, license registration, compliance documentation, and final preparations — including full mechanical checkups and cosmetic detailing.",
      ],
    },
    {
      title: "9. Final Balance Payment",
      content: [
        "The remaining balance is settled upon readiness for delivery.",
      ],
    },
    {
      title: "10. Delivered With Ceremony",
      content: ["Your car is delivered — and dream fulfilled."],
    },
  ];

  return (
    <main className="min-h-screen mb-20 w-full mx-auto ">
      {/* HERO TITLE */}
      <div className="md:p-10 p-5">
        <Logo />
      </div>

      <div className="md:mt-[220px] mt-[200px]">
        {/* HERO IMAGE */}
        <div className="h-[820px] mt-10 overflow-hidden">
          <motion.img
            ref={ref}
            style={{ scale }}
            src="/images/Lamborghini_Diablo.jpg"
            alt="pink car generational"
            className="w-full h-full object-cover"
          />
        </div>
        {/* SECTION 1: OUR SERVICES */}
        {/* our service */}
        <div className="w-full md:px-0 px-5 grid md:grid-cols-12 container-x mt-10 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="md:text-[65px] text-[48px] -mt-3 font-semibold md:col-span-7">OUR SERVICES</motion.div>
          {/* global sourcing */}
          <motion.div className="space-y-4 md:col-span-5">
            <AnimatedSection>
              <div className=" text-[26px] mb-2 font-bold">GLOBAL SOURCING</div>
            </AnimatedSection>
            <AnimatedSection>
              <div className="text-[20px] font-medium">At GENERATIONAL, we are devoted to a singular mission:
                to uncover the world's most beautiful and historically significant cars
                and deliver them into the hands of Thailand's most discerning collectors.</div>
            </AnimatedSection>
            <AnimatedSection>
              <div className="text-[20px] font-medium">Our team of professionals travels across the globe-chasing the
                faintest lead-to curate exceptional pieces of automotive history and bring our
                clients' dream collections to life.</div>
            </AnimatedSection>
          </motion.div>
        </div>
        {/* SECTION 2: THE ACQUISITION JOURNEY */}
        <div className="grid md:grid-cols-12 gap-5 mt-28 container-x ">
          <ImageBox  className="md:col-span-7 w-full md:h-[1280px] h-[720px]" src="/images/unnamed.jpg" />
          <div className="space-y-6 md:col-span-5">
            <AnimatedSection>
              <h2 className="text-[26px] font-bold ">THE ACQUISITION JOURNEY</h2>
            </AnimatedSection>
            <AnimatedSection>
              <p className="text-[20px] font-medium">FROM DISCOVERY TO DELIVERY — WITH CONFIDENCE, CLARITY, AND CARE</p>
            </AnimatedSection>
            {steps.map((step) => (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                key={step.title}>
                <h3 className="text-[26px] font-medium mb-2">{step.title}</h3>
                {step.content.map((c, i) => (
                  <p key={i} className="mb-3 text-[20px] font-medium">
                    {c}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
        {/* SECTION 3: SELLING BACK TO THE WORLD */}
        <div className="container-x">
          <Section
            title="SELLING BACK TO THE WORLD"
            subtitle="HELPING YOU EXIT AS SMOOTHLY AS YOU ENTER"
            paragraphs={[
              "While GENERATIONAL is best known for bringing classic cars into Thailand, our service doesn’t end there.",
              "We assist our clients in exporting their vehicles to global markets — whether to seize a strong offer abroad, rebalance their collection, or move on to the next dream.",
              "Our international sourcing team works in reverse — identifying qualified buyers, connecting with dealers and collectors overseas, and presenting your vehicle with the same curated care we use when sourcing.",
              "And thanks to Thailand’s new Classic Car Act, the opportunity is more compelling than ever.",
            ]}
          />
          {/* SECTION 4: TAX CREDIT BENEFITS */}
          <Section
            title="TAX CREDIT BENEFITS FOR EXPORTING"
            paragraphs={[
              "Under the new legislation, if a classic car you imported is exported back within two years, you are entitled to a full import tax credit — returned as credit within the Ministry of Finance.",
              "This credit can be used toward the import of your next classic vehicle into Thailand, significantly reducing your effective tax exposure and unlocking more flexibility as a collector.",
              "Whether you’re entering or exiting the market, GENERATIONAL is with you on both ends of the journey. Because for us, it’s not just about bringing cars in — it’s about keeping collectors in motion.",
            ]}
          />
        </div>
        {/* IMAGE */}
        <ImageBox
          src="/images/Porsche_964_RS.jpg"
          className="mt-14 col-span-2 h-[680px]"
        />
        {/* DOMESTIC TRANSFERS + FROR */}
        <div className="mt-[-9px] container-x ">
          <div>
            <Section
              title="DOMESTIC TRANSFERS"
              paragraphs={[
                "Here at home, we offer a unique service that brings collectors together.",
                "Our “First Right of Refusal” (FROR) program gives peace of mind to owners with a deep personal connection to their cars — ensuring they can buy back their beloved vehicles in the future at the same value.",
              ]}
            />
          </div>
          <div>
            <Section
              title='EXPLAINING THE “FIRST RIGHT OF REFUSAL” (FROR) PROGRAM'
              paragraphs={[
                "As collectors ourselves, we understand that parting with a cherished car is never easy. That’s why we created the FROR program — a legal agreement built on mutual respect for the vehicle’s history.",
                "Under this agreement, the buyer pledges that after holding the car for a minimum period (typically 6 months), they will offer to sell it back to the original owner at the same price if they ever decide to part with it.",
                "The idea originated with our founder, who, like many collectors, found himself torn between holding on to treasured vehicles and making room for new discoveries. As he said, “Some cars need to go — but never be gone.”",
                "Through this program, sellers can rest assured knowing they may one day be reunited with their cherished automobiles — while buyers gain access to cars from private, well-loved collections that would otherwise never come up for sale.",
                "Contact us to learn more or to review a sample contract.",
              ]}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

/* --- Helper Components --- */

function Section({
  title,
  subtitle,
  paragraphs,
}: {
  title: string;
  subtitle?: string;
  paragraphs: string[];
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full grid md:grid-cols-12 mt-[48px] gap-5 "
    >
      <div className="md:col-span-7"></div>
      <div className="md:col-span-5">
        <h2 className="text-[26px] font-bold mb-2">{title}</h2>
        <div className="space-y-4">
          {subtitle && <div className="text-[20px] font-medium">{subtitle}</div>}
          {paragraphs.map((text, i) => (
            <p className="text-[20px] font-medium" key={i}>{text}</p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

interface ImageBoxProps {
  src: string;
  className?: string;
}

function ImageBox({ src, className = "" }: ImageBoxProps) {

  return (
    <div
      className={`w-full h-[500px] overflow-hidden ${className}`}
    >
      <img
        src={src} alt="" className="w-full h-full object-cover" />
    </div>
  );
}