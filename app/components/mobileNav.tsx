import { useRef } from "react";
import { Link, useLocation } from "react-router";

export default function MobileNav({ menu = [] }: { menu: { label: string; href: string }[] }) {
  const location = useLocation();
  const detailsRef = useRef<HTMLDetailsElement>(null);

  return (
    <details ref={detailsRef} className="group lg:hidden col-span-5 shrink-0">
      <summary
        className="text-2xl font-bold text-black cursor-pointer list-none [&::-webkit-details-marker]:hidden"
        aria-label="Toggle menu"
      >
        <span className="group-open:hidden">☰</span>
        <span className="hidden group-open:inline">×</span>
      </summary>
      <div className="mt-3 flex flex-col gap-3 bg-white fixed right-2 bottom-14 p-4 shadow-xl">
        {menu.map((item) => {
          const isActive = location.pathname.replace(/\/$/, "") === item.href.replace(/\/$/, "");
          return (
            <Link
              key={item.label}
              to={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`font-medium duration-150 ${
                isActive
                  ? "text-black underline underline-offset-4 font-semibold"
                  : "hover:text-gray-500"
              }`}
              onClick={() => {
                if (detailsRef.current) detailsRef.current.open = false;
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </details>
  );
}
