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
