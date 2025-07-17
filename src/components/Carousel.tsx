import React, { useCallback, memo } from 'react'
import type { KeenSliderInstance as KeenInstance } from 'keen-slider'

type CarouselProps = {
  images: { src: string; alt: string }[]
  title?: string
  subtitle?: string
  cta?: string
  instanceRef: {
    loaded: boolean
    currentSlide: number
    current: KeenInstance | null
    next: () => void
    prev: () => void
  }
  // ❗ Cho phép null vì ref khởi tạo ban đầu là null
  sliderRef: React.RefObject<HTMLDivElement | null>
}

// Tối ưu hiệu năng bằng cách sử dụng React.memo
const Carousel: React.FC<CarouselProps> = memo(({
  images,
  title = 'YUMI BEAUTY & CLINIC',
  subtitle = 'Trải nghiệm dịch vụ spa cao cấp với không gian thư giãn tuyệt vời',
  cta = 'Đặt lịch ngay',
  instanceRef,
  sliderRef,
}) => {
  // Tách tiêu đề thành 2 phần
  const titleParts = title.split(' ');
  const firstPart = titleParts[0]; // "YUMI"
  const secondPart = titleParts.slice(1).join(' '); // "BEAUTY & CLINIC"

  // Sử dụng useCallback để tránh tạo lại hàm mỗi khi render
  const handleCarouselClick = useCallback(() => {
    instanceRef.next();
  }, [instanceRef]);

  // Sử dụng useCallback để tránh tạo lại hàm mỗi khi render
  const handleDotClick = useCallback((e: React.MouseEvent, idx: number) => {
    e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài
    instanceRef.current?.moveToIdx(idx);
  }, [instanceRef]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slider chính - sử dụng will-change để tối ưu hiệu năng */}
      <div
        ref={sliderRef}
        className="keen-slider touch-pan-x h-[400px] md:h-[500px] lg:h-[600px] cursor-pointer will-change-transform"
        onClick={handleCarouselClick}
      >
        {images.map((image, idx) => (
          <div key={idx} className="keen-slider__slide relative w-full h-full">
            <div
              className="w-full h-full absolute inset-0 bg-center bg-cover bg-no-repeat will-change-transform"
              style={{
                backgroundImage: `url(${image.src})`,
                transform: instanceRef.currentSlide === idx ? 'scale(1.05)' : 'scale(1)',
                transition: 'transform 800ms ease-out'
              }}
              role="img"
              aria-label={image.alt}
            />
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>
        ))}
      </div>

      {/* Dấu chấm chuyển slide */}
      {instanceRef.loaded && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${instanceRef.currentSlide === idx
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
                }`}
              onClick={(e) => handleDotClick(e, idx)}
              aria-label={`Chuyển đến slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Nội dung chữ đè lên */}
      <div className="absolute inset-0 flex items-center justify-center text-white text-center px-4 z-10 pointer-events-none">
        <div className="max-w-4xl mx-auto animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            <span className="text-pink-400">{firstPart}</span>{' '}
            <span className="text-white">{secondPart}</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 drop-shadow-md max-w-2xl mx-auto text-white">{subtitle}</p>
          <button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300 pointer-events-auto">
            {cta}
          </button>
        </div>
      </div>
    </div>
  )
});

export default Carousel
