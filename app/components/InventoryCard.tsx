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
    const [isOpen, setIsOpen] = useState(false);

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut", delay: index * 0.1 }
        }
    };

    // Helper to strip markdown for the short preview (prevents broken syntax)
    const getPreviewText = (text: string) => {
        return text.replace(/[#*`]/g, "").slice(0, 100) + "...";
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-12 gap-4 pb-8 border-b border-white/10"
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
                <div className="bg-black px-4 w-fit py-2 text-white absolute z-10 m-2 text-sm uppercase tracking-wider font-bold">
                    {item.status}
                </div>
                <div className="overflow-hidden h-full" ref={emblaRef}>
                    <div className="flex h-full">
                        {item.images.map((src, i) => (
                            <div key={i} className="flex-[0_0_100%] min-w-0 relative">
                                <img
                                    src={src}
                                    alt={`${item.name} - view ${i + 1}`}
                                    className="aspect-auto object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Carousel Controls */}
                {item.images.length > 1 && (
                    <>
                        <button
                            onClick={scrollPrev}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
                        >
                            <ChevronLeft className="size-5 text-white" />
                        </button>
                        <button
                            onClick={scrollNext}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
                        >
                            <ChevronRight className="size-5 text-white" />
                        </button>
                    </>
                )}
            </div>

            {/* DETAIL PART */}
            <div className="md:col-span-3 flex flex-col justify-between">
                <div className="md:text-5xl text-2xl font-[600] leading-tight">
                    {item.name}
                </div>

                <div className="relative mt-4">
                    <p className="font-medium">
                        {getPreviewText(item.description)}
                    </p>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="text-xs uppercase tracking-widest font-bold hover:opacity-70 transition-opacity cursor-pointer block"
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
                        onClick={() => setIsOpen(false)}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 md:p-10 cursor-pointer"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
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
                                <div className="text-sm tracking-[0.3em] uppercase text-white bg-black w-fit px-4 py-2 font-bold">
                                    {item.status}
                                </div>

                                {/* <h2 className="text-4xl md:text-6xl font-bold uppercase leading-none">
                                    {item.name}
                                </h2> */}

                                <div className="prose prose-lg max-w-none">
                                    <Remark
                                        remarkParseOptions={{ commonmark: true }}
                                        rehypeReactOptions={{
                                            components: {
                                                p: (props) => <p className="text-lg font-light mb-6 leading-relaxed" {...props} />,
                                                ul: (props) => <ul className="list-disc pl-5 mb-6 space-y-2 font-light" {...props} />,
                                                li: (props) => <li className="text-lg" {...props} />,
                                                h3: (props) => <h3 className="text-2xl font-bold uppercase mt-12 mb-4 border-b border-black/10 pb-2" {...props} />,
                                                strong: (props) => <strong className="font-bold" {...props} />,
                                            }
                                        }}
                                    >
                                        {item.description}
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