import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router";
import { ADMIN_MENU } from "~/constants/app";
import { signOutFromAdmin } from "~/lib/firebase/auth";


export default function AdminMobileSidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded bg-black text-white"
      >
        <Menu></Menu>
      </button>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gray-50 z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:hidden flex flex-col justify-between p-4`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="text-xl font-bold tracking-widest">GENERATIONAL</div>
            <div className="text-[12px]">ADMIN PORTAL</div>
          </div>
          <button onClick={() => setOpen(false)} className="p-2">
            <X />
          </button>
        </div>

        {/* Menu */}
        <nav className="flex flex-col space-y-2">
          {ADMIN_MENU.map((menu) => {
            const isActive = location.pathname === menu.href;
            return (
              <Link
                key={menu.label}
                to={menu.href}
                onClick={() => setOpen(false)} // close menu after click
                className={`flex items-center px-4 py-3 rounded transition ${
                  isActive
                    ? "bg-white text-black font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {menu.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout Button */}
        <button
          className="w-full bg-black text-white py-3 font-medium hover:bg-gray-800 transition mt-4"
          onClick={() => {
            setOpen(false);
            signOutFromAdmin();
          }}
        >
          Log out
        </button>
      </aside>
    </>
  );
}
