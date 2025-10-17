import { Link, useLocation } from 'react-router'
import { APP_MENU } from '~/constants/app'

export default function Navbar() {
   const location = useLocation();

   const isHomePage = location.pathname === "/";
  return (
    <nav className={` fixed
      bottom-0 w-full p-5 z-1 ${isHomePage ? "" : "bg-white"}`}>
      <div className='flex justify-between  md:flex-row flex-col  gap-3 md:items-end'>
        {isHomePage ?  <div className="md:text-xl text-base md:max-w-[40vw] w-full">
      
          PURVEYOR OF THE MOST BEAUTIFUL, CULTURALLY SIGNIFICANT CLASSIC AUTOMOBILES IN THAILAND.
        </div>
      :
      <Link to={"/"} className='size-[30px] bg-black text-white
       flex items-center justify-center'>G</Link>
      }
        {/* menu */}
        <div className="flex md:gap-5 gap-2 flex-wrap">
          {
            APP_MENU?.map((menu) => <Link
             to={menu.href}
             key={menu.label}
             className="hover:text-gray-500 font-medium duration-150 hover:drop-shadow-2xl"
             >
              {menu.label}
              </Link>)
          }
        </div>
      </div>
    </nav>
  )
}
