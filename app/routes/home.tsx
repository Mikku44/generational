import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { APP_MENU } from "~/constants/app";
import { Link } from "react-router";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "GENERATIONAL - CULTURALLY SIGNIFICANT CLASSIC AUTOMOBILES IN THAILAND" },
    { name: "description", content: "PURVEYOR OF THE MOST BEAUTIFUL, CULTURALLY SIGNIFICANT CLASSIC AUTOMOBILES IN THAILAND." },
  ];
}

export default function Home() {
  return <main className="min-h-screen w-full p-10 relative flex h-full justify-between flex-col">
    {/* image */}
    <div className="w-full h-full absolute z-0 left-0 top-0">
      <img src="https://images.unsplash.com/photo-1760510926216-d5fe00372ff0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=764"
       alt="yellow car - GENERATIONAL image" 
      className="w-full h-full object-cover"
      />
    </div>
    <div className="md:text-[150px] text-[50px] md:max-w-full  max-w-[50vw] text-wrap
     text-center  tracking-[30px] relative z-1 overflow-hidden">
      GENERATIONAL
    </div>

    <div className="flex justify-between md:flex-row flex-col gap-3 items-end relative z-1">
      <div className="md:text-xl text-base md:max-w-[40vw] w-full">
        PURVEYOR OF THE MOST BEAUTIFUL, CULTURALLY SIGNIFICANT CLASSIC AUTOMOBILES IN THAILAND.
      </div>

      {/* menu */}
      <div className="flex gap-2 flex-wrap">
        {
          APP_MENU?.map((menu) => <Link
           to={menu.href}
           key={menu.label}
           className="hover:text-black/60 font-medium duration-150"
           >
            {menu.label}
            </Link>)
        }
      </div>
    </div>
  </main>;
}
