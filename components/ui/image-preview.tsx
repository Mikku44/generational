/**
 * Fullscreen filmstrip image preview.
 * All images render in a centered horizontal strip — the current frame
 * is big and full opacity, the rest are small and dimmed.
 * Click any frame, use the arrows, or use the keyboard to navigate.
 */

import { useCallback, useEffect } from "react";
import type { EmblaCarouselType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ImagePreview({
  images,
  name,
  index,
  onSelect,
  onClose,
  tweenFactor = 0.2,
}: {
  images: string[];
  name: string;
  /** Active frame index, or null when closed. */
  index: number | null;
  onSelect: (index: number) => void;
  onClose: () => void;
  /** Parallax strength used while Embla slides transition. */
  tweenFactor?: number;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: false,
    dragFree: false,
    duration: 45,
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
    emblaApi.scrollTo(index);
  }, [emblaApi, index]);

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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black/95 p-4"
      onClick={onClose}
    >
      <button
        className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 z-10"
        onClick={onClose}
        aria-label="Close image viewer"
      >
        ×
      </button>
      {images.length > 1 && (
        <>
          <button
            className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/80 transition z-10"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            aria-label="Previous image"
          >
            <ChevronLeft className="size-6 text-white" />
          </button>
          <button
            className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 bg-black/50 p-3 rounded-full hover:bg-black/80 transition z-10"
            onClick={(e) => { e.stopPropagation(); step(1); }}
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
                className={`embla__slide ${
                  isActive
                    ? "relative h-[55vh] w-[62vw] overflow-hidden opacity-100 transition-[height,width,opacity] delay-100 duration-500 ease-out md:h-[70vh] md:w-[48vw] lg:w-[44vw] xl:w-[40vw]"
                    : isAdjacent
                      ? "relative h-36 w-[20vw] cursor-pointer overflow-hidden opacity-70 transition-[height,width,opacity] delay-100 duration-500 ease-out hover:opacity-100 md:h-56 md:w-[16vw] lg:w-[14vw]"
                      : "relative h-20 w-20 cursor-pointer overflow-hidden opacity-40 transition-[height,width,opacity] delay-100 duration-500 ease-out hover:opacity-80 md:h-28 md:w-28 lg:h-32 lg:w-32"
                }`}
                onClick={() => onSelect(i)}
              >
                <div className="embla__parallax h-full">
                  <div data-parallax-layer className="embla__parallax__layer">
                  <img
                    src={src}
                    alt={`${name} — full size view ${i + 1} of ${images.length}`}
                onLoad={() => {
                  emblaApi?.reInit();
                }}
                    className="embla__parallax__img"
                  />
                  </div>
                </div>
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
