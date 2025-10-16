import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function SwiperCarousel({
  slides,
  onSlideChange,
  spaceBetween = 20,
  slidesPerView = 1,
  breakpoints,
  showPagination = true,
  showNavigation = false,
  paginationConfig,
  className = "",
  children,
}) {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      breakpoints={breakpoints}
      onSlideChange={(swiper) => {
        if (onSlideChange) {
          onSlideChange(swiper.activeIndex);
        }
      }}
      pagination={showPagination ? { clickable: true } : false}
      navigation={showNavigation}
      className={`swiper-pagination-custom ${
        showPagination ? paginationConfig?.paddingBottom || "!pb-16" : ""
      } ${className}`}
    >
      {slides?.map((slide, index) => (
        <SwiperSlide key={slide.id || index}>
          {children ? children(slide, index) : null}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
