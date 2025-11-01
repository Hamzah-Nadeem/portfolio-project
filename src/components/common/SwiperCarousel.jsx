import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { useEffect, useRef, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function SwiperCarousel({
  slides,
  onSlideChange,
  spaceBetween = 20,
  slidesPerView = 3,
  breakpoints,
  showPagination = true,
  showNavigation = false,
  paginationConfig,
  className = "",
  children,
  centeredSlides = false,
}) {
  const swiperRef = useRef(null);
  const [freezeSlide, setFreezeSlide] = useState(null);
  const containerRef = useRef(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const [touchStartX, setTouchStartX] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const isTransitioningRef = useRef(false);
  const isLastSlideActiveRef = useRef(false);

  useEffect(() => {
    if (!swiperRef.current) return;

    const swiper = swiperRef.current;
    let prevIndex = swiper.activeIndex;

    const handleTouchStart = (swiper, event) => {
      const touch = event.touches ? event.touches[0] : event;
      setTouchStartX(touch.clientX);
      setSwipeDirection(null);
    };

    const handleTouchMove = (swiper, event) => {
      if (isTransitioningRef.current) return;

      const touch = event.touches ? event.touches[0] : event;
      const diff = touchStartX - touch.clientX;

      if (Math.abs(diff) > 30) {
        if (diff > 0 && swipeDirection !== "forward") {
          setSwipeDirection("forward");

          const currentActiveSlide = swiper.slides[swiper.activeIndex];
          if (currentActiveSlide && containerRef.current) {
            const rect = currentActiveSlide.getBoundingClientRect();
            const containerRect = containerRef.current.getBoundingClientRect();

            setFreezeSlide({
              slideData: slides[swiper.activeIndex],
              index: swiper.activeIndex,
              position: {
                left: rect.left - containerRect.left,
                top: rect.top - containerRect.top,
                width: rect.width,
                height: rect.height,
              },
            });

            currentActiveSlide.style.opacity = "0";
            currentActiveSlide.style.visibility = "hidden";
            currentActiveSlide.style.pointerEvents = "none";
          }
        } else if (diff < 0 && swipeDirection !== "backward") {
          setSwipeDirection("backward");
        }
      }
    };

    const handleSlideChangeStart = () => {
      isTransitioningRef.current = true;
      const currentActiveSlide = swiper.slides[prevIndex];
      const newIndex = swiper.activeIndex;
      const isMovingBack = newIndex < prevIndex;

      if (
        !isMovingBack &&
        !freezeSlide &&
        currentActiveSlide &&
        containerRef.current
      ) {
        const rect = currentActiveSlide.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        setFreezeSlide({
          slideData: slides[prevIndex],
          index: prevIndex,
          position: {
            left: rect.left - containerRect.left,
            top: rect.top - containerRect.top,
            width: rect.width,
            height: rect.height,
          },
        });

        currentActiveSlide.style.opacity = "0";
        currentActiveSlide.style.visibility = "hidden";
        currentActiveSlide.style.pointerEvents = "none";
      }

      if (isMovingBack) {
        const slideToShow = swiper.slides[newIndex];
        if (slideToShow) {
          slideToShow.style.opacity = "";
          slideToShow.style.visibility = "";
          slideToShow.style.pointerEvents = "";
        }
      }
    };

    const handleSlideChangeEnd = () => {
      const newIndex = swiper.activeIndex;
      const isMovingBack = newIndex < prevIndex;

      if (isMovingBack) {
        swiper.slides.forEach((slide, idx) => {
          if (idx <= swiper.activeIndex) {
            slide.style.opacity = "";
            slide.style.visibility = "";
            slide.style.pointerEvents = "";
          }
        });
      } else {
        swiper.slides.forEach((slide, idx) => {
          if (idx < swiper.activeIndex) {
            slide.style.opacity = "0";
            slide.style.visibility = "hidden";
            slide.style.pointerEvents = "none";
          }
        });
      }

      setTimeout(() => {
        setFreezeSlide(null);
        isTransitioningRef.current = false;
      }, 650);

      setSwipeDirection(null);
      prevIndex = swiper.activeIndex;
    };

    swiper.on("touchStart", handleTouchStart);
    swiper.on("touchMove", handleTouchMove);
    swiper.on("slideChangeTransitionStart", handleSlideChangeStart);
    swiper.on("slideChangeTransitionEnd", handleSlideChangeEnd);

    return () => {
      swiper.off("touchStart", handleTouchStart);
      swiper.off("touchMove", handleTouchMove);
      swiper.off("slideChangeTransitionStart", handleSlideChangeStart);
      swiper.off("slideChangeTransitionEnd", handleSlideChangeEnd);
    };
  }, [slides, touchStartX, swipeDirection, freezeSlide]);

  const handleBulletClick = (index) => {
    if (swiperRef.current) {
      const swiper = swiperRef.current;
      const isLastSlide = index === slides.length - 1;
      const wasLastSlideActive = isLastSlideActiveRef.current;

      // If moving away from last slide, restore normal mode FIRST
      if (wasLastSlideActive && !isLastSlide) {
        // Restore visibility to all slides before transitioning
        swiper.slides.forEach((slide) => {
          slide.style.opacity = "";
          slide.style.visibility = "";
          slide.style.pointerEvents = "";
        });

        swiper.params.centeredSlides = false;
        swiper.params.slidesPerView = slidesPerView;
        swiper.params.resistanceRatio = 1;
        swiper.update();
        isLastSlideActiveRef.current = false;

        // Small delay to let update take effect
        setTimeout(() => {
          swiper.slideTo(index, 600);
        }, 50);
      } else if (isLastSlide) {
        // Moving to last slide - enable centered mode
        swiper.params.centeredSlides = true;
        swiper.params.slidesPerView = slidesPerView;
        swiper.params.resistanceRatio = 0;
        swiper.update();
        isLastSlideActiveRef.current = true;

        swiper.slideTo(index, 600);
      } else {
        // Normal slide change
        swiper.slideTo(index, 600);
      }

      setActiveSlideIndex(index);
      onSlideChange?.(index);
    }
  };

  const handleSlideChangeInternal = (index) => {
    if (swiperRef.current) {
      const swiper = swiperRef.current;
      const isLastSlide = index === slides.length - 1;
      const wasLastSlideActive = isLastSlideActiveRef.current;

      // If moving to last slide via swipe/drag
      if (isLastSlide && !wasLastSlideActive) {
        swiper.params.centeredSlides = true;
        swiper.params.slidesPerView = slidesPerView;
        swiper.params.resistanceRatio = 0;
        swiper.update();
        isLastSlideActiveRef.current = true;
      }

      // If moving away from last slide via swipe/drag
      if (!isLastSlide && wasLastSlideActive) {
        // Restore visibility to all slides when leaving last slide
        swiper.slides.forEach((slide) => {
          slide.style.opacity = "";
          slide.style.visibility = "";
          slide.style.pointerEvents = "";
        });

        swiper.params.centeredSlides = false;
        swiper.params.slidesPerView = slidesPerView;
        swiper.params.resistanceRatio = 1;
        swiper.update();
        isLastSlideActiveRef.current = false;
      }
    }

    setActiveSlideIndex(index);
    onSlideChange?.(index);
  };

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%" }}>
      {freezeSlide && (
        <div
          className="frozen-slide-overlay"
          style={{
            position: "absolute",
            left: `${freezeSlide.position.left}px`,
            top: `${freezeSlide.position.top}px`,
            width: `${freezeSlide.position.width}px`,
            height: `${freezeSlide.position.height}px`,
            zIndex: 100,
            pointerEvents: "none",
          }}
        >
          {children?.(freezeSlide.slideData, freezeSlide.index)}
        </div>
      )}
      <Swiper
        modules={[Navigation, Pagination]}
        grabCursor={true}
        centeredSlides={false}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        slidesOffsetAfter={0}
        slidesOffsetBefore={spaceBetween}
        breakpoints={breakpoints}
        watchSlidesProgress={true}
        allowTouchMove={true}
        shortSwipes={true}
        longSwipes={true}
        slidesPerGroupSkip={1}
        slideToClickedSlide={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) =>
          handleSlideChangeInternal(swiper.activeIndex)
        }
        pagination={false}
        navigation={showNavigation}
        speed={600}
        className={`swiper-pagination-custom swiper-overlay-effect ${className}`}
      >
        {slides?.map((slide, index) => (
          <SwiperSlide key={slide.id || index}>
            {children?.(slide, index)}
          </SwiperSlide>
        ))}
      </Swiper>

      {showPagination && (
        <div
          className={`custom-pagination flex justify-center gap-2 mt-8 ${
            paginationConfig?.paddingBottom || "pb-16"
          }`}
        >
          {slides?.map((_, index) => (
            <button
              key={index}
              onClick={() => handleBulletClick(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                index === activeSlideIndex
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
