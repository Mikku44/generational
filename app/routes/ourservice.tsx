import Logo from "~/components/logo";
import { motion } from "framer-motion";
import type { Route } from "./+types/ourservice";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "OUR SERVICE - GENERATIONAL" },
    { name: "description", content: "PURVEYOR OF THE MOST BEAUTIFUL, CULTURALLY SIGNIFICANT CLASSIC AUTOMOBILES IN THAILAND." },
  ];
}

export default function OurService() {
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

      <div className="md:mt-40 mt-12">
        {/* HERO IMAGE */}
        <div className="h-[600px] mt-10 overflow-hidden">
          <img
            src="/images/Lamborghini_Diablo.jpg"
            alt="pink car generational"
            className="w-full h-full object-cover"
          />
        </div>
        {/* SECTION 1: OUR SERVICES */}
        {/* our service */}
        <div className="w-full md:px-0 px-5 grid md:grid-cols-2 container-x mt-10 gap-5">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-5xl font-bold ">OUR SERVICES</motion.div>
          {/* global sourcing */}
          <motion.div className="space-y-4">
            <div className=" text-2xl mb-2 font-semibold">GLOBAL SOURCING</div>
            <div className="">At Generational, we are devoted to a singular mission:
              to uncover the world's most beautiful and historically significant cars
              and deliver them into the hands of Thailand's most discerning collectors.</div>
            <div className="">Our team of professionals travels across the globe-chasing the
              faintest lead-to curate exceptional pieces of automotive history and bring our
              clients' dream collections to life.</div>
          </motion.div>
        </div>
        {/* SECTION 2: THE ACQUISITION JOURNEY */}
        <div className="grid md:grid-cols-2 gap-5 mt-14 container-x ">
          <ImageBox src="/images/unnamed.jpg" />
          <div className="space-y-6 md:px-0 px-4">
            <h2 className="text-2xl font-semibold">THE ACQUISITION JOURNEY</h2>
            <p>FROM DISCOVERY TO DELIVERY — WITH CONFIDENCE, CLARITY, AND CARE</p>
            {steps.map((step) => (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                key={step.title}>
                <h3 className="text-xl font-semibold mb-1">{step.title}</h3>
                {step.content.map((c, i) => (
                  <p key={i} className="mb-3">
                    {c}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
        {/* SECTION 3: SELLING BACK TO THE WORLD */}
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
        {/* IMAGE */}
        <ImageBox
          src="/images/Porsche_964_RS.jpg"
          className="mt-14 col-span-2"
        />
        {/* DOMESTIC TRANSFERS + FROR */}
        <div className=" mt-14 container-x ">
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
      className="w-full grid md:grid-cols-2 container-x mt-14 gap-5 md:px-0 px-4"
    >
      <div className=""></div>
      <div>
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="space-y-4">
          {subtitle && <div className="text-xl">{subtitle}</div>}
          {paragraphs.map((text, i) => (
            <p key={i}>{text}</p>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ImageBox({ src, className = "" }: { src: string; className?: string }) {
  return (
    <div className={`w-full h-[500px] overflow-hidden ${className}`}>
      <img src={src} alt="" className="w-full h-full object-cover" />
    </div>
  );
}
