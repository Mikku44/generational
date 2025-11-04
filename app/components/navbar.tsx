import { Link, useLocation } from 'react-router'
import { APP_MENU } from '~/constants/app'
import MobileNav from './mobileNav';

export default function Navbar() {
   const location = useLocation();

   const isHomePage = location.pathname === "/";
  return (
    <nav className={` fixed
      bottom-0 w-full py-3 md:px-10 px-5 z-[15] ${isHomePage ? "" : "bg-white"}`}>
      <div className='lg:grid flex justify-between   grid-cols-12 gap-5 xl:items-end lg:items-end md:items-center items-end '>
        {isHomePage ?  <div className="md:text-[20px] text-[12px] col-span-7 font-semibold md:max-w-[70vw] w-full">
      
          PURVEYOR OF THE MOST BEAUTIFUL, CULTURALLY <br className='sm:block hidden'/>SIGNIFICANT CLASSIC AUTOMOBILES.
        </div>
      :
      <Link to={"/"} className='size-[30px] col-span-7 bg-black text-white
       flex items-center justify-center'>
        <img src="/logo.png" alt="GENERATIONAL LOGO" />
       </Link>
      }
        {/* menu */}
        <div className="lg:flex hidden col-span-5 xl:gap-x-[19px] md:gap-x-[12px]  justify-end flex-wrap">
          {
            APP_MENU?.map((menu) => {
             const isActive = location.pathname === menu.href; 
            return<Link
             to={isActive ? "#top" :menu.href}
             key={menu.label}
              className={`font-extrabold xl:text-[14px] text-[12px] duration-150 ${
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
