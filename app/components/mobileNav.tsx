import { useState } from "react";
import { Link, useLocation } from "react-router"; // ✅ add useLocation
import { motion, AnimatePresence } from "framer-motion";

export default function MobileNav({ menu = [] }: { menu: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);
  const location = useLocation(); // ✅ get current path

  return (
    <div className="lg:hidden">
      <button
        className="text-2xl font-bold text-black"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        {open ? "X" : "☰"}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.25 }}
            className="mt-3 flex flex-col gap-3 bg-white fixed right-2 bottom-14 p-4 shadow-xl "
          >
            {menu.map((item) => {
              const isActive = location.pathname === item.href; 

              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`font-medium duration-150 ${
                    isActive
                      ? "text-black underline underline-offset-4 font-semibold" // ACTIVE
                      : "hover:text-gray-500"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
