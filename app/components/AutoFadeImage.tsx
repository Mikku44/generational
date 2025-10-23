import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";


const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 1,
    scale: 1,
  }),
  center: {
    zIndex: 1,
    x: "0%",
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? "100%" : "-100%",
    opacity: 1,
    scale: 0.98,
    
  }),
};

const AutoFadeImage = ({
  images,
  interval = 3000,
}: {
  images:string[],
  interval : number
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const scrollLock = useRef(false);
  const autoIntervalRef = useRef(null);

  const paginate = useCallback((newIndex: React.SetStateAction<number>) => {
    let newDirection = 1;
    if (newIndex < currentIndex) {
      newDirection = -1;
    } else if (newIndex === currentIndex) {
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
    resetAutoInterval();
    return () => {
      if (autoIntervalRef.current) {
        clearInterval(autoIntervalRef.current);
      }
    };
  }, [resetAutoInterval]);

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

  const handleWheel = useCallback((event: { preventDefault: () => void; deltaY: any; }) => {
    event.preventDefault();
    handleManualSlide(event.deltaY);
  }, [handleManualSlide]);

  const handleDotClick = (index: any) => {
    paginate(index);
    resetAutoInterval();
  };

  useEffect(() => {
    const element = document.getElementById("slide-container");
    if (element) {
      element.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (element) {
        element.removeEventListener('wheel', handleWheel);
      }
    };
  }, [handleWheel]);

  return (
    <div
      id="slide-container"
      className="relative w-full h-screen overflow-hidden bg-white"
    >
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
            // x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 3 },
          }}
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </AnimatePresence>


      
    </div>
  );
};


export default AutoFadeImage;