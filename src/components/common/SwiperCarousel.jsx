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
}) {
  const swiperRef = useRef(null);
  const [freezeSlide, setFreezeSlide] = useState(null);
  const containerRef = useRef(null);

  const [touchStartX, setTouchStartX] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState(null);
  const isTransitioningRef = useRef(false);

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

      // Determine swipe direction early
      if (Math.abs(diff) > 30) {
        // Increased threshold for better detection
        if (diff > 0 && swipeDirection !== "forward") {
          // Swiping left = moving forward
          setSwipeDirection("forward");

          // IMMEDIATELY capture and freeze the current active slide
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

            // Hide the slide immediately
            currentActiveSlide.style.opacity = "0";
            currentActiveSlide.style.visibility = "hidden";
            currentActiveSlide.style.pointerEvents = "none";
          }
        } else if (diff < 0 && swipeDirection !== "backward") {
          // Swiping right = moving backward
          setSwipeDirection("backward");
        }
      }
    };

    const handleSlideChangeStart = () => {
      isTransitioningRef.current = true;
      const currentActiveSlide = swiper.slides[prevIndex];
      const newIndex = swiper.activeIndex;
      const isMovingBack = newIndex < prevIndex;

      // Only apply freeze effect when moving FORWARD (if not already frozen by touch)
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

      // When moving back, restore visibility of the slide we're moving back to
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
        // When moving BACK, restore all slides up to current index
        swiper.slides.forEach((slide, idx) => {
          if (idx <= swiper.activeIndex) {
            slide.style.opacity = "";
            slide.style.visibility = "";
            slide.style.pointerEvents = "";
          }
        });
      } else {
        // When moving FORWARD, hide slides BEFORE the current active one
        swiper.slides.forEach((slide, idx) => {
          if (idx < swiper.activeIndex) {
            slide.style.opacity = "0";
            slide.style.visibility = "hidden";
            slide.style.pointerEvents = "none";
          }
        });
      }

      // Clear the frozen slide after fade completes
      setTimeout(() => {
        setFreezeSlide(null);
        isTransitioningRef.current = false;
      }, 650);

      // Reset swipe direction
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

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%" }}>
      {/* Frozen slide overlay - stays in exact position and fades */}
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
        centeredSlides={true}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        breakpoints={breakpoints}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => onSlideChange?.(swiper.activeIndex)}
        pagination={
          showPagination ? { clickable: true, ...paginationConfig } : false
        }
        navigation={showNavigation}
        speed={600}
        className={`swiper-pagination-custom swiper-overlay-effect ${
          showPagination ? paginationConfig?.paddingBottom || "!pb-16" : ""
        } ${className}`}
      >
        {slides?.map((slide, index) => (
          <SwiperSlide key={slide.id || index}>
            {children?.(slide, index)}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
