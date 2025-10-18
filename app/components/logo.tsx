import { Link } from "react-router";

export default function Logo() {
    return (
        <Link to="/" className="md:text-[120px] text-[50px] h-auto text-wrap
     text-center  tracking-[30px] relative z-1 w-full overflow-hidden">
            <img src="/logo/generational.svg"
                className="w-full "
                alt="GENERATIONAL FULL TEXT" />
        </Link>
    )
}
