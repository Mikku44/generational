import type { Route } from "./+types/inventory";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "INVENTORY - GENERATIONAL" },
    { name: "description", content: "PURVEYOR OF THE MOST BEAUTIFUL, CULTURALLY SIGNIFICANT CLASSIC AUTOMOBILES IN THAILAND." },
  ];
}
export default function Inventory() {
  return (
    <main className="min-h-screen w-full p-10 max-w-7xl mx-auto">
      <div className="md:text-[120px] text-[50px] h-auto text-wrap
     text-center  tracking-[30px] relative z-1 w-full overflow-hidden">
        GENERATIONAL
      </div>
      {/* content */}

      <div className="grid md:grid-cols-2 justify-items-center justify-center
       items-center gap-5 mt-20 mb-20">
        {/* image */}
        <div className="">
          <div className="md:text-5xl mb-2 font-medium text-3xl">INVENTORY</div>
          <img src="/images/inventory.png" alt="3 classic car" />
        </div>

        {/* qr-code */}
        <div className="flex items-center justify-center flex-col">
          <div className=" text-center leading-tight mb-10">SCAN OUR QR <br/> TO ACCESS OUR INVENTORY</div>
          <img src="/images/inventory-qr.png" alt="GENERATIONAL qr code" />
        </div>
      </div>


    </main>
  )
}
