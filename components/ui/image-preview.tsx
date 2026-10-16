/**
 * Fullscreen filmstrip image preview.
 * All images render in a centered horizontal strip — the current frame
 * is big and full opacity, the rest are small and dimmed.
 * Click any frame, use the arrows, or use the keyboard to navigate.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import {
  TransformComponent,
  TransformWrapper,
  type ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";

export function ImagePreview({
  images,
  name,
  detailHref,
  index,
  onSelect,
  onClose,
  tweenFactor = 0.2,
}: {
  images: string[];
  name: string;
  detailHref?: string;
  /** Active frame index, or null when closed. */
  index: number | null;
  onSelect: (index: number) => void;
  onClose: () => void;
  /** Parallax strength used while Embla slides transition. */
  tweenFactor?: number;
}) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [backdropFocus, setBackdropFocus] = useState<"idle" | "image" | "arrow">("idle");
  const zoomControls = useRef<ReactZoomPanPinchRef | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: false,
    dragFree: false,
    // A slightly longer scroll gives the full-screen viewer a softer glide.
    duration: 60,
    loop: images.length > 2,
    watchDrag: false,
  });

  const step = useCallback(
    (dir: 1 | -1) => {
      if (index === null || images.length === 0) return;
      onSelect((index + dir + images.length) % images.length);
    },
    [index, images.length, onSelect]
  );

  // Embla owns the track position and always aligns the selected slide at the
  // center. Dragging is disabled so the image cannot be left between slides.
  useEffect(() => {
    if (index === null || !emblaApi) return;
    setIsZoomed(false);
    zoomControls.current?.resetTransform(0);
    emblaApi.scrollTo(index);
  }, [emblaApi, index]);

  const toggleZoom = useCallback(() => {
    if (isZoomed) zoomControls.current?.resetTransform();
    else zoomControls.current?.zoomIn(1.5);
  }, [isZoomed]);

  // Apply Embla's parallax motion to the image layers while the carousel
  // scrolls. The loop-point handling keeps the effect smooth at the edges.
  useEffect(() => {
    if (!emblaApi) return;

    const tweenParallax = (api: EmblaCarouselType) => {
      const engine = api.internalEngine();
      const scrollProgress = api.scrollProgress();
      const slidesInView = api.slidesInView();

      api.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.scrollSnapList?.slidesBySnap?.[snapIndex];
        if (!slidesInSnap) return;

        slidesInSnap.forEach((slideIndex) => {
          if (!slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper?.loopPoints.forEach((loopItem) => {
              if (slideIndex !== loopItem.index) return;
              const target = loopItem.target();
              if (target === 0) return;
              diffToTarget =
                target < 0
                  ? scrollSnap - (1 + scrollProgress)
                  : scrollSnap + (1 - scrollProgress);
            });
          }

          const layer = api
            .slideNodes()[slideIndex]
            ?.querySelector<HTMLElement>("[data-parallax-layer]");
          if (layer) {
            layer.style.transform = `translateX(${diffToTarget * -tweenFactor * 100}%)`;
          }
        });
      });
    };

    tweenParallax(emblaApi);
    emblaApi.on("scroll", tweenParallax);
    emblaApi.on("reInit", tweenParallax);
    return () => {
      emblaApi.off("scroll", tweenParallax);
      emblaApi.off("reInit", tweenParallax);
    };
  }, [emblaApi]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, onClose, step]);

  if (index === null || !images[index]) return null;

  const backdropClass =
    backdropFocus === "image"
      ? "bg-black/90"
      : backdropFocus === "arrow"
        ? "bg-black/55"
        : "bg-black/75";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-hidden p-4 transition-colors duration-500 ease-out ${backdropClass}`}
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10"
        onClick={onClose}
        aria-label="Close image viewer"
      >
        ×
      </button>
      <button
        className="absolute top-5 right-16 z-10 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
        onClick={(e) => { e.stopPropagation(); toggleZoom(); }}
        aria-label={isZoomed ? "Zoom out" : "Zoom in"}
        title={isZoomed ? "Zoom out" : "Zoom in"}
      >
        {isZoomed ? <ZoomOut className="size-5" /> : <ZoomIn className="size-5" />}
      </button>
      {detailHref && (
        <Link
          to={detailHref}
          onClick={(e) => e.stopPropagation()}
          title={name}
          className="absolute top-5 right-32 z-10 max-w-[min(58vw,32rem)] truncate rounded-full bg-white/10 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/20"
        >
          {name}
        </Link>
      )}
      {images.length > 1 && (
        <>
          <button
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/80 transition z-10"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            onMouseEnter={() => setBackdropFocus("arrow")}
            onMouseLeave={() => setBackdropFocus("idle")}
            aria-label="Previous image"
          >
            <ChevronLeft className="size-6 text-white" />
          </button>
          <button
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/80 transition z-10"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            onMouseEnter={() => setBackdropFocus("arrow")}
            onMouseLeave={() => setBackdropFocus("idle")}
            aria-label="Next image"
          >
            <ChevronRight className="size-6 text-white" />
          </button>
        </>
      )}
      {/* Filmstrip — current frame big, the rest small and dimmed */}
      <div className="embla m-auto w-full min-w-0" onClick={(e) => e.stopPropagation()}>
        <div ref={emblaRef} className="embla__viewport">
          <div className="embla__container flex items-center gap-1 px-[50%] py-4 md:gap-2">
          {images.map((src, i) => {
            const isActive = i === index;
            const isAdjacent =
              images.length > 2 &&
              (i === (index - 1 + images.length) % images.length ||
                i === (index + 1) % images.length);
            return (
              <div
                key={i}
                data-index={i}
                className={`embla__slide relative h-[calc(100dvh-2rem)] w-[62vw] overflow-hidden md:w-[48vw] lg:w-[44vw] xl:w-[40vw] ${!isActive ? "cursor-pointer" : ""}`}
                onMouseEnter={() => isActive && setBackdropFocus("image")}
                onMouseLeave={() => isActive && setBackdropFocus("idle")}
                onClick={() => {
                  if (i !== index) setIsZoomed(false);
                  onSelect(i);
                }}
              >
                <motion.div
                  className="h-full w-full"
                  animate={{
                    scale: isActive
                      ? backdropFocus === "image"
                        ? 1.04
                        : backdropFocus === "arrow"
                          ? 0.97
                          : 1
                      : isAdjacent
                        ? backdropFocus === "image" ? 0.62 : 0.72
                        : backdropFocus === "image" ? 0.32 : 0.42,
                    opacity: isActive
                      ? 1
                      : backdropFocus === "image"
                        ? isAdjacent ? 0.48 : 0.22
                        : isAdjacent ? 0.65 : 0.35,
                    filter: isActive && backdropFocus === "arrow"
                      ? "brightness(0.88)"
                      : !isActive && backdropFocus === "image"
                        ? "brightness(0.7)"
                        : "brightness(1)",
                  }}
                  transition={{ type: "spring", stiffness: 220, damping: 30, mass: 0.9 }}
                >
                  <div className="embla__parallax h-full">
                    <div data-parallax-layer className="embla__parallax__layer">
                    {isActive ? (
                      <TransformWrapper
                        key={`${index}-${src}`}
                        initialScale={1}
                        minScale={1}
                        maxScale={4}
                        centerOnInit
                        limitToBounds
                        wheel={{ step: 0.2 }}
                        pinch={{ step: 5, allowPanning: true }}
                        doubleClick={{ mode: "toggle", step: 1.5, animationTime: 250 }}
                        onInit={(ref) => { zoomControls.current = ref; }}
                        onTransform={(_, state) => setIsZoomed(state.scale > 1.01)}
                      >
                        <TransformComponent
                          wrapperStyle={{ width: "100%", height: "100%", overflow: "hidden" }}
                          contentStyle={{ width: "100%", height: "100%" }}
                        >
                          <img
                            src={src}
                            alt={`${name} — full size view ${i + 1} of ${images.length}`}
                            onLoad={() => emblaApi?.reInit()}
                            className="h-full w-full cursor-zoom-in object-contain"
                          />
                        </TransformComponent>
                      </TransformWrapper>
                    ) : (
                      <img
                        src={src}
                        alt={`${name} — full size view ${i + 1} of ${images.length}`}
                        onLoad={() => emblaApi?.reInit()}
                        className="embla__parallax__img"
                      />
                    )}
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
          </div>
        </div>
      </div>
      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/70 text-sm tracking-widest">
          {index + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
