import { useTranslation } from 'react-i18next'
import { useMemo } from 'react'
import Header from '../components/Header'
import Carousel from '../components/Carousel'
import About from '../components/About'
import Services from '../components/Services'
import useKeenSlider from '../hooks/useKeenSlider'
import { getAssetPath } from '../utils/assets'

const Home = () => {
  const { t } = useTranslation()

  // Sử dụng useMemo để tối ưu cấu hình slider
  const sliderConfig = useMemo(() => ({
    loop: true,
    autoplay: true,
    autoplayInterval: 5000, // 5 giây
    slides: {
      perView: 1,
      spacing: 0,
    },
    renderMode: "performance" as const,
    drag: true,
    rubberband: false,
    breakpoints: {
      "(min-width: 768px)": {
        slides: {
          perView: 1,
          spacing: 0,
        },
      },
    },
  }), []);

  // 🚀 Sử dụng hook custom để lấy sliderRef & instance với autoplay
  const [sliderRef, instanceRef] = useKeenSlider(sliderConfig);

  // Sử dụng useMemo để tránh tạo lại mảng ảnh mỗi khi render
  const carouselImages = useMemo(() => [
    { src: getAssetPath("/imgs/Carosel/carosel1.png"), alt: t('hero_title_1') },
    { src: getAssetPath("/imgs/Carosel/carosel2.png"), alt: t('hero_title_2') },
  ], [t]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Carousel
          images={carouselImages}
          title="YUMI BEAUTY & CLINIC"
          subtitle={t('hero_desc_2')}
          cta={t('book_now')}
          instanceRef={instanceRef}
          sliderRef={sliderRef}
        />
        <About />
        <Services />
      </main>
    </div>
  )
}

export default Home
