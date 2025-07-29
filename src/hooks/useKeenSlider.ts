import { useEffect, useRef, useState } from "react"
import type { KeenSliderOptions, KeenSliderInstance as KeenInstance } from "keen-slider"

// Định nghĩa kiểu dữ liệu trả về từ hook
export type KeenSliderInstance = {
  current: KeenInstance | null
  currentSlide: number
  loaded: boolean
  next: () => void
  prev: () => void
}

// Thêm tùy chọn autoplay
interface ExtendedKeenSliderOptions extends KeenSliderOptions {
  autoplay?: boolean
  autoplayInterval?: number
}

// Hook tùy chỉnh cho KeenSlider
const useKeenSlider = (
  options: ExtendedKeenSliderOptions
): [React.RefObject<HTMLDivElement | null>, KeenSliderInstance] => {
  const sliderRef = useRef<HTMLDivElement | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const slider = useRef<KeenInstance | null>(null)
  const { autoplay = true, autoplayInterval = 5000, ...restOptions } = options

  useEffect(() => {
    let isMounted = true

    // Tạo một hàm async để tải và khởi tạo slider
    const initializeSlider = async () => {
      try {
        // Import thư viện keen-slider động (SSR friendly)
        const { default: KeenSlider } = await import("keen-slider")
        
        if (!sliderRef.current || !isMounted) return

        // Đảm bảo các ảnh đã được tải trước khi khởi tạo slider
        if (sliderRef.current) {
          const images = sliderRef.current.querySelectorAll('img')
          if (images.length > 0) {
            await Promise.all(
              Array.from(images).map(
                (img) =>
                  new Promise((resolve) => {
                    if (img.complete) {
                      resolve(null)
                    } else {
                      img.onload = () => resolve(null)
                      img.onerror = () => resolve(null)
                    }
                  })
              )
            )
          }
        }

        slider.current = new KeenSlider(
          sliderRef.current,
          {
            ...restOptions,
            slideChanged: (s) => {
              setCurrentSlide(s.track.details.rel)
            },
            created: () => {
              setLoaded(true)
            },
          },
          // Sử dụng plugin autoplay
          [
            (slider) => {
              let timeout: ReturnType<typeof setTimeout>
              let mouseOver = false
              
              function clearNextTimeout() {
                clearTimeout(timeout)
              }
              
              function nextTimeout() {
                clearTimeout(timeout)
                if (mouseOver) return
                if (autoplay) {
                  timeout = setTimeout(() => {
                    slider.next()
                  }, autoplayInterval)
                }
              }
              
              slider.on("created", () => {
                if (autoplay) {
                  slider.container.addEventListener("mouseover", () => {
                    mouseOver = true
                    clearNextTimeout()
                  })
                  
                  slider.container.addEventListener("mouseout", () => {
                    mouseOver = false
                    nextTimeout()
                  })
                  
                  nextTimeout()
                }
              })
              
              slider.on("dragStarted", clearNextTimeout)
              slider.on("animationEnded", nextTimeout)
              slider.on("updated", nextTimeout)
            },
          ]
        )
      } catch (error) {
        console.error("Error initializing keen-slider:", error)
      }
    }

    // Gọi hàm khởi tạo
    initializeSlider()

    return () => {
      isMounted = false
      if (slider.current) {
        slider.current.destroy()
      }
    }
  }, [autoplay, autoplayInterval, restOptions])

  return [
    sliderRef,
    {
      current: slider.current,
      currentSlide,
      loaded,
      next: () => {
        if (slider.current) {
          slider.current.next()
        }
      },
      prev: () => {
        if (slider.current) {
          slider.current.prev()
        }
      },
    },
  ]
}

export default useKeenSlider
