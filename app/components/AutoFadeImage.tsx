import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "./Loading";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",


  }),
  center: {
    
    x: "0%",


  },
  exit: (direction: number) => ({
   
    x: direction < 0 ? "100%" : "-100%",

  }),
};

const AutoFadeImage = ({
  images,
  interval = 3000,
}: {
  images: string[];
  interval: number;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isLoaded, setIsLoaded] = useState(false); // New state for tracking load status

  const scrollLock = useRef(false);
  const autoIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // --- Pre-loading Logic ---
  useEffect(() => {
    let loadedCount = 0;
    const totalImages = images.length;

    // Function to check if all images are loaded
    const imageLoadCheck = () => {
      loadedCount++;
      if (loadedCount === totalImages) {
        setIsLoaded(true);
      }
    };

    // Pre-load each image
    images.forEach((src) => {
      const img = new Image();
      img.onload = imageLoadCheck;
      img.onerror = imageLoadCheck; // Still count it if it fails to load
      img.src = src;
    });

  }, [images]); // Only run when the image list changes

  // --- Carousel Logic (Rest of the component remains the same) ---

  const paginate = useCallback((newIndex: number) => {
    let newDirection = newIndex > currentIndex ? 1 : -1;
    if (newIndex === currentIndex) {
      return;
    }

    setDirection(newDirection);
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  const resetAutoInterval = useCallback(() => {
    if (autoIntervalRef.current) {
      clearInterval(autoIntervalRef.current);
    }

    autoIntervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, interval);
  }, [images.length, interval]);

  useEffect(() => {
    // Only start the auto-interval once images are loaded
    if (isLoaded) {
      resetAutoInterval();
    }
    return () => {
      if (autoIntervalRef.current) {
        clearInterval(autoIntervalRef.current);
      }
    };
  }, [resetAutoInterval, isLoaded]); // Depend on isLoaded

  const handleManualSlide = useCallback((delta: number) => {
    if (scrollLock.current) return;

    scrollLock.current = true;
    setTimeout(() => {
      scrollLock.current = false;
    }, 500);

    let newIndex = currentIndex;
    if (delta > 0) {
      newIndex = (currentIndex + 1) % images.length;
    } else if (delta < 0) {
      newIndex = (currentIndex - 1 + images.length) % images.length;
    }

    paginate(newIndex);
    resetAutoInterval();
  }, [currentIndex, images.length, paginate, resetAutoInterval]);

  const handleWheel = useCallback((event: { preventDefault: () => void; deltaY: number; }) => {
    event.preventDefault();
    if (Math.abs(event.deltaY) > 0) {
      handleManualSlide(event.deltaY > 0 ? 1 : -1);
    }
  }, [handleManualSlide]);

  useEffect(() => {
    const element = document.getElementById("slide-container");
    if (element && isLoaded) { // Only attach listeners when loaded
      element.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (element) {
        element.removeEventListener('wheel', handleWheel);
      }
    };
  }, [handleWheel, isLoaded]);

  // --- Render based on load status ---
  if (!isLoaded) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-100">
        <Loading />
      </div>
    );
  }

  return (
    <div
      id="slide-container"
      className="relative w-full h-screen overflow-hidden bg-white"
    >

      {images.map((image, index) => (
        <img
          key={`preload-${index}`}
          src={image}
          alt=""
          className="hidden"
          loading="eager"
        />
      ))}
      <AnimatePresence initial={false} custom={direction}>
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{

            opacity: { duration: 0.2 },
          }}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
};

export default AutoFadeImage;