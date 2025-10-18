import { motion } from "framer-motion";

export default function Logo() {
  return (
    <motion.a
      initial={{ opacity: 1,  y: 20 }}
      animate={{ opacity: 1,  y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      href="/"
      className="md:text-[120px] text-[50px] h-auto text-wrap relative
       text-center tracking-[30px] z-1 w-full overflow-hidden"
    >
      <img
        src="/logo/generational.svg"
        className="w-full"
        alt="GENERATIONAL FULL TEXT"
      />
    </motion.a>
  );
}
