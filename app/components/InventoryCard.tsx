import type { Inventory } from "~/models/inventoryModel";
import { AnimatePresence, motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Remark } from "react-remark";
import { useCallback, useState } from "react";



interface InventoryCardProps {
    index: number;
    item: Inventory;
}



export default function InventoryCard({ index, item }: InventoryCardProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const [isOpen, setIsOpen] = useState(false);
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut", delay: index * 0.1 }
        }
    };

    const fullDescription = `
Ferrari F355 Berlinetta 

* Gated Manual 
* Rosso Corsa over Nero 
* Factory carbon fiber bucket seats — believed to have been specified on fewer than 4% of total F355 production 
* Period-correct BBS Iding Power 19” wheels 
* Desirable early three-spoke non-airbag steering wheel 
* Early Bosch Motronic 2.7, OBDI car with sharper throttle response and a more aggressive exhaust note 
* Odometer: 38,483 kilometers 
* Authorized dealer car 

The F355 Berlinetta remains one of Maranello’s purest expressions of the analog era — a car defined by the perfect balance between purity and practicality. 

Equipped with one of the most tactile open-gate manual transmissions ever fitted to a road car, along with a flat-plane V8 that screams a high pitch F1-style exhaust note to her redline at 8500 rpm. 

What makes this particular example truly special is her specification — unquestionably one of the highest-specced F355s in Thailand, and in the World. 

**Gated manual.**  
**Carbon bucket seats.**  
**Motronic 2.7.**  
**Three-spoke steering wheel.**

Every box ticked — exactly as Ferrari collectors would want.

The perfectly specced car from the perfect analog model.

**GENERATIONAL proudly presents**  
**Ferrari F355 Berlinetta — The Perfection**  
*From our Analog Ferrari Collection*`;

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-12 gap-4 py-8 border-b border-white/10"
        >
            {/* DESKTOP HEADER */}
            <div className="md:block hidden">
                <img src="/logo.png" alt="Logo" className="size-5 invert" />
            </div>

            <div className="md:block hidden col-span-2 place-items-end">
                <div className="text-lg font-bold">0{index + 1}</div>
            </div>

            {/* MOBILE HEADER */}
            <div className="md:hidden flex items-center justify-between w-full">
                <img src="/logo.png" alt="Logo" className="size-5 invert" />
                <div className="text-lg font-bold">0{index + 1}</div>
            </div>

            {/* IMAGE CAROUSEL */}
            <div className="md:col-span-6 group relative overflow-hidden bg-neutral-900">
                <div className="bg-black px-4 w-fit py-2 text-white absolute z-10 m-2 text-sm">SOLD</div>
                <div className="overflow-hidden h-full" ref={emblaRef}>
                    <div className="flex h-full ">
                        {/* Replace with item.images if available in your model */}
                        {["1.jpg", "2.jpg", "3.jpg"].map((src, i) => (
                            <div key={i} className="flex-[0_0_100%] min-w-0 relative">
                                <img
                                    src={`/inventory/ferrari/${src}`}
                                    className="aspect-[9/16] object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                //   alt={`${item.name} - image ${i}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Carousel Controls */}
                <button
                    onClick={scrollPrev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <ChevronLeft className="size-5 text-white" />
                </button>
                <button
                    onClick={scrollNext}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <ChevronRight className="size-5 text-white" />
                </button>
            </div>


            {/* DETAIL PART (Kept exactly as your old design) */}
            <div className="md:col-span-3 flex flex-col justify-between">
                <div className="md:text-5xl text-2xl font-[600]">Ferrari F355 Berlinetta</div>

                <div className="relative">
                    <Remark >
                        {fullDescription.slice(0, 100) + "..."}
                    </Remark>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="text-xs uppercase tracking-widest font-bold mt-2 hover:opacity-90 transition-colors cursor-pointer"
                    >
                        See More
                    </button>
                </div>


            </div>
            {/* MODAL */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        // 1. Trigger close when clicking this backdrop
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-10 cursor-pointer"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            // 2. Prevent the click from "bubbling up" to the backdrop
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto relative p-8 md:p-16 text-black cursor-default"
                        >
                            <button
                                onClick={() => setIsOpen(false)}
                                className="absolute top-6 right-6 text-black hover:opacity-50 transition-opacity"
                            >
                                <X size={32} />
                            </button>

                            <div className="space-y-8">
                                {/* Badge */}
                                <div className="text-sm tracking-[0.3em] uppercase text-white bg-black w-fit px-4 py-2 font-bold">
                                    {"SOLD"}
                                </div>

                                {/* Title */}
                                <h2 className="text-4xl md:text-6xl font-bold uppercase leading-none">
                                    {"Ferrari F355 Berlinetta"}
                                </h2>

                                {/* Markdown Content */}
                                <div className="prose prose-lg max-w-none prose-p:leading-relaxed prose-p:mb-4 prose-strong:font-bold">
                                    <Remark
                                        remarkParseOptions={{ commonmark: true }}
                                        rehypeReactOptions={{
                                            components: {
                                                p: (props) => <p className="text-lg font-light mb-6" {...props} />,
                                                ul: (props) => <ul className="list-disc pl-5 mb-6 space-y-2 font-light" {...props} />,
                                                li: (props) => <li className="text-lg" {...props} />,
                                                h3: (props) => <h3 className="text-2xl font-bold uppercase mt-8 mb-4" {...props} />,
                                            }
                                        }}
                                    >
                                        {fullDescription}
                                    </Remark>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
