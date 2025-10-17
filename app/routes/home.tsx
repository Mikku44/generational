import type { Route } from "./+types/home";


export function meta({ }: Route.MetaArgs) {
  return [
    { title: "GENERATIONAL - CULTURALLY SIGNIFICANT CLASSIC AUTOMOBILES IN THAILAND" },
    { name: "description", content: "PURVEYOR OF THE MOST BEAUTIFUL, CULTURALLY SIGNIFICANT CLASSIC AUTOMOBILES IN THAILAND." },
  ];
}

export default function Home() {
  return <main className="min-h-screen w-full p-10 relative flex h-full justify-between flex-col ">
    {/* image */}
    <div className="w-full h-full flex justify-end absolute z-0 left-0 top-0">
      <img src="/images/Lamborghini_Countach.jpg"
       alt="yellow car - GENERATIONAL image" 
      className="w-full h-full object-cover md:hidden"
      />
      <img src="/images/Lamborghini_Countach_md.jpg"
       alt="yellow car - GENERATIONAL image md:block hidden " 
      className="w-full h-full object-cover"
      />
    </div>
    <div className="md:text-[120px] text-[50px] h-auto text-wrap
     text-center  tracking-[30px] relative z-1 w-full overflow-hidden">
      GENERATIONAL
    </div>

    
  </main>;
}
