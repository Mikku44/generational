import Logo from "~/components/logo";
import type { Route } from "./+types/inventory";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "INVENTORY - GENERATIONAL" },
    {
      name: "description",
      content:
        "Purveyor of the most beautiful and culturally significant classic automobiles in Thailand. Explore our curated inventory of rare and historically important vehicles.",
    },

    // — Open Graph
    { property: "og:title", content: "INVENTORY - GENERATIONAL" },
    {
      property: "og:description",
      content:
        "Explore GENERATIONAL curated inventory — historically significant, beautifully preserved classic automobiles selected for discerning collectors in Thailand.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://generational-eta.vercel.app/inventory" },
    {
      property: "og:image",
      content: "https://generational-eta.vercel.app/images/Porsche_911_3L.jpg", // update if you have one
    },

    // — Twitter
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: "INVENTORY - GENERATIONAL" },
    {
      name: "twitter:description",
      content:
        "Explore Generational’s curated inventory — historically significant, beautifully preserved classic automobiles selected for discerning collectors in Thailand.",
    },
    {
      name: "twitter:image",
      content: "https://generational-eta.vercel.app/images/Porsche_911_3L.jpg",
    },
  ];
}

export default function Inventory() {
  return (
    <main className="min-h-screen w-full mb-20">
      <div className="md:p-10 p-5">
        <Logo />
      </div>

      <div className="grid container-x md:grid-cols-12 justify-items-center justify-center
       items-center gap-5 md:mt-[220px]  mt-[200px] mb-20">
        {/* image */}
        <div className=" md:col-span-7">
          <div className="md:text-[65px] text-[48px] leading-tight -mt-4 font-semibold mb-2">INVENTORY</div>
          <img src="/images/Porsche_911_3L.jpg" alt="3 classic car" />
        </div>

        {/* qr-code */}
        <div className="flex md:col-span-5 items-center justify-center gap-5 flex-col">
          <div className=" text-center text-[20px] font-semibold leading-tight">SCAN OUR QR <br /> TO ACCESS OUR INVENTORY</div>
          <img src="/images/inventory-qr.png"
            className="md:size-[200px] size-[40vw]"
            alt="GENERATIONAL qr code" />
        </div>
      </div>


    </main>
  )
}
