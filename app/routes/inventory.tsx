import Logo from "~/components/logo";
import type { Route } from "./+types/inventory";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "INVENTORY - GENERATIONAL" },
    { name: "description", content: "PURVEYOR OF THE MOST BEAUTIFUL, CULTURALLY SIGNIFICANT CLASSIC AUTOMOBILES IN THAILAND." },
  ];
}
export default function Inventory() {
  return (
    <main className="min-h-screen w-full md:p-10 p-5">
      <Logo />
      {/* content */}

      <div className="grid md:grid-cols-2 justify-items-center justify-center
       items-center gap-5 md:mt-40 mt-12 mb-20">
        {/* image */}
        <div className="">
          <div className="md:text-5xl mb-2 font-semibold text-3xl">INVENTORY</div>
          <img src="/images/Porsche_911_3L.jpg" alt="3 classic car" />
        </div>

        {/* qr-code */}
        <div className="flex items-center justify-center gap-5 flex-col">
          <div className=" text-center leading-tight">SCAN OUR QR <br/> TO ACCESS OUR INVENTORY</div>
          <img src="/images/inventory-qr.png"
          className="md:size-[200px] size-[40vw]"
          alt="GENERATIONAL qr code" />
        </div>
      </div>


    </main>
  )
}
