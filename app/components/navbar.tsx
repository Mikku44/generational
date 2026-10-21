import { Link, useLocation } from 'react-router'
import { APP_MENU } from '~/constants/app'
import MobileNav from './mobileNav';

export default function Navbar() {
   const location = useLocation();

   const isHomePage = location.pathname === "/";
  return (
    <nav className={` fixed
      bottom-0 w-full py-3 md:px-10 px-5 z-[15] ${isHomePage ? "invert" : "bg-white"}`}>
      <div className='lg:grid flex justify-between   grid-cols-12 gap-5 xl:items-end lg:items-end md:items-center items-end '>
        {isHomePage ?  <h1 className="md:text-[20px] text-[12px] col-span-7 font-semibold md:max-w-[70vw] flex-1 min-w-0">
      
          SOURCE OF THE MOST BEAUTIFUL, CULTURALLY <br className='sm:block hidden'/>SIGNIFICANT CLASSIC AUTOMOBILES.
        </h1>
      :
      <Link to={"/"} className='size-[30px] col-span-7 bg-black text-white
       flex items-center justify-center'>
        <img src="/logo.png" alt="GENERATIONAL LOGO" />
       </Link>
      }
        {/* menu */}
        <div className="lg:flex hidden col-span-5 xl:gap-x-[19px] md:gap-x-[12px]  justify-between flex-wrap">
          {
            APP_MENU?.map((menu) => {
             const isActive = location.pathname.replace(/\/$/, "") === menu.href.replace(/\/$/, "");
             return<Link
              to={menu.href}
             key={menu.label}
              aria-current={isActive ? "page" : undefined}
              className={`font-extrabold  ${isHomePage ? "text-[12px]" : "md:text-[calc(10px_+_0.15vw)]"} duration-150 ${
                    isActive
                      ? "text-black font-extrabold" // ACTIVE
                      : "hover:text-gray-500"
                  }`}
             >
              {menu.label}
              </Link>})
          }
        </div>
        <MobileNav menu={APP_MENU} />
      </div>
    </nav>
  )
}
