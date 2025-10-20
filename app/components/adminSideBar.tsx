import { Link, useLocation } from "react-router";
import { ADMIN_MENU } from "~/constants/app";
import { signOutFromAdmin } from "~/lib/firebase/auth";

export default function AdminSideBar() {
  const location = useLocation();

  return (
    <aside className="w-full border-r hidden md:flex flex-col justify-between
     border-black/10 bg-gray-50  h-screen  px-4 py-6">
      <div className="">
          {/* Brand */}
          <Link to="/admin" className="mb-8">
              <div className="text-xl font-bold tracking-widest">
                GENERATIONAL
              </div>
              <div className="text-[12px]">ADMIN PORTAL</div>
          </Link>
          {/* Menu */}
          <nav className="space-y-2 mt-8">
            {ADMIN_MENU.map((menu) => {
              const isActive = location.pathname === menu.href;
              return (
                <Link
                  key={menu.label}
                  to={menu.href}
                  className={`flex items-center px-4 py-3 transition ${
                    isActive
                      ? "bg-black text-white font-medium"
                      : " hover:bg-gray-100 "
                  }`}
                >
                  {/* If you want icons:
                   {menu.icon && <menu.icon className="w-5 h-5 mr-3" />}
                  */}
                  {menu.label}
                </Link>
              );
            })}
          </nav>
      </div>

        <button
              className='w-full bg-black text-white py-3 font-medium
                    justify-center items-center
                    hover:bg-gray-800 transition duration-200'
              onClick={() => signOutFromAdmin()}>Log out</button>
    </aside>
  );
}
