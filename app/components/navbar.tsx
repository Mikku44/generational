import { Link, useLocation } from 'react-router'
import { APP_MENU } from '~/constants/app'
import MobileNav from './mobileNav';

export default function Navbar() {
   const location = useLocation();

   const isHomePage = location.pathname === "/";
  return (
    <nav className={` fixed
      bottom-0 w-full py-3 md:px-10 px-5 z-1 ${isHomePage ? "" : "bg-white"}`}>
      <div className='grid grid-cols-12 gap-5 items-end '>
        {isHomePage ?  <div className="md:text-[20px] col-span-7 font-semibold md:max-w-[50vw] w-full">
      
          PURVEYOR OF THE MOST BEAUTIFUL, CULTURALLY <br/>SIGNIFICANT CLASSIC AUTOMOBILES IN THAILAND.
        </div>
      :
      <Link to={"/"} className='size-[30px] col-span-7 bg-black text-white
       flex items-center justify-center'>
        <img src="/logo.png" alt="GENERATIONAL LOGO" />
       </Link>
      }
        {/* menu */}
        <div className="lg:flex hidden col-span-5 gap-[19px] justify-end flex-wrap">
          {
            APP_MENU?.map((menu) => {
             const isActive = location.pathname === menu.href; 
            return<Link
             to={isActive ? "#top" :menu.href}
             key={menu.label}
              className={`font-extrabold text-[15px] duration-150 ${
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
